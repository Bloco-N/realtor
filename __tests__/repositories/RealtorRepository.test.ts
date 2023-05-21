import { PaginationResponse } from '../../src/dtos/responses/PaginationResponse'
import { RealtorResponse }    from '../../src/dtos/responses/RealtorResponse'
import { ApiError }           from '../../src/errors/ApiError'
import { RealtorRepository }  from '../../src/repositories/RealtorRepository'

const realtorRepository = new RealtorRepository()

describe('RealtorRepository unit tests', () => {

  beforeAll(async () => {

    await realtorRepository.prisma.$executeRaw`TRUNCATE realtors RESTART IDENTITY CASCADE`

    await realtorRepository.prisma.realtor.createMany({
      data: [...Array(15).keys()].map((n) => ({
        email: `realtor${n}@email.com`,
        firstName: `realtor`,
        lastName: `${n}`,
        password: `realtorPassword${n}`
      }))
    })
  
  })

  test('should find all realtors', async () => {

    const realtors = await realtorRepository.findAll('', 0, 0)
    expect(realtors).toBeDefined()
    expect(realtors).toBeInstanceOf(PaginationResponse<RealtorResponse>)
  
  })

  test('should find all realtors, second page', async () => {

    const realtors = await realtorRepository.findAll('', 2, 5)
    expect(realtors).toBeDefined()
    expect(realtors).toBeInstanceOf(PaginationResponse<RealtorResponse>)
    expect(realtors.list[0].id).toBe(6)
    expect(realtors.list.length).toBe(5)
  
  })

  test('should create a realtor', async () => {

    const created = await realtorRepository.create({
      email: 'realtor16@email.com',
      firstName: 'realtor',
      lastName: '16',
      password: 'realtorPassword14'
    })

    expect(created).toBeDefined()
    expect(created).toBe('created')
  
  })

  test('should find a realtor by id', async () => {

    const realtor = (await realtorRepository.get(16)) as RealtorResponse

    expect(realtor).toBeDefined()
    expect(realtor.id).toBe(16)
    expect(realtor.email).toBe('realtor16@email.com')
  
  })

  test('should update a realtor by id', async () => {

    const updated = await realtorRepository.update({
      user: {
        id: 14,
        email: '',
        firstName: '',
        lastName: ''
      },
      firstName: 'realtor alterado'
    })

    expect(updated).toBeDefined()
    expect(updated).toBe('updated')

    const realtorUpdated = (await realtorRepository.get(14)) as RealtorResponse

    expect(realtorUpdated).toBeDefined()
    expect(realtorUpdated.id).toBe(14)
    expect(realtorUpdated.firstName).toBe('realtor alterado')
  
  })

  test('should delete a realtor by id', async () => {

    const deleted = await realtorRepository.delete(14)

    expect(deleted).toBeDefined()
    expect(deleted).toBe('deleted')

    try {

      await realtorRepository.get(14)
    
    } catch (error) {

      expect(error).toBeInstanceOf(ApiError)
      expect(error.status).toBe(404)
      expect(error.message).toBe('realtor not found')
    
    }
  
  })

})
