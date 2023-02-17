import { CreateRealtorRequest } from "../dtos/requests/CreateRealtorRequest";
import { UpdateRealtorRequest } from "../dtos/requests/UpdateRealtorRequest";
import { RealtorResponse } from "../dtos/responses/RealtorResponse";

export interface IRealtorRepository {
  findAll: (search: string, page: number, offset: number) => Promise<RealtorResponse[]>
  get: (id: number) => Promise<RealtorResponse>
  add: (data: CreateRealtorRequest) => Promise<String>
  update: (data: UpdateRealtorRequest) => Promise<String>
  remove: (id: number) => Promise<String>
}