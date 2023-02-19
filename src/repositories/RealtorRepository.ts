import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { RealtorResponse }      from '../dtos/responses/RealtorResponse'
import { RealtorMapper }        from '../mappers/RealtorMapper'
import { IRealtorRepository }   from './IRealtorRepository'
import { PrismaClient }         from '@prisma/client'
import { ApiError }             from '../errors/ApiError'

export class RealtorRepository implements IRealtorRepository {

  prisma = new PrismaClient()
  mapper = new RealtorMapper()

  public async findAll(search: string, page: number, offset: number): Promise<RealtorResponse[]> {

    let take = 10
    let skip = 0
    if (offset) take = offset
    if (page) skip = take * (page - 1)
    if (search) {

      const realtors = await this.prisma.realtor.findMany({
        skip,
        take,
        where: {
          OR: {
            firstName: {
              contains: search
            },
            lastName: {
              contains: search
            }
          }
        }
      })
      const realtorsResponse = this.mapper.RealtorListToRealtorResponseList(realtors)
      return realtorsResponse
    
    }
    const realtors = await this.prisma.realtor.findMany({ skip, take })
    const realtorsResponse = this.mapper.RealtorListToRealtorResponseList(realtors)
    return realtorsResponse
  
  }

  public async get(id: number): Promise<RealtorResponse> {

    const realtor = await this.prisma.realtor.findUnique({ where: { id } })
    if(!realtor){

      throw new ApiError(404, 'realtor not found')
    
    }
    const realtorResponse = this.mapper.RealtorToRealtorResponse(realtor)
    return realtorResponse
  
  }

  public async add(data: CreateRealtorRequest): Promise<string> {

    const realtor = await this.prisma.realtor.create({ data })
    if (realtor) return 'created'
  
  }

  public async update(data: UpdateRealtorRequest): Promise<string> {

    const { id, ...content } = data

    const realtor = await this.prisma.realtor.update({ data: content, where: { id } })
    if (realtor) return 'updated'
  
  }

  public async remove(id: number): Promise<string> {

    const realtor = await this.prisma.realtor.delete({ where: { id } })
    if (realtor) return 'deleted'
  
  }

}
