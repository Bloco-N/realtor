import {EnergyEfficience, Preservation, PropertyType } from '@prisma/client'

export interface UpdatePropertyRequest {
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

export interface UpdatePropertyRequestAgency {
  propertyData: {
    title: string
    link: string
    profilePicture: string
    agencyId: number
    price: string
    propertyType: PropertyType
    preservation: Preservation
    energyefficience: EnergyEfficience
  }
  agencyId: number
}
