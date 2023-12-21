export interface CreateCommentRequest {
  clientId: number
  realtorId:number
  text: string
  marketExpertiseRating: number
  responsivenessRating: number
  negotiationSkillsRating: number
  profissionalismAndComunicationRating: number
  sold?: number;
  bought?: number;
  dateOftheDeed?: number;
}

export interface CreateCommentRequestAgency {
  clientId: number
  agencyId:number
  text: string
  marketExpertiseRating: number
  responsivenessRating: number
  negotiationSkillsRating: number
  profissionalismAndComunicationRating: number
}