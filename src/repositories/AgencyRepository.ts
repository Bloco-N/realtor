import { CreateAgencyRequest }         from '../dtos/requests/CreateAgencyRequest'
import { SignInAgencyRequest }         from '../dtos/requests/SingInAgencyRequest'
import { UpdateAgencyRequest }         from '../dtos/requests/UpdateAgencyRequest'
import { AgencyResponse }              from '../dtos/responses/AgencyResponse'
import { PaginationResponse }          from '../dtos/responses/PaginationResponse'
import { ApiError }                    from '../errors/ApiError'
import { Prisma, PrismaClient }        from '@prisma/client'
import { compare, hash }               from 'bcryptjs'
import { sign }                        from 'jsonwebtoken'
import { MailService }                 from '../services/MailService'
import { CreatePropertyRequestAgency } from '../dtos/requests/CreatePropertyRequest'
import { GeoApiService }               from '../services/GeoApiService'
import { UpdatePropertyRequestAgency } from '../dtos/requests/UpdatePropertyRequest'
import { SingInGoogleRequest } from '../dtos/requests/SingInGoogleRequest'

export class AgencyRepository {

  prisma = new PrismaClient()
  private mailService = new MailService()
  private geoApiService = new GeoApiService()
  private select = {
    id: true,
    email: true,
    name: true,
    description: true,
    phone: true,
    whatsapp: true,
    instagram: true,
    professional_email: true,
    website: true,
    profilePicture: true,
    coverPicture: true,
    fullCoverPicture: true,
    phoneCountry: true,
    wppCountry: true,
    wppText: true,
    verified: true
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

  public async findAllWithOutPagination(){

    const agencies = await this.prisma.agency.findMany()
    return agencies
  
  }

  public async get(id: number): Promise<AgencyResponse> {

    const client = await this.prisma.agency.findUnique({
      where: { id },
      include:{
        Comments: true,
        Partnerships:{
          include:{
            Realtor: {
              include:{
                Properties:true
              }
            }
          }
        },
        AgencyLanguages:{
          include:{
            Language: true
          }
        },
        AgencyServices:{
          include:{
            Service: true
          }
        },
        AgencyCities: {
          include: {
            City: true
          }
        }
      }
    })

    if (!client) throw new ApiError(404, 'agency not found')

    return client
  
  }

  public async signIn(data: SignInAgencyRequest): Promise<string> {

    const { password, email } = data

    const agency = await this.prisma.agency.findUnique({
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

    if (!agency) throw new ApiError(400, 'agency or password incorrect')

    const match = await compare(password, agency.password)

    if (!match) throw new ApiError(400, 'agency or password incorrect')

    const token = sign(agency, process.env.API_SECRET, {
      expiresIn: '8h'
    })

    return token
  
  }  
  
  public async signInGoogle(data: SingInGoogleRequest): Promise<string> {

    const { email } = data

    const agencyExists = await this.prisma.agency.findUnique({
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
    if (!agencyExists) {
      const newAgency = await this.prisma.agency.create({
        data: {
          ...data,
        },
      });

      const token = sign(newAgency, process.env.API_SECRET, {
        expiresIn: '8h',
      });

      return token;
    }

    const token = sign(agencyExists, process.env.API_SECRET, {
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

  public async updatePassword(password:string, user){

    const hashed = await hash(password, 10)

    const agency = await this.prisma.agency.update({
      data: {
        password: hashed
      },
      where: {
        id: user.id
      }
    })

    if(agency) return 'updated'

  }

  public async recoverPassword(email:string){
    
    const agency = await this.prisma.agency.findUnique({where:{email}}) 
    if(agency){

      const token = sign(agency, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      this.mailService.sendMail(agency.email, 'Recupere sua senha', agency.name, token, 'agency')
      return 'email sended'

    }else{

      throw new ApiError(404, 'not found')
    
    }
  
  }

  public async verifyAccount(email:string){

    const agency = await this.prisma.agency.findUnique({where:{email}}) 
    if(agency){

      const token = sign(agency, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      this.mailService.verifyAccount(agency.email, 'Verifique sua conta', agency.name, token, 'agency')

      return 'email sended'
    
    }else{

      throw new ApiError(404, 'not found')
    
    }
  
  }

  public async updateVerify(user){

    const agency = await this.prisma.agency.update({
      data: {
        verified: true
      },
      where: {
        id: user.id
      }
    })

    if(agency) return 'updated'

  }

  public async findAllProperties(id: number) {

    const { Properties } = await this.prisma.agency.findUnique({
      where: {
        id
      },
      select: {
        Properties: true
      }
    })

    return Properties
  
  }

  public async addProperty(data: CreatePropertyRequestAgency) {

    const { propertyData, agencyId } = data

    const properties = await this.prisma.agency.update({
      where: {
        id: agencyId
      },
      data: {
        Properties: {
          create: propertyData
        }
      },
      select: {
        Properties: true
      }
    })

    if (properties) return 'created'
  
  }

  public async updateProperty(propertyId: number, data: UpdatePropertyRequestAgency) {

    const { propertyData, agencyId } = data

    const properties = await this.prisma.realtor.update({
      where: {
        id: agencyId
      },
      data: {
        Properties: {
          update: {
            where: {id: propertyId},
            data: propertyData
          }
        }
      },
      select: {
        Properties: true
      }
    })

    if (properties) return 'updated'
  
  }

  public async deleteProperty(agencyId: number, propertyId: number) {

    const properties = await this.prisma.agency.update({
      where: {
        id: agencyId
      },
      data: {
        Properties: {
          delete: {
            id: propertyId
          }
        }
      },
      select: {
        Properties: true
      }
    })

    if (properties) return 'deleted'
  
  }

  public async listAllCities(id: number){

    const cities:Array<string> = await this.geoApiService.listAllCities()

    const realtor = await this.prisma.agency.findUnique({ where: { id }, include:{ AgencyCities: {include: { City: true}}}})

    const removeCities = new Set(realtor.AgencyCities.map(item => item.City.name))

    const allCities = cities.filter(item => {

      return !removeCities.has(item)
    
    })

    return allCities

  }

  public async addCity(name: string, id:number){

    const dbCity = await this.prisma.city.findUnique({
      where: {
        name
      }
    })

    if(!dbCity) {

      const newCity = await this.prisma.city.create({ data:{ name }})

      const agencyCity = await this.prisma.agency.update({
        where:{
          id
        },
        data:{
          AgencyCities:{
            create:{
              City:{
                connect:{
                  id: newCity.id
                }
              }
            }
          }
        }
      })

      if(agencyCity) return 'updated'
    
    }else{

      const agencyCity = await this.prisma.agency.update({
        where:{
          id
        },
        data:{
          AgencyCities:{
            create:{
              City:{
                connect:{
                  id: dbCity.id
                }
              }
            }
          }
        }
      })

      if(agencyCity) return 'updated'
    
    }
  
  }

  public async deleteCity(agencyId: number, cityId:number){

    const agencyCities = await this.prisma.agency.update({
      where: {
        id: agencyId
      },
      data: {
        AgencyCities: {
          delete: {
            id: cityId
          }
        }
      },
      select: {
        AgencyCities: true
      }
    })

    if (agencyCities) return 'deleted'

  }

  public async findAllComments(id: number) {

    const { Comments } = await this.prisma.agency.findUnique({
      where: {
        id
      },
      select: {
        Comments: {
          include: {
            Client: true
          }
        }
      }
    })

    const averageComments = Comments.map((comment) => {

      return {
        id: comment.id,
        clientId: comment.clientId,
        clientName: comment.Client.firstName + ' ' + comment.Client.lastName,
        rating: (comment.marketExpertiseRating + comment.negotiationSkillsRating + comment.profissionalismAndComunicationRating + comment.responsivenessRating) / 4,
        text: comment.text
      }
    
    })

    return averageComments
  
  }

  public async addLanguage(name:string, id: number){

    const agency = await this.prisma.agency.findUnique({
      where:{
        id
      },
      include:{
        AgencyLanguages:{
          include:{
            Language: true
          }
        }
      }
    })

    if(agency.AgencyLanguages.map(item => item.Language.name).includes(name)) return 'updated'

    const dbLanguage = await this.prisma.language.findUnique({
      where: {
        name
      }
    })

    if(!dbLanguage) {

      const newLanguage = await this.prisma.language.create({ data:{ name }})

      const agencyLanguage = await this.prisma.agency.update({
        where:{
          id
        },
        data:{
          AgencyLanguages:{
            create:{ 
              Language:{
                connect:{
                  id: newLanguage.id
                }
              }
            }
          }
        }
      })

      if(agencyLanguage) return 'updated'
    
    }else{

      const agencyLanguage = await this.prisma.agency.update({
        where:{
          id
        },
        data:{
          AgencyLanguages:{
            create:{
              Language:{
                connect:{
                  id: dbLanguage.id
                }
              }
            }
          }
        }
      })

      if(agencyLanguage) return 'updated'
    
    }

  }

  public async deleteLanguage(agencyId: number, languageId:number){

    const agencyLanguages = await this.prisma.agency.update({
      where: {
        id: agencyId
      },
      data: {
        AgencyLanguages: {
          delete: {
            id: languageId
          }
        }
      },
      select: {
        AgencyLanguages: true
      }
    })

    if (agencyLanguages) return 'deleted'

  }

}
