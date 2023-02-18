import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { RealtorResponse }      from '../dtos/responses/RealtorResponse'

export interface IRealtorRepository {
  findAll: (search: string, page: number, offset: number) => Promise<RealtorResponse[]>
  get: (id: number) => Promise<RealtorResponse | Error>
  add: (data: CreateRealtorRequest) => Promise<string>
  update: (data: UpdateRealtorRequest) => Promise<string>
  remove: (id: number) => Promise<string>
}
