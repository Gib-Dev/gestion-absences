#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage du processus de déploiement...');

// Vérification des prérequis
function checkPrerequisites() {
  console.log('📋 Vérification des prérequis...');
  
  // Vérifier que .env existe
  if (!fs.existsSync('.env')) {
    console.error('❌ Fichier .env manquant !');
    console.log('💡 Copiez env.example vers .env et configurez vos variables');
    process.exit(1);
  }
  
  // Vérifier que DATABASE_URL est configuré
  const envContent = fs.readFileSync('.env', 'utf8');
  if (!envContent.includes('DATABASE_URL=')) {
    console.error('❌ DATABASE_URL manquant dans .env !');
    process.exit(1);
  }
  
  console.log('✅ Prérequis vérifiés');
}

// Migration de la base de données
function migrateDatabase() {
  console.log('🗄️ Migration de la base de données...');
  
  try {
    // Générer le client Prisma
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Client Prisma généré');
    
    // Pousser le schéma vers la base
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Schéma de base de données mis à jour');
    
    // Seed de la base si nécessaire
    if (process.env.NODE_ENV === 'development') {
      execSync('npx prisma db seed', { stdio: 'inherit' });
      console.log('✅ Base de données seedée');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la base de données:', error.message);
    process.exit(1);
  }
}

// Build de l'application
function buildApplication() {
  console.log('🏗️ Build de l\'application...');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Application buildée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors du build:', error.message);
    process.exit(1);
  }
}

// Tests de linting
function runLinting() {
  console.log('🔍 Vérification du code...');
  
  try {
    execSync('npm run lint', { stdio: 'inherit' });
    console.log('✅ Code vérifié');
  } catch (error) {
    console.error('❌ Erreurs de linting détectées:', error.message);
    console.log('💡 Corrigez les erreurs avant de déployer');
    process.exit(1);
  }
}

// Déploiement
function deploy() {
  console.log('🚀 Déploiement...');
  
  try {
    // Déploiement Vercel
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('✅ Déploiement réussi !');
  } catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    process.exit(1);
  }
}

// Fonction principale
async function main() {
  try {
    checkPrerequisites();
    runLinting();
    migrateDatabase();
    buildApplication();
    deploy();
    
    console.log('🎉 Déploiement terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur fatale:', error.message);
    process.exit(1);
  }
}

// Exécution
if (require.main === module) {
  main();
}

module.exports = { main, checkPrerequisites, migrateDatabase, buildApplication, deploy };
