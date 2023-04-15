import { PrismaClient } from '@prisma/client'
import { hash }         from 'bcryptjs'

const prisma = new PrismaClient()

const mockRealtors = [
  {
    email: 'realtor1@mail.com',
    firstName: 'realtor',
    lastName: '1',
    password: 'realtorPassword'
  },
  {
    email: 'realtor2@mail.com',
    firstName: 'realtor',
    lastName: '2',
    password: 'realtorPassword'
  },
  {
    email: 'realtor3@mail.com',
    firstName: 'realtor',
    lastName: '3',
    password: 'realtorPassword'
  },
  {
    email: 'realtor4@mail.com',
    firstName: 'realtor',
    lastName: '4',
    password: 'realtorPassword'
  },
  {
    email: 'realtor5@mail.com',
    firstName: 'realtor',
    lastName: '5',
    password: 'realtorPassword'
  },
  {
    email: 'realtor6@mail.com',
    firstName: 'realtor',
    lastName: '6',
    password: 'realtorPassword'
  },
  {
    email: 'realtor7@mail.com',
    firstName: 'realtor',
    lastName: '7',
    password: 'realtorPassword'
  },
  {
    email: 'realtor8@mail.com',
    firstName: 'realtor',
    lastName: '8',
    password: 'realtorPassword'
  },
  {
    email: 'realtor9@mail.com',
    firstName: 'realtor',
    lastName: '9',
    password: 'realtorPassword'
  },
  {
    email: 'realtor10@mail.com',
    firstName: 'realtor',
    lastName: '10',
    password: 'realtorPassword'
  },
  {
    email: 'realtor11@mail.com',
    firstName: 'realtor',
    lastName: '11',
    password: 'realtorPassword'
  },
  {
    email: 'realtor12@mail.com',
    firstName: 'realtor',
    lastName: '12',
    password: 'realtorPassword'
  },
  {
    email: 'realtor13@mail.com',
    firstName: 'realtor',
    lastName: '13',
    password: 'realtorPassword'
  }
]

const mockServices = [
  'Acompanhamento para compra de imóvel',
  'Venda de imóvel',
  'Seleção de inquilino e gestão de arrendamento',
  'Seleção de inquilino'
]

async function main() {

  for (const item of mockRealtors) {

    const hashPassowrd = await hash(item.password, 10)

    await prisma.realtor.create({
      data: {
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        password: hashPassowrd
      }
    })
  
  }

  for(const item of mockServices){

    await prisma.service.create({
      data:{
        title: item
      }
    })
  
  }

}

main()
  .catch((e) => {

    console.log(`❌ An error ocurred: ${e}`)
    process.exit(1)
  
  })
  .finally(() => {

    prisma.$disconnect()
  
  })
