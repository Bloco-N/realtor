import { CreateClientRequest }  from '../dtos/requests/CreateClientRequest'
import { SignInClientRequest }  from '../dtos/requests/SingInClientRequest'
import { UpdateClientRequest }  from '../dtos/requests/UpdateClientRequest'
import { ClientResponse }       from '../dtos/responses/ClientResponse'
import { PaginationResponse }   from '../dtos/responses/PaginationResponse'
import { ApiError }             from '../errors/ApiError'
import { Prisma, PrismaClient } from '@prisma/client'
import { compare, hash }        from 'bcryptjs'
import { sign }                 from 'jsonwebtoken'

export class ClientRepository {

  prisma = new PrismaClient()
  private select = {
    id: true,
    email: true,
    firstName: true,
    lastName: true
  }

  private where = (search: string): Prisma.ClientWhereInput =>
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

  public async findAll(search: string, page: number, take: number): Promise<PaginationResponse<ClientResponse>> {

    const where = this.where(search)

    const totalOfClients = await this.prisma.client.count({ where })

    const clients = await this.prisma.client.findMany({
      skip: take * (page - 1),
      take,
      where,
      select: this.select
    })

    return new PaginationResponse<ClientResponse>(clients, page, Math.ceil(totalOfClients / take))
  
  }

  public async get(id: number): Promise<ClientResponse> {

    const client = await this.prisma.client.findUnique({
      where: { id },
      select: this.select
    })

    if (!client) throw new ApiError(404, 'realtor not found')

    return client
  
  }

  public async signIn(data: SignInClientRequest): Promise<string> {

    const { password, email } = data

    const { password: actualPassword, ...client } = await this.prisma.client.findUnique({
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

    if (!client) throw new ApiError(404, 'client not found')

    const match = await compare(password, actualPassword)

    if (!match) throw new ApiError(400, 'password incorrect')

    const token = sign(client, process.env.API_SECRET, {
      expiresIn: '8h'
    })

    return token
  
  }

  public async create(data: CreateClientRequest): Promise<string> {

    const { password, ...clientData } = data

    const clientExists = await this.prisma.client.findUnique({
      where: {
        email: clientData.email
      }
    })

    if (clientExists) throw new ApiError(400, 'client already exists')

    const hashed = await hash(password, 10)

    const client = await this.prisma.client.create({
      data: {
        password: hashed,
        ...clientData
      }
    })

    if (client) return 'created'
  
  }

  public async update(data: UpdateClientRequest): Promise<string> {

    const { user, ...dataUpdate } = data

    const client = await this.prisma.client.update({
      data: dataUpdate,
      where: {
        id: user.id
      }
    })

    if (client) return 'updated'
  
  }

  public async delete(id: number): Promise<string> {

    const client = await this.prisma.client.delete({
      where: {
        id
      }
    })

    if (client) return 'deleted'
  
  }

}