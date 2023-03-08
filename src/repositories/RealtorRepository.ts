import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { RealtorResponse }      from '../dtos/responses/RealtorResponse'
import { ApiError }             from '../errors/ApiError'
import { RealtorMapper }        from '../mappers/RealtorMapper'
import { IRealtorRepository }   from './IRealtorRepository'
import { PrismaClient }         from '@prisma/client'
import { PaginationResponse }   from '../dtos/responses/PaginationResponse'
import { compare, hash }        from 'bcryptjs'
import { sign }                 from 'jsonwebtoken'
import { SignInRealtorRequest } from '../dtos/requests/SignInRealtorRequest'

export class RealtorRepository implements IRealtorRepository {

  prisma = new PrismaClient()
  mapper = new RealtorMapper()

  public async findAll(search: string, page: number, offset: number): Promise<PaginationResponse<RealtorResponse>> {

    let take = 10
    let skip = 0
    if (offset) take = offset
    if (page) skip = take * (page - 1)
    else page = 1

    let totalOfRealtors = await this.prisma.realtor.count()
    
    if (search) {

      totalOfRealtors = await this.prisma.realtor.count({ where: {
        OR:[
          {
            firstName:{
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            lastName:{
              contains: search,
              mode: 'insensitive'
            }
          }
        ]
      } })

      const realtors = await this.prisma.realtor.findMany({
        skip,
        take,
        where: {
          OR:[
            {
              firstName:{
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              lastName:{
                contains: search,
                mode: 'insensitive'
              }
            }
          ]
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

  public async signIn(data: SignInRealtorRequest): Promise<string>{

    const {password, email} = data

    const realtor = await this.prisma.realtor.findUnique({ where: { email } })
    if(!realtor){

      throw new ApiError(404, 'realtor not found')

    }

    const match = await compare(password, realtor.password)
    if(!match) {

      throw new ApiError(400, 'password incorrect')

    }

    const token = sign({
      id:realtor.id,
      email: realtor.email,
      firstName: realtor.firstName,
      lastName: realtor.lastName
    }, process.env.API_SECRET, {
      expiresIn: '8h'
    })

    return token
  
  }

  public async add(data: CreateRealtorRequest): Promise<string> {

    const { password, ...realtorData } = data
    const realtorExists = await this.prisma.realtor.findUnique({where: {email: realtorData.email}})
    if(realtorExists) throw new ApiError(400, 'realtor already exists')
    const hashed = await hash(password, 10)
    const realtor = await this.prisma.realtor.create({ data:{ password: hashed, ...realtorData} })
    if (realtor) return 'created'
  
  }

  public async update(data: UpdateRealtorRequest, id: number): Promise<string> {

    const { user, ...dataUpdate } = data
    const realtor = await this.prisma.realtor.update({ data:dataUpdate, where: { id } })
    if (realtor) return 'updated'
  
  }

  public async remove(id: number): Promise<string> {

    const realtor = await this.prisma.realtor.delete({ where: { id } })
    if (realtor) return 'deleted'
  
  }

}
