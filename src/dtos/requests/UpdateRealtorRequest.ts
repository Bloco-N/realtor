export interface UpdateRealtorRequest {
  password?: string
  firstName?: string
  lastName?: string
  expTime?: number | null
  introduction?: string | null
  phone?: string | null
  whatsapp?: string | null
  instagram?: string | null
  facebook?: string | null
  professional_email?: string | null
  website?: string | null
  coverPicture?: string | null
  fullCoverPicture?: string | null
  profilePicture?: string | null
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
}
