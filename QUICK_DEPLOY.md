# 🚀 Quick Deploy Guide

## Deploy in 5 Minutes!

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Set up Database (Choose one)
- **Supabase** (Free): [supabase.com](https://supabase.com)
- **Railway** (Free tier): [railway.app](https://railway.app)  
- **Neon** (Free): [neon.tech](https://neon.tech)

### 3. Create Environment File
Create `.env.local` with your database URL:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
DIRECT_URL="postgresql://user:pass@host:5432/db"
JWT_SECRET="your-secret-here"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
```

### 4. Run Pre-deployment Check
```bash
npm run deploy:check
```

### 5. Deploy!
```bash
npm run deploy
```

### 6. Set Environment Variables in Vercel
- Go to your Vercel project dashboard
- Settings → Environment Variables
- Add all variables from `.env.local`

### 7. Update Database
```bash
npx prisma db push
```

🎉 **Your app is now live!**

---

**Need help?** See `DEPLOYMENT.md` for detailed instructions.
