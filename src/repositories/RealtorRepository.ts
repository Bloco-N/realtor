import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { SignInRealtorRequest } from '../dtos/requests/SignInRealtorRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { PaginationResponse }   from '../dtos/responses/PaginationResponse'
import { RealtorResponse }      from '../dtos/responses/RealtorResponse'
import { ApiError }             from '../errors/ApiError'
import { Prisma, PrismaClient } from '@prisma/client'
import { compare, hash }        from 'bcryptjs'
import { sign }                 from 'jsonwebtoken'

export class RealtorRepository {

  prisma = new PrismaClient()
  private select = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    introduction: true,
    phone: true,
    whatsapp: true,
    instagram: true,
    twitter: true,
    professional_email: true,
    website: true,
    profilePicture: true
  }
  private where = (search: string): Prisma.RealtorWhereInput =>
    search
      ? {
        OR: [
          {
            firstName: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        ]
      }
      : undefined

  public async findAll(search: string, page: number, take: number): Promise<PaginationResponse<RealtorResponse>> {

    const where = this.where(search)

    const totalOfRealtors = await this.prisma.realtor.count({ where })

    const realtors = await this.prisma.realtor.findMany({
      skip: take * (page - 1),
      take,
      where,
      select: this.select
    })

    return new PaginationResponse<RealtorResponse>(realtors, page, Math.ceil(totalOfRealtors / take))
  
  }

  public async get(id: number): Promise<RealtorResponse> {

    const realtor = await this.prisma.realtor.findUnique({
      where: { id },
      select: this.select
    })

    if (!realtor) throw new ApiError(404, 'realtor not found')

    return realtor
  
  }

  public async signIn(data: SignInRealtorRequest): Promise<string> {

    const { password, email } = data

    const { password: actualPassword, ...realtor } = await this.prisma.realtor.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true
      }
    })

    if (!realtor) throw new ApiError(404, 'realtor not found')

    const match = await compare(password, actualPassword)

    if (!match) throw new ApiError(400, 'password incorrect')

    const token = sign(realtor, process.env.API_SECRET, {
      expiresIn: '8h'
    })

    return token
  
  }

  public async create(data: CreateRealtorRequest): Promise<string> {

    const { password, ...realtorData } = data

    const realtorExists = await this.prisma.realtor.findUnique({
      where: {
        email: realtorData.email
      }
    })

    if (realtorExists) throw new ApiError(400, 'realtor already exists')

    const hashed = await hash(password, 10)

    const realtor = await this.prisma.realtor.create({
      data: {
        password: hashed,
        ...realtorData
      }
    })

    if (realtor) return 'created'
  
  }

  public async update(data: UpdateRealtorRequest): Promise<string> {

    const { user, ...dataUpdate } = data

    const realtor = await this.prisma.realtor.update({
      data: dataUpdate,
      where: {
        id: user.id
      }
    })

    if (realtor) return 'updated'
  
  }

  public async delete(id: number): Promise<string> {

    const realtor = await this.prisma.realtor.delete({
      where: {
        id
      }
    })

    if (realtor) return 'deleted'
  
  }

}
