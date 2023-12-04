import { EnergyEfficience, Preservation, PropertyType } from '@prisma/client'

export interface CreatePropertyRequest {
  propertyData: {
    title: string
    link: string
    profilePicture: string
    realtorId: number
    price: string
    propertyType: PropertyType
    preservation: Preservation
    energyefficience: EnergyEfficience
  }
  realtorId: number
}

export interface CreatePropertyRequestAgency {
  propertyData: {
    title: string
    link: string
    profilePicture: string
    realtorId: number
    price: string
    propertyType: PropertyType
    preservation: Preservation
    energyefficience: EnergyEfficience
  }
  agencyId: number
}