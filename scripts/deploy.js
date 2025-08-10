#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Gestion Absences - Deployment Check\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please create .env.local with your production environment variables.');
  console.log('See DEPLOYMENT.md for details.\n');
  process.exit(1);
}

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI not found');
  console.log('Install it with: npm i -g vercel\n');
  process.exit(1);
}

// Check if git repository is clean
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('⚠️  You have uncommitted changes:');
    console.log(gitStatus);
    console.log('Please commit your changes before deploying.\n');
  } else {
    console.log('✅ Git repository is clean');
  }
} catch (error) {
  console.log('❌ Not a git repository or git not available');
  console.log('Please initialize git and commit your code.\n');
  process.exit(1);
}

// Check if build works
console.log('\n🔨 Testing build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!\n');
} catch (error) {
  console.log('❌ Build failed! Please fix the errors before deploying.\n');
  process.exit(1);
}

// Check Prisma
console.log('🔍 Checking Prisma setup...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated\n');
} catch (error) {
  console.log('❌ Prisma setup failed!\n');
  process.exit(1);
}

console.log('🎉 All checks passed! You can now deploy with:');
console.log('   vercel\n');
console.log('Or follow the detailed guide in DEPLOYMENT.md');
