import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mockServices = [
  'Acompanhamento para compra de imóvel',
  'Venda de imóvel',
  'Seleção de inquilino e gestão de arrendamento',
  'Seleção de inquilino',
  'Realocation'
]

async function main() {

  for (const item of mockServices) {

    await prisma.service.create({
      data: {
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
