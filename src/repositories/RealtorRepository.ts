import { CreateAwardRequest }    from '../dtos/requests/CreateAwardRequest'
import { CreateCourseRequest }   from '../dtos/requests/CreateCourseRequest'
import { CreatePropertyRequest } from '../dtos/requests/CreatePropertyRequest'
import { CreateRealtorRequest }  from '../dtos/requests/CreateRealtorRequest'
import { SignInRealtorRequest }  from '../dtos/requests/SignInRealtorRequest'
import { UpdateRealtorRequest }  from '../dtos/requests/UpdateRealtorRequest'
import { PaginationResponse }    from '../dtos/responses/PaginationResponse'
import { RealtorResponse }       from '../dtos/responses/RealtorResponse'
import { ApiError }              from '../errors/ApiError'
import { Prisma, PrismaClient }  from '@prisma/client'
import { compare, hash }         from 'bcryptjs'
import { sign }                  from 'jsonwebtoken'

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
    facebook: true,
    professional_email: true,
    website: true,
    profilePicture: true,
    expTime: true,
    coverPicture: true,
    phoneCountry: true,
    wppCountry: true,
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

  public async findAllProperties(id: number) {

    const { Properties } = await this.prisma.realtor.findUnique({
      where: {
        id
      },
      select: {
        Properties: true
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

  public async addAward(data:CreateAwardRequest){

    const { realtorId, ...awardData} = data

    const awards = await this.prisma.realtor.update({
      where:{
        id: realtorId
      },
      data:{
        Awards:{
          create: awardData
        }
      },
      select:{
        Awards: true
      }
    })

    if(awards) return 'created'

  }

  public async deleteAward(realtorId:number, awardId:number){

    const awards = await this.prisma.realtor.update({
      where:{
        id: realtorId
      },
      data:{
        Awards:{
          delete: {
            id: awardId
          }
        }
      },
      select:{
        Awards: true
      }
    })

    if(awards) return 'deleted'

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

  public async addCourse(data:CreateCourseRequest){

    const { realtorId, ...courseData} = data

    const courses = await this.prisma.realtor.update({
      where:{
        id: realtorId
      },
      data:{
        Courses:{
          create: courseData
        }
      },
      select:{
        Courses: true
      }
    })

    if(courses) return 'created'

  }

  public async deleteCourse(realtorId:number, courseId:number){

    const courses = await this.prisma.realtor.update({
      where:{
        id: realtorId
      },
      data:{
        Courses:{
          delete: {
            id: courseId
          }
        }
      },
      select:{
        Courses: true
      }
    })

    if(courses) return 'deleted'

  }

}
