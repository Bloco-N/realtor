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
    const newLanguages = []

    const languages = await this.prisma.languageName.findMany({select: {name:true}})

    for(const language of languages){
      newLanguages.push(language.name)
    }
    const realtor = await this.prisma.realtor.findUnique({ where: { id }, include:{ RealtorLanguages: {include: { Language: true}}}})

    var removeLanguage = new Set();
    if (realtor !== null){
      removeLanguage = new Set(realtor.RealtorLanguages.map(item => item.Language.name))
    } 
    const allLanguage = newLanguages.filter((item) => {
      return !removeLanguage.has(item)
    })

    const withoutSymbols = allLanguage.filter(lang => !/[^\w\s]/.test(lang)).sort();
    const withSymbols = allLanguage.filter(lang => /[^\w\s]/.test(lang)).sort();
    const sortedLanguages = [...withoutSymbols, ...withSymbols];

    return sortedLanguages

  }

}
