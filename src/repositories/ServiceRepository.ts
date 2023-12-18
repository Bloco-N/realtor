import { PrismaClient } from '@prisma/client'

export class ServiceRepository {

  private prisma = new PrismaClient()

  public async findAll() {

    const services = await this.prisma.service.findMany()
    return services
  
  }

  public async findAllByRealtor(realtorId: number) {

    const realtorServices = await this.prisma.realtorService.findMany({ where: { realtorId }, include: { Service: true } })

    const services = realtorServices.map((item) => {

      return {
        id: item.id,
        service: item.Service
      }
    
    })

    return services
  
  }

  public async createRealtorService(realtorId: number, serviceId: number) {

    const created = await this.prisma.realtorService.create({
      data: {
        realtorId,
        serviceId
      }
    })

    if (created) return 'created'
  
  }

  public async removeRealtorService(id: number) {

    const deleted = await this.prisma.realtorService.delete({ where: { id } })

    if (deleted) return 'deleted'
  
  }

  public async findAllByAgency(agencyId: number) {

    const agencyServices = await this.prisma.agencyService.findMany({ where: { agencyId }, include: { Service: true } })

    const services = agencyServices.map((item) => {

      return {
        id: item.id,
        service: item.Service
      }
    
    })

    return services
  
  }

  public async createAgencyService(agencyId: number, serviceId: number) {

    const created = await this.prisma.agencyService.create({
      data:{
        agencyId,
        serviceId
      }
    })

    if (created) return 'created'
  
  }

  public async removeAgencyService(id: number) {

    const deleted = await this.prisma.agencyService.delete({ where: { id } })

    if (deleted) return 'deleted'
  
  }

  public async listLanguageName(id:number) {

    const languages = await this.prisma.languageName.findMany({select: {name:true}})
    console.log(languages, "teste")

    const realtor = await this.prisma.realtor.findUnique({ where: { id }, include:{ RealtorLanguages: {include: { Language: true}}}})

    const removeLanguage = new Set(realtor.RealtorLanguages.map(item => item.Language.name))

    console.log(removeLanguage)

    const allLanguage = languages.filter((item) => {
      return !removeLanguage.has(item.name)
    })
    
    return allLanguage

  }

}
