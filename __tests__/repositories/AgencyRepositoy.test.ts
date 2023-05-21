import { AgencyResponse }     from '../../src/dtos/responses/AgencyResponse'
import { PaginationResponse } from '../../src/dtos/responses/PaginationResponse'
import { AgencyRepository }   from '../../src/repositories/AgencyRepository'

const agencyRepository = new AgencyRepository()

describe('AgencyRepository unit tests', () => {

  beforeAll(async () => {

    await agencyRepository.prisma.$executeRaw`TRUNCATE agencies RESTART IDENTITY CASCADE`

    await agencyRepository.prisma.agency.createMany({
      data: [...Array(15).keys()].map((n) => ({
        email: `agency${n + 1}@email.com`,
        name: `agency${n + 1}`,
        password: `agencyPassword${n + 1}`
      }))
    })
  
  })

  test('should find all agencies', async () => {

    const agencies = await agencyRepository.findAll('', 0, 0)

    expect(agencies).toBeDefined()
    expect(agencies).toBeInstanceOf(PaginationResponse<AgencyResponse>)
  
  })

  test('should find all agencies, second page', async () => {

    const agencies = await agencyRepository.findAll('', 2, 5)
    expect(agencies).toBeDefined()
    expect(agencies).toBeInstanceOf(PaginationResponse<AgencyRepository>)
    expect(agencies.list).toBeInstanceOf(Array<AgencyResponse>)
    expect(agencies.list.length).toBe(5)
  
  })

  test('should create a agencie', async () => {

    const created = await agencyRepository.create({
      email: 'agency16@email.com',
      name: 'agency16',
      password: 'agencyPassword16'
    })

    expect(created).toBeDefined()
    expect(created).toBe('created')
  
  })

  test('should find a agency by id', async () => {

    const agency = await agencyRepository.get(16)

    expect(agency).toBeDefined()
    expect(agency.id).toBe(16)
    expect(agency.name).toBe('agency16')
    expect(agency.email).toBe('agency16@email.com')
  
  })

  test('should update a realtor by id', async () => {

    const updated = await agencyRepository.update({
      user: {
        id: 16,
        email: '',
        name: ''
      },
      name: 'agency alterado'
    })

    expect(updated).toBeDefined()
    expect(updated).toBe('updated')

    const agencyUpdated = await agencyRepository.get(16)

    expect(agencyUpdated).toBeDefined()
    expect(agencyUpdated.id).toBe(16)
    expect(agencyUpdated.name).toBe('agency alterado')
  
  })

})
