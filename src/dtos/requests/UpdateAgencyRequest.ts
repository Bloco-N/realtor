export interface UpdateAgencyRequest {
  password?: string
  name?: string
  description?: string
  phone?: string
  whatsapp?: string
  instagram?: string
  twitter?: string
  professional_email?: string
  website?: string
  adress?:string
  user: {
    id: number
    email: string
    name: string
  }
}
