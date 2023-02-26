export interface UpdateRealtorRequest {
  password?: string
  firstName?: string
  lastName?: string
  introduction?: string | null
  phone?: string | null
  whatsapp?: string | null
  instagram?: string | null
  twitter?: string | null
  professional_email?: string | null
  website?: string | null
  user:{
    id:number,
    email:string,
    firstName:string
    lastName:string
  }
}
