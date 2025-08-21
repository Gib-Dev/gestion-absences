# Deployment Guide for Gestion Absences

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a GitHub/GitLab account
3. Set up a Supabase database (see setup below)

### Step 1: Supabase Database Setup

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New Project"
   - Choose your organization
   - Enter project name (e.g., "gestion-absences")
   - Set a strong database password
   - Choose your preferred region
   - Click "Create new project"

2. **Get Project Credentials:**
   - In your project dashboard, go to Settings > API
   - Copy the Project URL
   - Copy the anon public key
   - Save these securely

### Step 2: Environment Variables
Create a `.env.local` file with your production values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# JWT Secret for authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

### Step 3: Deploy to Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy with Vercel:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set environment variables
   - Deploy

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project in Vercel
   - Settings > Environment Variables
   - Add all variables from your `.env.local`

### Step 4: Test Your Deployment

After deployment, test your application:

1. **Visit your Vercel URL**
2. **Test user registration:**
   - Go to `/auth/register`
   - Create a test user
3. **Test user login:**
   - Go to `/auth/login`
   - Log in with your test user
4. **Test absence management:**
   - Create, view, edit, and delete absences

## Option 2: Deploy to Railway (Full Stack)

### Step 1: Database Setup
1. Create a new Railway project
2. Add PostgreSQL service
3. Add Node.js service for your app

### Step 2: Configure Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Step 3: Custom Domain (Optional)
1. Add custom domain in Railway dashboard
2. Update DNS settings

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Main database connection | `postgresql://user:pass@host:5432/db` |
| `DIRECT_URL` | Direct database connection | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret for JWT tokens | `random-string-here` |
| `NEXTAUTH_SECRET` | NextAuth secret | `another-random-string` |
| `NEXTAUTH_URL` | Your app URL | `https://app.vercel.app` |

## Post-Deployment Checklist

- [ ] Database connection working
- [ ] Authentication working
- [ ] API endpoints responding
- [ ] Environment variables set
- [ ] Custom domain configured (if desired)
- [ ] SSL certificate working
- [ ] Performance monitoring set up

## Troubleshooting

### Common Issues:
1. **Database Connection Failed**: Check DATABASE_URL and firewall settings
2. **Build Errors**: Ensure all dependencies are in package.json
3. **Environment Variables**: Verify all required vars are set in Vercel/Railway
4. **Prisma Issues**: Run `npx prisma generate` before deployment

### Commands:
```bash
# Check build locally
npm run build

# Test production build
npm run start

# Generate Prisma client
npx prisma generate

# Check database connection
npx prisma db pull
```

## Support
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Prisma Docs: [prisma.io/docs](https://prisma.io/docs)
