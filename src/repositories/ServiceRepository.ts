import { PrismaClient } from "@prisma/client";
export class ServiceRepository {

  private prisma = new PrismaClient()

  public async findAll(){

    const services = await this.prisma.service.findMany()
    return services

  }

  public async findAllByRealtor(realtorId:number){

    const realtorServices = await this.prisma.realtorService.findMany({where:{realtorId}, include: {Service: true}})

    const services = realtorServices.map(item =>{

      return {
        id: item.id,
        service:item.Service
      }
    
    })

    return services

  }

  public async createRealtorService(realtorId: number, serviceId: number){

    const created = await this.prisma.realtorService.create({data:{
      realtorId,
      serviceId
    }})

    if(created) return 'created'

  }

  public async removeRealtorService(id: number){

    const deleted = await this.prisma.realtorService.delete({where:{id}})

    if(deleted) return 'deleted'

  }

}