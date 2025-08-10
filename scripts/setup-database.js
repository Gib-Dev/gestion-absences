#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Gestion-Absences Database...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please create a .env file with your database configuration.');
  console.log('💡 You can copy env.example to .env and update the values.\n');
  process.exit(1);
}

console.log('✅ .env file found');

try {
  // Generate Prisma client
  console.log('\n🔧 Generating Prisma client...');
  execSync('npm run db:generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');

  // Push schema to database
  console.log('\n🗄️  Pushing schema to database...');
  execSync('npm run db:push', { stdio: 'inherit' });
  console.log('✅ Database schema updated');

  // Seed database
  console.log('\n🌱 Seeding database with sample data...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  console.log('✅ Database seeded');

  // Migrate existing JSON data if available
  const jsonPath = path.join(process.cwd(), 'data', 'absences.json');
  if (fs.existsSync(jsonPath)) {
    console.log('\n📊 Migrating existing JSON data...');
    execSync('npm run db:migrate-json', { stdio: 'inherit' });
    console.log('✅ JSON data migrated');
  }

  console.log('\n🎉 Database setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Open http://localhost:3000 in your browser');
  console.log('3. Use admin@example.com / password123 to login');
  console.log('\n🔧 Database commands:');
  console.log('- View database: npm run db:studio');
  console.log('- Reset database: npm run db:reset');
  console.log('- Generate client: npm run db:generate');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n💡 Make sure your database is running and accessible.');
  console.log('💡 Check your .env file configuration.');
  process.exit(1);
}

