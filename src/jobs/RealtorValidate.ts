import { PrismaClient } from "@prisma/client";
const cron = require('node-cron');

const prisma = new PrismaClient()

async function realtorValidate() {
  try {

    const result = await prisma.$queryRaw`
    SELECT "realtorId"
    FROM comments
    WHERE "dateOftheDeed" >= NOW() - INTERVAL '2 months'
    GROUP BY "realtorId"
    HAVING COUNT("realtorId") > 32
  `;

  } catch (error) {
    console.error('Error in realtorValidate:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const realtorAvailable = cron.schedule('*/1 * * * *', realtorValidate, {
  scheduled: false,
  timezone: "America/Fortaleza",
});

export {
  realtorAvailable,
  realtorValidate
}
