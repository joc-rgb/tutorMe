import { PrismaClient } from '@prisma/client';
import { users } from '../src/constant';

const prisma = new PrismaClient()

async function addUser() {
    await prisma.user.createMany({
      data: users
    })
}

addUser().catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })