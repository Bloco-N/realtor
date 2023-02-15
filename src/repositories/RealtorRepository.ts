import { IRealtorRepository } from "./IRealtorRepository";
import { PrismaClient } from '@prisma/client'
import { CreateRealtorRequest } from "../dtos/requests/CreateRealtorRequest";
import { UpdateRealtorRequest } from "../dtos/requests/UpdateRealtorRequest";
import { RealtorResponse } from "../dtos/responses/RealtorResponse";
import { RealtorMapper } from "../mappers/RealtorMapper";

export class RealtorRepository implements IRealtorRepository {

  prisma = new PrismaClient()
  mapper = new RealtorMapper()

  public async findAll(): Promise<RealtorResponse[]> {

    const realtors = await this.prisma.realtor.findMany()
    const realtorsResponse = this.mapper.RealtorListToRealtorResponseList(realtors)
    return realtorsResponse

  }

  public async get(id: number): Promise<RealtorResponse> {

    const realtor = await this.prisma.realtor.findUnique({ where: { id } })
    const realtorResponse = this.mapper.RealtorToRealtorResponse(realtor)
    return realtorResponse

  }

  public async add(data: CreateRealtorRequest): Promise<String> {

    const realtor = await this.prisma.realtor.create({ data })
    if (realtor) return 'created'

  }

  public async update(data: UpdateRealtorRequest): Promise<String> {

    const { id, ...content } = data

    const realtor = await this.prisma.realtor.update({ data: content, where: { id } })
    if (realtor) return 'updated'

  }

  public async remove(id: number): Promise<String> {

    const realtor = await this.prisma.realtor.delete({ where: { id } })
    if (realtor) return 'deleted'

  }

}