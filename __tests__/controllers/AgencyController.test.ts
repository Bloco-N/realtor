import { PrismaClient } from "@prisma/client"
import { App }          from "../../src/app"
import request          from 'supertest'

const app = new App(8081)

const prisma = new PrismaClient()

describe('agencyController test', () => {

  beforeAll(async () => {

    await prisma.$executeRaw`TRUNCATE agencies RESTART IDENTITY CASCADE`

    await prisma.agency.createMany({
      data: [...Array(15).keys()].map((n) => ({
        email: `agency${n + 1}@email.com`,
        name: `agency${n + 1}`,
        password: `agencyPassword${n + 1}`
      }))
    })

  })

  test('should get with status 200 in /agency', async () => {

    const response = await request(app.server).get('/agency')

    const { body } = response

    expect(body).toBeDefined()
    expect(body.currentPage).toBe(1)
    expect(body.totalOfPages).toBe(2)
    expect(response.body.list.length).toBe(10)
    expect(response.statusCode).toBe(200)

  })

  test('should get with status 200 the second page in /agency', async () => {

    const response = await request(app.server).get('/agency').query({
      page: '2'
    })

    const { body } = response

    expect(body).toBeDefined()
    expect(body.currentPage).toBe(2)
    expect(body.totalOfPages).toBe(2)
    expect(response.body.list.length).toBe(5)
    expect(response.statusCode).toBe(200)

  })

  test('should get with status 200 one agency by id ', async () => {

    const response = await request(app.server).get('/agency/1')

    const { body } = response

    expect(body).toBeDefined()
    expect(body.id).toBe(1)
    expect(body.email).toBe('agency1@email.com')
    expect(response.statusCode).toBe(200)

  })

  test('should get status 404, not found', async () => {

    const response = await request(app.server).get('/agency/1400')

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('agency not found')
    expect(response.statusCode).toBe(404)

  })

  test('should add one agency with status 201', async () => {

    const agency = {
      email: 'agency16@mail.com',
      name: 'agency16',
      password: 'agencyPassword16'
    }

    const response = await request(app.server).post('/agency/sign-up').send(agency)

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('created')
    expect(response.statusCode).toBe(201)

  })

  test('should sign in one agency with status 200', async () => {

    const agency = {
      email: 'agency15@mail.com',
      name: 'agency15',
      password: 'agencyPassword15'
    }

    const agencySignIn = {
      email: 'agency15@mail.com',
      password: 'agencyPassword15'
    }

    const responseSignUp = await request(app.server).post('/agency/sign-up').send(agency)

    const { text: textSignUp } = responseSignUp

    expect(textSignUp).toBeDefined()
    expect(textSignUp).toBe('created')
    expect(responseSignUp.statusCode).toBe(201)

    const response = await request(app.server).post('/agency/sign-in').send(agencySignIn)

    const { text } = response

    expect(text).toBeDefined()
    expect(response.statusCode).toBe(200)

  })

  test('should update one agency with status 200', async () => {

    const agency = {
      email: 'agency17@email.com',
      name: 'agency17',
      password: 'agencyPassword17'
    }

    const agencySignIn = {
      email: 'agency17@email.com',
      password: 'agencyPassword17'
    }

    const responseSignUp = await request(app.server).post('/agency/sign-up').send(agency)

    const { text: textSignUp } = responseSignUp

    expect(textSignUp).toBeDefined()
    expect(textSignUp).toBe('created')
    expect(responseSignUp.statusCode).toBe(201)

    const responseSignIn = await request(app.server).post('/agency/sign-in').send(agencySignIn)

    const { text: token } = responseSignIn

    expect(token).toBeDefined()
    expect(responseSignIn.statusCode).toBe(200)

    const agencyUpdate = {
      name: 'agency change',
      user: {
        id: 17
      }
    }

    const response = await request(app.server)
      .put('/agency')
      .send(agencyUpdate)

    const { text } = response

    expect(text).toBeDefined()
    expect(text).toBe('updated')
    expect(response.statusCode).toBe(200)

  })

  test('should delete one agency with status 200', async () => {

    const response = await request(app.server).delete('/agency/14')

    const { text } = response
 
    expect(text).toBeDefined()
    expect(text).toBe('deleted')
    expect(response.statusCode).toBe(200)

  })

})
