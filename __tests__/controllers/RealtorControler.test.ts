import { PrismaClient } from '@prisma/client'
import request          from 'supertest'
import { App }          from '../../src/app'

const app = new App()

const prisma = new PrismaClient()

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

describe('RealtorController E2E tests', () => {

  beforeAll(async () => {

    await prisma.realtor.createMany({
      data: mockRealtors
    })
  
  })

  test('should get with status 200 in /realtor', async () => {

    const response = await request(app.server)
      .get('/realtor')

    const { body } = response

    expect(body).toBeDefined()
    expect(body.currentPage).toBe(1)
    expect(body.totalOfPages).toBe(2)
    expect(response.body.list.length).toBe(10)
    expect(response.statusCode).toBe(200)
  
  })

  test('should get with status 200 the second page in /realtor', async () => {

    const response = await request(app.server)
      .get('/realtor')
      .query({
        page: '2'
      })

    const {body} = response

    expect(body).toBeDefined()
    expect(body.currentPage).toBe(2)
    expect(body.totalOfPages).toBe(2)
    expect(response.body.list.length).toBe(3)
    expect(response.statusCode).toBe(200)

  })

  test('should get with status 200 one realtor by id ', async () => {
    
    const response = await request(app.server)
      .get('/realtor/1')

    const { body } = response

    expect(body).toBeDefined()
    expect(body.id).toBe(1)
    expect(body.email).toBe('realtor1@mail.com')
    expect(response.statusCode).toBe(200)

  })

  test('should get status 404, not found', async () => {

    const response = await request(app.server)
      .get('/realtor/1400')

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('realtor not found')
    expect(response.statusCode).toBe(404)
  
  })

  test('should add with status 201 one realtor', async () => {

    const realtor = {
      email: 'realtor14@mail.com',
      firstName: 'realtor',
      lastName: '14',
      password: 'realtorPassword14'
    }

    const response = await request(app.server)
      .post('/realtor/sign-up')
      .send(realtor)

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('created')
    expect(response.statusCode).toBe(201)
  
  })

  test('should update one realtor with status 200', async () => {

    const realtor = {
      id:14,
      email: 'realtor14@mail.com',
      firstName: 'realtor change',
      lastName: '14',
      password: 'realtorPassword14'
    }

    const response = await request(app.server)
      .put('/realtor')
      .send(realtor)

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('updated')
    expect(response.statusCode).toBe(200)
  
  })

  test('should delete with status 200 one realtor', async () => {

    const response = await request(app.server)
      .delete('/realtor/14')

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('deleted')
    expect(response.statusCode).toBe(200)
  
  })

})
