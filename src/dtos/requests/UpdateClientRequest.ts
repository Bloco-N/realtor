export interface UpdateClientRequest {
  password?: string
  firstName?: string
  lastName?: string
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
}
