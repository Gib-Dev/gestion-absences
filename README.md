# gestion-absences

Application Next.js pour la gestion des absences et des retards.

## Description

Ce projet est une application web développée avec Next.js permettant de :

- Gérer les utilisateurs (inscription, connexion)
- Soumettre des demandes d'absence
- Visualiser les absences
- Disposer d'un tableau de bord utilisateur
- Utiliser une base de données PostgreSQL via Prisma ORM

## Technologies utilisées

- Next.js 15
- React 19
- Prisma ORM
- PostgreSQL (via Supabase)
- Tailwind CSS
- JWT Authentication

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences
```

2. Installer les dépendances :

```bash
npm install
```

3. Configuration de la base de données :

```bash
# Copier le fichier d'environnement
cp env.example .env

# Éditer .env avec vos informations de base de données
# DATABASE_URL="postgresql://username:password@localhost:5432/gestion_absences"
# JWT_SECRET="your-secret-key"
```

4. Configuration automatique de la base de données :

```bash
npm run setup
```

Cette commande va :
- Générer le client Prisma
- Pousser le schéma vers la base de données
- Créer des données d'exemple
- Migrer les données JSON existantes (si disponibles)

## Commandes utiles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer en production

# Base de données
npm run db:generate  # Générer le client Prisma
npm run db:push      # Pousser le schéma vers la DB
npm run db:studio    # Ouvrir Prisma Studio (interface DB)
npm run db:seed      # Peupler la DB avec des données d'exemple
npm run db:reset     # Réinitialiser la base de données
npm run setup        # Configuration complète de la DB

# Autres
npm run lint         # Vérifier le code
```

## Structure de la base de données

### Modèle User
- `id`: Clé primaire auto-incrémentée
- `email`: Adresse email unique
- `name`: Nom complet de l'utilisateur
- `password`: Mot de passe hashé
- `createdAt`: Date de création du compte

### Modèle Absence
- `id`: Clé primaire auto-incrémentée
- `name`: Nom de la personne absente
- `date`: Date de l'absence
- `reason`: Raison de l'absence
- `createdAt`: Date de création de l'enregistrement
- `updatedAt`: Date de dernière modification

## Accès par défaut

Après l'installation, vous pouvez vous connecter avec :
- **Email**: admin@example.com
- **Mot de passe**: password123

## Auteur

Projet réalisé par [Abdoul Magid biteye, Moussa Alanabillah Kante, Thibaut Diatta, el adj Abdoulaye]

## Support

Pour plus d'informations sur la configuration de la base de données, consultez [DATABASE_SETUP.md](./DATABASE_SETUP.md).

