import { RealtorResponse } from '../dtos/responses/RealtorResponse'
import { Realtor }         from '@prisma/client'

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

}
