import { PrismaClient }          from "@prisma/client";
import { DecodeRealtor }         from "../types/DecodeRealtor";
import { CreatePropertyRequest } from "../dtos/requests/CreatePropertyRequest"

export class PropertyRepository{

  prisma = new PrismaClient()

  public async findAllFromRealtorId(realtorId: number){

    const properties = await this.prisma.property.findMany({where:{ realtorId: realtorId }})

    return properties

  }

  public async add(data:CreatePropertyRequest){

    const property = await this.prisma.property.create({data})
    if(property) return 'created'
  
  }

  public async remove(user:DecodeRealtor, id:number){

    const property = await this.prisma.property.findUnique({where: {id}})
    if(property.realtorId === user.id){

      const deleted = await this.prisma.property.delete({where: {id}})
      if(deleted) return 'deleted'
    
    }

  }

}