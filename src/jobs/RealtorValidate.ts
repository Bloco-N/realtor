import { PrismaClient } from "@prisma/client";
const cron = require('node-cron');

const prisma = new PrismaClient()

 async function employeesLack() {
    

    return {
      status: 201,
      msg: "Funcionario de atestado"
    };
}

const employeesAvailable = cron.schedule('0 0 * * 0', employeesLack, {
  scheduled: false,
  timezone: "America/Fortaleza",
});


export {
  employeesAvailable,
  employeesLack
}