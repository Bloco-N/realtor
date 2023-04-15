import { App }          from '../../src/app'
import { PrismaClient } from '@prisma/client'
import request          from 'supertest'

const app = new App(8081)

const prisma = new PrismaClient()

describe('RealtorController E2E tests', () => {

  beforeAll(async () => {

    await prisma.$executeRaw`TRUNCATE realtors RESTART IDENTITY CASCADE`

    await prisma.realtor.createMany({
      data: [...Array(15).keys()].map((n) => ({
        email: `realtor${n}@email.com`,
        firstName: `realtor`,
        lastName: `${n}`,
        password: `realtorPassword${n}`
      }))
    })
  
  })

  test('should get with status 200 in /realtor', async () => {

    const response = await request(app.server).get('/realtor')

    const { body } = response

    expect(body).toBeDefined()
    expect(body.currentPage).toBe(1)
    expect(body.totalOfPages).toBe(2)
    expect(response.body.list.length).toBe(10)
    expect(response.statusCode).toBe(200)
  
  })

  test('should get with status 200 the second page in /realtor', async () => {

    const response = await request(app.server).get('/realtor').query({
      page: '2'
    })

    const { body } = response

    expect(body).toBeDefined()
    expect(body.currentPage).toBe(2)
    expect(body.totalOfPages).toBe(2)
    expect(response.body.list.length).toBe(5)
    expect(response.statusCode).toBe(200)
  
  })

  test('should get with status 200 one realtor by id ', async () => {

    const response = await request(app.server).get('/realtor/1')

    const { body } = response

    expect(body).toBeDefined()
    expect(body.id).toBe(1)
    expect(body.email).toBe('realtor0@email.com')
    expect(response.statusCode).toBe(200)
  
  })

  test('should get status 404, not found', async () => {

    const response = await request(app.server).get('/realtor/1400')

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('realtor not found')
    expect(response.statusCode).toBe(404)
  
  })

  test('should add one realtor with status 201', async () => {

    const realtor = {
      email: 'realtor14@mail.com',
      firstName: 'realtor',
      lastName: '14',
      password: 'realtorPassword14'
    }

    const response = await request(app.server).post('/realtor/sign-up').send(realtor)

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('created')
    expect(response.statusCode).toBe(201)
  
  })

  test('should sign in one realtor with status 200', async () => {

    const realtor = {
      email: 'realtor15@mail.com',
      firstName: 'realtor',
      lastName: '15',
      password: 'realtorPassword15'
    }

    const realtorSignIn = {
      email: 'realtor15@mail.com',
      password: 'realtorPassword15'
    }

    const responseSignUp = await request(app.server).post('/realtor/sign-up').send(realtor)

    const { text: textSignUp } = responseSignUp

    expect(textSignUp).toBeDefined()
    expect(textSignUp).toBe('created')
    expect(responseSignUp.statusCode).toBe(201)

    const response = await request(app.server).post('/realtor/sign-in').send(realtorSignIn)

    const { text } = response

    expect(text).toBeDefined()
    expect(response.statusCode).toBe(200)
  
  })

  test('should update one realtor with status 200', async () => {

    const realtor = {
      email: 'realtor16@mail.com',
      firstName: 'realtor',
      lastName: '16',
      password: 'realtorPassword16'
    }

    const realtorSignIn = {
      email: 'realtor16@mail.com',
      password: 'realtorPassword16'
    }

    const responseSignUp = await request(app.server).post('/realtor/sign-up').send(realtor)

    const { text: textSignUp } = responseSignUp

    expect(textSignUp).toBeDefined()
    expect(textSignUp).toBe('created')
    expect(responseSignUp.statusCode).toBe(201)

    const responseSignIn = await request(app.server).post('/realtor/sign-in').send(realtorSignIn)

    const { text: token } = responseSignIn

    expect(token).toBeDefined()
    expect(responseSignIn.statusCode).toBe(200)

    const realtorUpdate = {
      email: 'realtor16@mail.com',
      firstName: 'realtor change',
      lastName: '16',
      password: 'realtorPassword16'
    }

    const response = await request(app.server)
      .put('/realtor')
      .send(realtorUpdate)
      .set('authorization', 'Bearer ' + token)

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('updated')
    expect(response.statusCode).toBe(200)
  
  })

  test('should delete one realtor with status 200', async () => {

    const response = await request(app.server).delete('/realtor/14')

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('deleted')
    expect(response.statusCode).toBe(200)
  
  })

})
