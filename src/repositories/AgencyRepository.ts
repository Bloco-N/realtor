import { CreateAgencyRequest }  from '../dtos/requests/CreateAgencyRequest'
import { SignInAgencyRequest }  from '../dtos/requests/SingInAgencyRequest'
import { UpdateAgencyRequest }  from '../dtos/requests/UpdateAgencyRequest'
import { AgencyResponse }       from '../dtos/responses/AgencyResponse'
import { PaginationResponse }   from '../dtos/responses/PaginationResponse'
import { ApiError }             from '../errors/ApiError'
import { Prisma, PrismaClient } from '@prisma/client'
import { compare, hash }        from 'bcryptjs'
import { sign }                 from 'jsonwebtoken'

export class AgencyRepository {

  prisma = new PrismaClient()
  private select = {
    id: true,
    email: true,
    name: true,
    description: true,
    phone: true,
    whatsapp: true,
    instagram: true,
    twitter: true,
    professional_email: true,
    website: true
  }

  private where = (search: string): Prisma.AgencyWhereInput =>
    search
      ? {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
      : undefined

  public async findAll(search: string, page: number, take: number): Promise<PaginationResponse<AgencyResponse>> {

    const where = this.where(search)

    const totalOfAgencies = await this.prisma.agency.count({ where })

    const agencies = await this.prisma.agency.findMany({
      skip: take * (page - 1),
      take,
      where,
      select: this.select
    })

    return new PaginationResponse<AgencyResponse>(agencies, page, Math.ceil(totalOfAgencies / take))
  
  }

  public async get(id: number): Promise<AgencyResponse> {

    const client = await this.prisma.agency.findUnique({
      where: { id },
      select: this.select
    })

    if (!client) throw new ApiError(404, 'agency not found')

    return client
  
  }

  public async signIn(data: SignInAgencyRequest): Promise<string> {

    const { password, email } = data

    const { password: actualPassword, ...agency } = await this.prisma.agency.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true
      }
    })

    if (!agency) throw new ApiError(404, 'agency not found')

    const match = await compare(password, actualPassword)

    if (!match) throw new ApiError(400, 'password incorrect')

    const token = sign(agency, process.env.API_SECRET, {
      expiresIn: '8h'
    })

    return token
  
  }

  public async create(data: CreateAgencyRequest): Promise<string> {

    const { password, ...agencyData } = data

    const agencyExists = await this.prisma.agency.findUnique({
      where: {
        email: agencyData.email
      }
    })

    if (agencyExists) throw new ApiError(400, 'agency already exists')

    const hashed = await hash(password, 10)

    const agency = await this.prisma.agency.create({
      data: {
        password: hashed,
        ...agencyData
      }
    })

    if (agency) return 'created'
  
  }

  public async update(data: UpdateAgencyRequest): Promise<string> {

    const { user, ...dataUpdate } = data

    const agency = await this.prisma.agency.update({
      data: dataUpdate,
      where: {
        id: user.id
      }
    })

    if (agency) return 'updated'
  
  }

  public async delete(id: number): Promise<string> {

    const agency = await this.prisma.agency.delete({
      where: {
        id
      }
    })

    if (agency) return 'deleted'
  
  }

}