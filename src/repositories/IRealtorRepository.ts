import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { PaginationResponse }   from '../dtos/responses/PaginationResponse'
import { RealtorResponse }      from '../dtos/responses/RealtorResponse'

export interface IRealtorRepository {
  findAll: (search: string, page: number, offset: number) => Promise<PaginationResponse<RealtorResponse>>
  get: (id: number) => Promise<RealtorResponse>
  add: (data: CreateRealtorRequest) => Promise<string>
  update: (data: UpdateRealtorRequest) => Promise<string>
  remove: (id: number) => Promise<string>
}
