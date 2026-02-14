# Gestion Absences

Systeme de gestion des absences pour le suivi des employes. Developpe avec Next.js 15 et Supabase.

## Stack

- **Frontend** : Next.js 15, React 19, Tailwind CSS
- **Backend** : Next.js API Routes
- **Base de donnees** : PostgreSQL (Supabase)
- **Auth** : JWT + bcrypt
- **Validation** : Zod

## Installation

```bash
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences
npm install
```

Creer un fichier `.env.local` :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-jwt-secret
```

Lancer le serveur :

```bash
npm run dev
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm start` | Lancer en production |
| `npm run lint` | ESLint |

## Structure

```
app/
  api/
    auth/         POST (inscription), PUT (connexion), GET /me
    absences/     CRUD complet avec pagination et recherche
    users/        CRUD complet (protege)
  auth/           Pages login et inscription
  components/     Composants reutilisables
  context/        AuthContext
  hooks/          useAbsences, useStatistics
  lib/            Supabase client, auth utils
  dashboard/      Tableau de bord
  profile/        Page profil
  statistics/     Statistiques et graphiques
```

## Base de donnees

**User** : id, email, name, password, createdAt

**Absence** : id, name, date, reason, userId, createdAt, updatedAt

## Securite

- JWT avec verification de signature (HMAC SHA-256)
- Hashage bcrypt (12 rounds)
- Middleware de protection sur toutes les routes API
- Validation Zod sur toutes les entrees
- Headers de securite (X-Frame-Options, CSP, XSS Protection)
- Row Level Security (Supabase)

## Deploiement

Configure pour Vercel. Voir `vercel.json` pour la configuration.

```bash
npm run build
```

## Licence

MIT
