import { RealtorResponse }   from '../../src/dtos/responses/RealtorResponse'
import { ApiError }          from '../../src/errors/ApiError'
import { RealtorRepository } from '../../src/repositories/RealtorRepository'

const realtorRepository = new RealtorRepository()

const mockRealtors = [
  {
    email: 'realtor1@mail.com',
    firstName: 'realtor',
    lastName: '1',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor2@mail.com',
    firstName: 'realtor',
    lastName: '2',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor3@mail.com',
    firstName: 'realtor',
    lastName: '3',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor4@mail.com',
    firstName: 'realtor',
    lastName: '4',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor5@mail.com',
    firstName: 'realtor',
    lastName: '5',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor6@mail.com',
    firstName: 'realtor',
    lastName: '6',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor7@mail.com',
    firstName: 'realtor',
    lastName: '7',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor8@mail.com',
    firstName: 'realtor',
    lastName: '8',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor9@mail.com',
    firstName: 'realtor',
    lastName: '9',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor10@mail.com',
    firstName: 'realtor',
    lastName: '10',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor11@mail.com',
    firstName: 'realtor',
    lastName: '11',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor12@mail.com',
    firstName: 'realtor',
    lastName: '12',
    password: 'realtorPassword1'
  },
  {
    email: 'realtor13@mail.com',
    firstName: 'realtor',
    lastName: '13',
    password: 'realtorPassword1'
  }
]

describe('RealtorRepository unit tests', () => {

  beforeAll(async () => {

    await realtorRepository.prisma.realtor.createMany({
      data: mockRealtors
    })
  
  })

  test('should find all realtors', async () => {

    const realtors = await realtorRepository.findAll('', 1, 10)
    expect(realtors).toBeDefined()
    expect(realtors).toBeInstanceOf(Array<RealtorResponse>)
  
  })

  test('should find all realtors, second page', async () => {

    const realtors = await realtorRepository.findAll('', 2, 10)
    expect(realtors).toBeDefined()
    expect(realtors).toBeInstanceOf(Array<RealtorResponse>)
    expect(realtors[0].id).toBe(11)
    expect(realtors.length).toBe(3)
  
  })

  test('should create a realtor', async () => {

    const created = await realtorRepository.add({
      email: 'realtor14@email.com',
      firstName: 'realtor',
      lastName: '14',
      password: 'realtorPassword14'
    })

    expect(created).toBeDefined()
    expect(created).toBe('created')
  
  })

  test('should find a realtor by id', async () => {

    const realtor = (await realtorRepository.get(14)) as RealtorResponse

    expect(realtor).toBeDefined()
    expect(realtor.id).toBe(14)
    expect(realtor.email).toBe('realtor14@email.com')
  
  })

  test('should update a realtor by id', async () => {

    const updated = await realtorRepository.update({
      id: 14,
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

    const deleted = await realtorRepository.remove(14)

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
