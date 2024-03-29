export interface RealtorResponse {
  id: number
  email: string
  firstName: string
  lastName: string
  introduction: string | null
  phone: string | null
  whatsapp: string | null
  instagram: string | null
  facebook: string | null
  professional_email: string | null
  website: string | null
  rating: number 
  sold?: number | null,
  bought?:number | null
}
