export interface UpdateCommentRequest {
  clientId?: number
  realtorId?:number
  text?: string
  reply?: string
  marketExpertiseRating?: number
  responsivenessRating?: number
  negotiationSkillsRating?: number
  profissionalismAndComunicationRating?: number
}