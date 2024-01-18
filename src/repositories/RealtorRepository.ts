import { CreateAwardRequest } from '../dtos/requests/CreateAwardRequest'
import { CreateCourseRequest } from '../dtos/requests/CreateCourseRequest'
import { CreatePartnershipRequest } from '../dtos/requests/CreatePartnershipRequest'
import { CreatePropertyRequest } from '../dtos/requests/CreatePropertyRequest'
import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { SignInRealtorRequest } from '../dtos/requests/SignInRealtorRequest'
import { SingInGoogleRequest } from '../dtos/requests/SingInGoogleRequest'
import { UpdateCommentRequest } from '../dtos/requests/UpdateCommentRequest'
import { UpdatePropertyRequest } from '../dtos/requests/UpdatePropertyRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { PaginationResponse } from '../dtos/responses/PaginationResponse'
import { RealtorResponse } from '../dtos/responses/RealtorResponse'
import { ApiError } from '../errors/ApiError'
import { GeoApiService } from '../services/GeoApiService'
import { MailService } from '../services/MailService'
import { timeSince } from '../utils/timeSince'
import { Prisma, PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class RealtorRepository {
  prisma = new PrismaClient()

  private geoApiService = new GeoApiService()

  private mailService = new MailService()
  private select = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    introduction: true,
    phone: true,
    whatsapp: true,
    instagram: true,
    facebook: true,
    professional_email: true,
    website: true,
    profilePicture: true,
    expTime: true,
    coverPicture: true,
    fullCoverPicture: true,
    phoneCountry: true,
    wppCountry: true,
    wppText: true
  }
  private where = (search: string): Prisma.RealtorWhereInput =>
    search
      ? {
          OR: [
            {
              firstName: {
                contains: search.split(' ')[0],
                mode: 'insensitive'
              }
            },
            {
              lastName: {
                contains: search.split(' ')[search.split(' ').length - 1],
                mode: 'insensitive'
              }
            },
            {
              RealtorCities: {
                some: {
                  City: {
                    name: search
                  }
                }
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
      include: {
        Comments: true,
        Partnerships: {
          include: {
            Agency: true
          }
        },
        RealtorCities: {
          include: {
            City: true
          }
        },
        RealtorLanguages: {
          include: {
            Language: true
          }
        }
      }
    })

    const realtorsWithRating = realtors.map((realtor) => {
      let rating = 0

      if (realtor.Comments.length > 0) {
        rating =
          realtor.Comments.map((comment) => {
            return (
              (comment.marketExpertiseRating +
                comment.negotiationSkillsRating +
                comment.profissionalismAndComunicationRating +
                comment.responsivenessRating) /
              4
            )
          }).reduce((a, b) => a + b) / realtor.Comments.length
      }

      return {
        ...realtor,
        rating
      }
    })

    const realtorsWithLastExp = await Promise.all(
      realtorsWithRating.map(async (realtor) => {
        const partnerships = await this.findAllPartnerships(realtor.id)
        return {
          ...realtor,
          agencyName: partnerships[0]?.name ? partnerships[0].name : null,
          agencyPic: partnerships[0]?.pic ? partnerships[0].pic : null
        }
      })
    )

    return new PaginationResponse<RealtorResponse>(realtorsWithLastExp, page, Math.ceil(totalOfRealtors / take))
  }

  public async get(id: number): Promise<RealtorResponse> {
    let soldContador = 0
    let boughtContador = 0

    const soldOrBought = await this.prisma.comment.findMany({
      where: {
        realtorId: id
      }
    })

    soldOrBought.forEach((obj) => {
      if (obj.sold === 1) {
        soldContador++
      }
      if (obj.bought === 1) {
        boughtContador++
      }
    })

    const realtor = await this.prisma.realtor.findUnique({
      where: { id },
      include: {
        Comments: true,
        RealtorCities: {
          include: {
            City: true
          }
        },
        RealtorLanguages: {
          include: {
            Language: true
          }
        }
      }
    })

    let rating = 0

    if (realtor.Comments.length > 0) {
      rating =
        realtor.Comments.map((comment) => {
          return (
            (comment.marketExpertiseRating +
              comment.negotiationSkillsRating +
              comment.profissionalismAndComunicationRating +
              comment.responsivenessRating) /
            4
          )
        }).reduce((a, b) => a + b) / realtor.Comments.length
    }

    if (!realtor) throw new ApiError(404, 'realtor not found')

    return {
      ...realtor,
      rating,
      sold: soldContador,
      bought: boughtContador
    }
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

  public async signInGoogle(data: SingInGoogleRequest): Promise<string> {
    const { email } = data

    const realtorExists = await this.prisma.realtor.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    })

    if (!realtorExists) {
      const newRelator = await this.prisma.realtor.create({
        data: {
          ...data
        }
      })

      const token = sign(newRelator, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      return token
    }

    const token = sign(realtorExists, process.env.API_SECRET, {
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

  public async updatePassword(password: string, user) {
    const hashed = await hash(password, 10)

    const realtor = await this.prisma.realtor.update({
      data: {
        password: hashed
      },
      where: {
        id: user.id
      }
    })

    if (realtor) return 'updated'
  }

  public async recoverPassword(email: string) {
    const realtor = await this.prisma.realtor.findUnique({ where: { email } })
    if (realtor) {
      const token = sign(realtor, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      this.mailService.sendMail(realtor.email, 'Recupere sua senha', realtor.firstName, token, 'realtor')
      return 'email sended'
    } else {
      throw new ApiError(404, 'not found')
    }
  }

  public async verifyAccount(email: string) {
    const realtor = await this.prisma.realtor.findUnique({ where: { email } })
    if (realtor) {
      const token = sign(realtor, process.env.API_SECRET, {
        expiresIn: '8h'
      })

      this.mailService.verifyAccount(realtor.email, 'Verifique sua conta', realtor.firstName, token, 'realtor')

      return 'email sended'
    } else {
      throw new ApiError(404, 'not found')
    }
  }

  public async updateVerify(user) {
    const realtor = await this.prisma.realtor.update({
      data: {
        verified: true
      },
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

  public async findAllProperties(id: number) {
    const { Properties } = await this.prisma.realtor.findUnique({
      where: {
        id
      },
      select: {
        Properties: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    return Properties
  }

  public async addProperty(data: CreatePropertyRequest) {
    const { propertyData, realtorId } = data

    const properties = await this.prisma.realtor.update({
      where: {
        id: realtorId
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

  public async updateProperty(propertyId: number, data: UpdatePropertyRequest) {
    const { propertyData, realtorId } = data

    const properties = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Properties: {
          update: {
            where: { id: propertyId },
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

  public async deleteProperty(realtorId: number, propertyId: number) {
    const properties = await this.prisma.realtor.update({
      where: {
        id: realtorId
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

  public async findAllAwards(id: number) {
    const { Awards } = await this.prisma.realtor.findUnique({
      where: {
        id
      },
      select: {
        Awards: true
      }
    })

    return Awards
  }

  public async addAward(data: CreateAwardRequest) {
    const { realtorId, ...awardData } = data

    const awards = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Awards: {
          create: awardData
        }
      },
      select: {
        Awards: true
      }
    })

    if (awards) return 'created'
  }

  public async deleteAward(realtorId: number, awardId: number) {
    const awards = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Awards: {
          delete: {
            id: awardId
          }
        }
      },
      select: {
        Awards: true
      }
    })

    if (awards) return 'deleted'
  }

  public async findAllCourses(id: number) {
    const { Courses } = await this.prisma.realtor.findUnique({
      where: {
        id
      },
      select: {
        Courses: true
      }
    })

    return Courses
  }

  public async addCourse(data: CreateCourseRequest) {
    const { realtorId, ...courseData } = data

    const courses = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Courses: {
          create: courseData
        }
      },
      select: {
        Courses: true
      }
    })

    if (courses) return 'created'
  }

  public async deleteCourse(realtorId: number, courseId: number) {
    const courses = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Courses: {
          delete: {
            id: courseId
          }
        }
      },
      select: {
        Courses: true
      }
    })

    if (courses) return 'deleted'
  }

  public async findAllPartnerships(id: number) {
    const { Partnerships } = await this.prisma.realtor.findUnique({
      where: { id },
      select: {
        Partnerships: {
          include: {
            Agency: true
          }
        }
      }
    })

    const agencies = Partnerships.map((partnership) => partnership.agency)

    const uniqueAgencies = [...new Set(agencies)]

    const agenciesPartnerships = uniqueAgencies.map((agency) => Partnerships.filter((partnership) => partnership.agency === agency))

    return agenciesPartnerships.map((agenciePartnerships) => {
      return {
        list: agenciePartnerships.map((partnership) => {
          const initDatePt = partnership.init.toLocaleString('pt-BR', { month: 'short', year: 'numeric' })
          const endDatePt = partnership.end ? partnership.end.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }) : 'até o momento'

          const initDateEn = partnership.init.toLocaleString('en', { month: 'short', year: 'numeric' })
          const endDateEn = partnership.end ? partnership.end.toLocaleString('en', { month: 'short', year: 'numeric' }) : 'present'

          const initDateEs = partnership.init.toLocaleString('es', { month: 'short', year: 'numeric' })
          const endDateEs = partnership.end ? partnership.end.toLocaleString('es', { month: 'short', year: 'numeric' }) : 'hasta el momento'

          // const end = partnership.end ? partnership.end.getTime() : Date.now()

          // const period = ((end - partnership.init.getTime()) / 1000) * 60 * 60 * 24 * 30
          let periodPt = ''
          let periodEn = ''
          let periodEs = ''
          periodPt = timeSince('pt', partnership.init)
          periodEn = timeSince('en', partnership.init)
          periodEs = timeSince('es', partnership.init)
          if (partnership.end) {
            periodPt = timeSince('pt', partnership.init, partnership.end)
            periodEn = timeSince('en', partnership.init, partnership.end)
            periodEs = timeSince('es', partnership.init, partnership.end)
          }
          const workTimePt = `${initDatePt} - ${endDatePt} - ${periodPt}`
          const workTimeEn = `${initDateEn} - ${endDateEn} - ${periodEn}`
          const workTimeEs = `${initDateEs} - ${endDateEs} - ${periodEs}`

          return {
            id: partnership.id,
            title: partnership.title,
            agency: partnership.agency,
            workTime: {
              pt: workTimePt,
              en: workTimeEn,
              es: workTimeEs
            }
          }
        }),
        name: agenciePartnerships[0].agency,
        pic: agenciePartnerships[0].Agency?.profilePicture ? agenciePartnerships[0].Agency.profilePicture : null,
        agencyId: agenciePartnerships[0].agencyId
      }
    })
  }

  public async addPartnership(data: CreatePartnershipRequest) {
    const { realtorId, ...partnerShipData } = data

    const { AgencyCities, ...agency } = await this.prisma.agency.findUnique({
      where: {
        name: partnerShipData.agency
      },
      include: {
        AgencyCities: true
      }
    })

    const { RealtorCities, ...realtor } = await this.prisma.realtor.findUnique({
      where: {
        id: realtorId
      },
      include: {
        RealtorCities: true
      }
    })

    const agencyCities = AgencyCities.map(city => city.cityId) || [];
    const realtorCities = RealtorCities.map(city => city.cityId);

    const additionalCities = realtorCities.filter(cityId => !agencyCities.includes(cityId));
    const citiesToAdd = additionalCities.map(cityId => ({ cityId, agencyId: agency.id }));

    if(citiesToAdd.length > 0) {
      for(const city of citiesToAdd){
        const added = await this.prisma.agency.update({
          where: {
            id: agency.id
          },
          data: {
            AgencyCities: {
              create: {
                cityId: city.cityId,
              }
            }
          }
        })
      }
    }
    const agencyId = agency ? agency.id : undefined

    const added = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Partnerships: {
          create: {
            title: partnerShipData.title,
            agency: partnerShipData.agency,
            init: new Date(partnerShipData.init),
            end:partnerShipData.end ? new Date(partnerShipData.end) : null,
            agencyId
          }
        }
      }
    })

    if (added) return 'updated'
  }

  public async deletePartnership(realtorId: number, partnershipId: number) {
    const deleted = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        Partnerships: {
          delete: {
            id: partnershipId
          }
        }
      }
    })

    if (deleted) return 'deleted'
  }

  public async findAllComments(id: number) {
    const { Comments } = await this.prisma.realtor.findUnique({
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
        rating:
          (comment.marketExpertiseRating +
            comment.negotiationSkillsRating +
            comment.profissionalismAndComunicationRating +
            comment.responsivenessRating) /
          4,
        text: comment.text,
        reply: comment.reply
      }
    })

    return averageComments
  }

  public async updateComment(id: number, data: UpdateCommentRequest) {
    const comment = await this.prisma.comment.update({
      where: {
        id
      },
      data
    })

    if (comment) return 'updated'
  }

  public async listAllCities(id: number) {
    const cities: Array<string> = await this.geoApiService.listAllCities()

    const realtor = await this.prisma.realtor.findUnique({ where: { id }, include: { RealtorCities: { include: { City: true } } } })

    const removeCities = new Set(realtor.RealtorCities.map((item) => item.City.name))

    const allCities = cities.filter((item) => {
      return !removeCities.has(item)
    })

    return allCities
  }

  public async addCity(name: string, id: number) {
    const dbCity = await this.prisma.city.findUnique({
      where: {
        name
      }
    })

    if (!dbCity) {
      const newCity = await this.prisma.city.create({ data: { name } })

      const realtorCity = await this.prisma.realtor.update({
        where: {
          id
        },
        data: {
          RealtorCities: {
            create: {
              City: {
                connect: {
                  id: newCity.id
                }
              }
            }
          }
        }
      })

      if (realtorCity) return 'updated'
    } else {
      const realtorCity = await this.prisma.realtor.update({
        where: {
          id
        },
        data: {
          RealtorCities: {
            create: {
              City: {
                connect: {
                  id: dbCity.id
                }
              }
            }
          }
        }
      })

      if (realtorCity) return 'updated'
    }
  }

  public async deleteCity(realtorId: number, cityId: number) {
    const realtorCities = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        RealtorCities: {
          delete: {
            id: cityId
          }
        }
      },
      select: {
        RealtorCities: true
      }
    })

    if (realtorCities) return 'deleted'
  }

  public async addLanguage(name: string, id: number) {
    const idLanguageName = await this.prisma.languageName.findUnique({
      where: {
        name
      }
    })

    const realtor = await this.prisma.realtor.findUnique({
      where: {
        id
      },
      include: {
        RealtorLanguages: {
          include: {
            Language: true
          }
        }
      }
    })

    if (realtor.RealtorLanguages.map((item) => item.Language.name).includes(name)) return 'updated'

    const dbLanguage = await this.prisma.language.findUnique({
      where: {
        name
      }
    })

    if (!dbLanguage) {
      const newLanguage = await this.prisma.language.create({ data: { name, idLanguageName: idLanguageName.id } })

      const realtorLanguage = await this.prisma.realtor.update({
        where: {
          id
        },
        data: {
          RealtorLanguages: {
            create: {
              Language: {
                connect: {
                  id: newLanguage.id
                }
              }
            }
          }
        }
      })

      if (realtorLanguage) return 'updated'
    } else {
      const realtorLanguage = await this.prisma.realtor.update({
        where: {
          id
        },
        data: {
          RealtorLanguages: {
            create: {
              Language: {
                connect: {
                  id: dbLanguage.id
                }
              }
            }
          }
        }
      })

      if (realtorLanguage) return 'updated'
    }
  }

  public async deleteLanguage(realtorId: number, languageId: number) {
    const realtorLanguages = await this.prisma.realtor.update({
      where: {
        id: realtorId
      },
      data: {
        RealtorLanguages: {
          delete: {
            id: languageId
          }
        }
      },
      select: {
        RealtorLanguages: true
      }
    })

    if (realtorLanguages) return 'deleted'
  }
}
