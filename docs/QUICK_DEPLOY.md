# Quick Deploy Guide

## Deploy in 5 Minutes!

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Set up Supabase Database
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your Project URL and anon key

### 3. Create Environment File
Create `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=your-secret-here
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.vercel.app
```

### 4. Run Pre-deployment Check
```bash
npm run build
```

### 5. Deploy!
```bash
npm run deploy
```

### 6. Set Environment Variables in Vercel
- Go to your Vercel project dashboard
- Settings → Environment Variables
- Add all variables from `.env.local`

### 7. Test Your Deployed App
- Visit your Vercel URL
- Test user registration and login
- Test absence creation and management

**Your app is now live!**

---

**Need help?** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.
