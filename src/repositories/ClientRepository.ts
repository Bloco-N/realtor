
import { CreateClientRequest }                              from '../dtos/requests/CreateClientRequest'
import { CreateCommentRequest, CreateCommentRequestAgency } from '../dtos/requests/CreateCommentRequest'
import { SignInClientRequest }                              from '../dtos/requests/SingInClientRequest'
import { UpdateClientRequest }                              from '../dtos/requests/UpdateClientRequest'
import { SingInGoogleRequest }                              from '../dtos/requests/SingInGoogleRequest'
import { ClientResponse }                                   from '../dtos/responses/ClientResponse'
import { PaginationResponse }                               from '../dtos/responses/PaginationResponse'
import { ApiError }                                         from '../errors/ApiError'
import { Prisma, PrismaClient }                             from '@prisma/client'
import { compare, hash }                                    from 'bcryptjs'
import { sign }                                             from 'jsonwebtoken'
import { MailService }                                      from '../services/MailService'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export class ClientRepository {

  prisma = new PrismaClient()

  private mailService = new MailService()
  private select = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    verified: true
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
      where: { id }
    })

    if (!client) throw new ApiError(404, 'client not found')

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

  public async signInGoogle(data: SingInGoogleRequest): Promise<string> {
    const { email } = data;

    try {
      const clientExists = await this.prisma.client.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
  
      if (!clientExists) {
        const newClient = await this.prisma.client.create({
          data: {
            ...data,
          },
        });
  
        const token = sign(newClient, process.env.API_SECRET, {
          expiresIn: '8h',
        });
  
        return token;
      }
  
      const token = sign(clientExists, process.env.API_SECRET, {
        expiresIn: '8h',
      });
  
      return token;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        console.error('Endereço de e-mail duplicado.');
      } else {
        console.error('Erro ao criar/atualizar cliente:', error);
      }
      throw new Error('Erro durante o login com o Google.');
    }
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

  public async addComment(data: CreateCommentRequest){

    const client = await this.prisma.client.findUnique({
      where:{
        id: data.clientId
      }
    })
    // Pedro
    // for (let key in client) {   
    //   if (client[key] === null || client[key] === undefined || client[key] === false) {
    //     return false;
    //   }
    // }

    const comment = await this.prisma.comment.create({
      data:{
        ...data,
        dateOftheDeed: new Date(`${data.dateOftheDeed} 00:00:00`)
      }
    })

    if(comment) return 'created'
  
  }

  public async addCommentAgency(data: CreateCommentRequestAgency){

    const comment = await this.prisma.commentAgency.create({
      data
    })

    if(comment) return 'created'
  
  }

  public async deleteComment(clientId: number, commentId: number){

    const deleted = await this.prisma.client.update({
      where:{
        id: clientId
      },
      data:{
        Comment:{
          delete:{
            id:commentId
          }
        }
      }
    })

    if(deleted) return 'deleted'

  }

  public async deleteCommentAgency(clientId: number, commentId: number){

    const deleted = await this.prisma.client.update({
      where:{
        id: clientId
      },
      data:{
        CommentAgency:{
          delete:{
            id:commentId
          }
        }
      }
    })

    if(deleted) return 'deleted'

  }

  public async updatePassword(password:string, user){

    const hashed = await hash(password, 10)

    const client = await this.prisma.client.update({
      data: {
        password: hashed
      },
      where: {
        id: user.id
      }
    })

    if(client) return 'updated'

  }

  public async recoverPassword(email:string){
    
    const client = await this.prisma.client.findUnique({where:{email}}) 
    if(client){

      const token = sign(client, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      this.mailService.sendMail(client.email, 'Recupere sua senha', client.firstName, token, 'client')
      return 'email sended'

    }else{

      throw new ApiError(404, 'not found')
    
    }
  
  }

  public async reportAnunce(anuncio:string, descricao:string, name:string,idAnuncio:string,title:string,profile:string){


    if(true){



      //this.mailService.sendMail('henreke@hotmail.com', anuncio+' '+descricao, 'Primeiro nome', 'token', 'client')
      this.mailService.sendMailReport('henreke@hotmail.com',descricao,name,idAnuncio,profile,title);
      return 'email sended'

    }else{

      throw new ApiError(404, 'not found')

    }

  }

  public async verifyAccount(email:string){

    const client = await this.prisma.client.findUnique({where:{email}}) 
    if(client){

      const token = sign(client, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      this.mailService.verifyAccount(client.email, 'Verifique sua conta', client.firstName, token, 'client')

      return 'email sended'
    
    }else{

      throw new ApiError(404, 'not found')
    
    }
  
  }

  public async updateVerify(user){

    const client = await this.prisma.client.update({
      data: {
        verified: true
      },
      where: {
        id: user.id
      }
    })

    if(client) return 'updated'

  }

}
