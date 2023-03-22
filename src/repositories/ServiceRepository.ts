import { PrismaClient }         from "@prisma/client";
import { CreateServiceRequest } from "../dtos/requests/CreateServiceRequest";
import { DecodeRealtor }        from "../types/DecodeRealtor";

export class ServiceRepository {

  private prisma = new PrismaClient()

  public async findAllByRealtorId(realtorId: number){

    const services = await this.prisma.service.findMany({where:{ realtorId }})

    return services
  
  }

  public async add(data:CreateServiceRequest){

    const service = await this.prisma.service.create({data})
    if(service) return 'created'
  
  }

  public async remove(user:DecodeRealtor, id:number){

    const service = await this.prisma.service.findUnique({where: {id}})
    if(service.realtorId === user.id){

      const deleted = await this.prisma.service.delete({where: {id}})
      if(deleted) return 'deleted'
    
    }

  }

}