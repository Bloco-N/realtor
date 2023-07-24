export interface UpdateClientRequest {
  password?: string
  firstName?: string
  lastName?: string
  phone?: string
  country?: string
  city?: string
  address?: string
  zipCode?: string
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
}
