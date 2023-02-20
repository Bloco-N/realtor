import { RealtorResponse }    from '../dtos/responses/RealtorResponse'
import { Realtor }            from '@prisma/client'
import { PaginationResponse } from '../dtos/responses/PaginationResponse'

export class RealtorMapper {

  public RealtorToRealtorResponse(realtor: Realtor): RealtorResponse {

    const { password, ...realtorResponse } = realtor
    return realtorResponse
  
  }

  public RealtorListToRealtorResponseList(realtors: Realtor[]): RealtorResponse[] {

    const realtorsReponse: RealtorResponse[] = []
    for (const realtor of realtors) {

      realtorsReponse.push(this.RealtorToRealtorResponse(realtor))
    
    }
    return realtorsReponse
  
  }

  public RealtorResponseListToPaginationResponse(realtors: RealtorResponse[], total:number, page:number, take:number): PaginationResponse<RealtorResponse>{

    const paginationResponse = new PaginationResponse<RealtorResponse>(realtors, page, Math.ceil( total / take))

    return paginationResponse

  }

}
