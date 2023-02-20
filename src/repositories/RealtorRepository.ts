import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { RealtorResponse }      from '../dtos/responses/RealtorResponse'
import { ApiError }             from '../errors/ApiError'
import { RealtorMapper }        from '../mappers/RealtorMapper'
import { IRealtorRepository }   from './IRealtorRepository'
import { PrismaClient }         from '@prisma/client'
import { PaginationResponse }   from '../dtos/responses/PaginationResponse'

export class RealtorRepository implements IRealtorRepository {

  prisma = new PrismaClient()
  mapper = new RealtorMapper()

  public async findAll(search: string, page: number, offset: number): Promise<PaginationResponse<RealtorResponse>> {

    let take = 10
    let skip = 0
    if (offset) take = offset
    if (page) skip = take * (page - 1)
    else page = 1

    const totalOfRealtors = await this.prisma.realtor.count()

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
      const paginationResponse = this.mapper.RealtorResponseListToPaginationResponse(realtorsResponse, totalOfRealtors, page, take)
      return paginationResponse
      
    }
    const realtors = await this.prisma.realtor.findMany({ skip, take })
    const realtorsResponse = this.mapper.RealtorListToRealtorResponseList(realtors)
    const paginationResponse = this.mapper.RealtorResponseListToPaginationResponse(realtorsResponse, totalOfRealtors, page, take)
    return paginationResponse
  
  }

  public async get(id: number): Promise<RealtorResponse> {

    const realtor = await this.prisma.realtor.findUnique({ where: { id } })
    if (!realtor) {

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
