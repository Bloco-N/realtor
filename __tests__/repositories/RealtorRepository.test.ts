import { RealtorResponse }   from "../../src/dtos/responses/RealtorResponse"
import { RealtorRepository } from "../../src/repositories/RealtorRepository"

const realtorRepository = new RealtorRepository()

describe('RealtorRepository unit tests', () => {
  
  test('should find all realtors', async () => {
  
    const realtors = await realtorRepository.findAll('', 1, 10)
    expect(realtors).toBeDefined()
    expect(realtors).toBeInstanceOf(Array<RealtorResponse>)
  
  })

})

