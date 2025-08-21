# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Git installed

## 5-Minute Setup

### 1. Clone & Install
```bash
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences
npm install
```

### 2. Supabase Setup
```bash
# Copy environment file
cp env.local.example .env.local

# Edit .env.local with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
# JWT_SECRET=your-secret-key-here
```

### 3. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your Project URL and anon key
4. Update `.env.local` with these values

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Default Login
- **Email**: test@example.com
- **Password**: password123

## What's Included

**User Management**: Register, login, profile management  
**Absence Tracking**: Add, view, delete absences  
**Dashboard**: Overview of all data  
**Responsive Design**: Works on all devices  
**Database**: PostgreSQL with Supabase  
**Authentication**: JWT-based security  

## Need Help?

- Check [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed Supabase configuration
- Review [README.md](../README.md) for full project documentation
- Open an issue on GitHub for bugs or questions

## Common Issues

**Supabase Connection Failed?**
- Check if your Supabase project is active
- Verify NEXT_PUBLIC_SUPABASE_URL in .env.local
- Ensure your anon key is correct

**Setup Script Failed?**
- Check environment variables
- Verify Supabase project exists
- Check browser console for errors

**Port Already in Use?**
- Change port in package.json scripts
- Kill existing Node.js processes
- Use `npm run dev -- -p 3001`

