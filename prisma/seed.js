const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Administrateur',
      password: hashedPassword,
    },
  })

  console.log('✅ User created:', user)

  // Create some sample absences
  const absences = await Promise.all([
    prisma.absence.create({
      data: {
        name: 'Jean Dupont',
        date: new Date('2025-01-15'),
        reason: 'Maladie',
      },
    }),
    prisma.absence.create({
      data: {
        name: 'Marie Martin',
        date: new Date('2025-01-16'),
        reason: 'Congé',
      },
    }),
    prisma.absence.create({
      data: {
        name: 'Pierre Durand',
        date: new Date('2025-01-17'),
        reason: 'Rendez-vous médical',
      },
    }),
  ])

  console.log('✅ Sample absences created:', absences)

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

