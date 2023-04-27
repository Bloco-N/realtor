import { Preservation, PropertyType } from '@prisma/client'

export interface CreatePropertyRequest {
  propertyData: {
    title: string
    link: string
    profilePicture: string
    realtorId: number
    price: string
    propertyType: PropertyType
    preservation: Preservation
  }
  realtorId: number
}
