const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123123123', 10);

  const admin = await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    },
  });

  console.log('Admin created:', admin);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
