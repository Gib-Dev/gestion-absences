# 🚀 Guide de Déploiement en Production

## 📋 Prérequis

- Compte Vercel configuré
- Base de données PostgreSQL (Railway, Supabase, PlanetScale, etc.)
- Variables d'environnement configurées

## 🔧 Configuration de la Base de Données

### 1. Créer une base PostgreSQL
- **Railway** : https://railway.app/
- **Supabase** : https://supabase.com/
- **PlanetScale** : https://planetscale.com/

### 2. Mettre à jour les variables d'environnement

```bash
# Copier env.example vers .env
cp env.example .env

# Éditer .env avec vos vraies valeurs
DATABASE_URL="postgresql://username:password@host:port/database"
DIRECT_URL="postgresql://username:port@host:port/database"
JWT_SECRET="votre-vraie-clé-secrète-très-longue-et-complexe"
NEXTAUTH_SECRET="votre-vraie-clé-secrète-très-longue-et-complexe"
NODE_ENV="production"
```

## 🚀 Déploiement

### Option 1 : Déploiement Automatique

```bash
# Vérifier que tout est prêt
npm run deploy:check

# Déployer
npm run deploy
```

### Option 2 : Déploiement Manuel

```bash
# 1. Générer le client Prisma
npx prisma generate

# 2. Migrer la base de données
npx prisma db push

# 3. Build de l'application
npm run build

# 4. Déployer sur Vercel
vercel --prod
```

## 🔒 Sécurité en Production

### Variables d'environnement critiques
- `JWT_SECRET` : Clé secrète pour JWT (min 32 caractères)
- `NEXTAUTH_SECRET` : Clé secrète NextAuth (min 32 caractères)
- `DATABASE_URL` : URL de la base de données

### Bonnes pratiques
- ✅ Utilisez des clés secrètes longues et complexes
- ✅ Ne commitez jamais `.env` en production
- ✅ Utilisez HTTPS en production
- ✅ Limitez l'accès à la base de données

## 🧪 Tests Post-Déploiement

### 1. Vérifier l'authentification
- Créer un compte utilisateur
- Se connecter
- Accéder aux pages protégées

### 2. Vérifier la gestion des absences
- Ajouter une absence
- Modifier une absence
- Supprimer une absence
- Rechercher des absences

### 3. Vérifier la responsivité
- Tester sur mobile
- Tester sur tablette
- Tester sur desktop

## 🐛 Dépannage

### Erreur de base de données
```bash
# Vérifier la connexion
npx prisma db push

# Vérifier le schéma
npx prisma studio
```

### Erreur de build
```bash
# Nettoyer le cache
rm -rf .next
rm -rf node_modules/.cache

# Réinstaller les dépendances
npm install

# Rebuild
npm run build
```

### Erreur de déploiement
```bash
# Vérifier les logs Vercel
vercel logs

# Vérifier la configuration
vercel env ls
```

## 📊 Monitoring

### Vercel Analytics
- Activer dans le dashboard Vercel
- Surveiller les performances
- Surveiller les erreurs

### Base de données
- Surveiller les connexions
- Surveiller les requêtes lentes
- Surveiller l'espace disque

## 🔄 Mises à jour

### 1. Pull des changements
```bash
git pull origin main
```

### 2. Mise à jour des dépendances
```bash
npm install
npm update
```

### 3. Migration de la base
```bash
npx prisma db push
```

### 4. Redéploiement
```bash
npm run deploy
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs Vercel
2. Vérifiez la configuration de la base
3. Vérifiez les variables d'environnement
4. Consultez la documentation officielle

---

**⚠️ IMPORTANT :** Testez toujours en environnement de développement avant de déployer en production !
