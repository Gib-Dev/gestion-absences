# Supabase Database Setup Guide

## Supabase Integration

This project has been successfully migrated from Prisma ORM to Supabase, providing a production-ready PostgreSQL database with built-in authentication and real-time capabilities.

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **Node.js**: Version 18+ recommended
3. **Environment Variables**: Set up your `.env.local` file

## Environment Setup

1. Copy `env.local.example` to `.env.local`:
   ```bash
   cp env.local.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

## Supabase Project Setup

### 1. Create New Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project name (e.g., "gestion-absences")
5. Set a database password (save this securely)
6. Choose your region
7. Click "Create new project"

### 2. Get Project Credentials
1. In your project dashboard, go to Settings > API
2. Copy the Project URL
3. Copy the anon public key
4. Update your `.env.local` file

### 3. Database Schema Setup
The database tables are automatically created when you first use the application, but you can also set them up manually:

#### Option A: Automatic Setup (Recommended)
- Start the application with `npm run dev`
- The tables will be created automatically on first use

#### Option B: Manual Setup
1. Go to SQL Editor in your Supabase dashboard
2. Run the following SQL:

```sql
-- Create User table
CREATE TABLE public."User" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  email text NOT NULL UNIQUE,
  name text,
  password text,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

-- Create Absence table
CREATE TABLE public."Absence" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  date timestamp without time zone NOT NULL,
  reason text NOT NULL,
  "userId" bigint NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT "Absence_pkey" PRIMARY KEY (id),
  CONSTRAINT "Absence_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id)
);

-- Enable Row Level Security
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Absence" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic example)
CREATE POLICY "Users can view their own data" ON public."User"
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own data" ON public."User"
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view all absences" ON public."Absence"
  FOR SELECT USING (true);

CREATE POLICY "Users can insert absences" ON public."Absence"
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update absences" ON public."Absence"
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete absences" ON public."Absence"
  FOR DELETE USING (true);
```

## Database Schema

### User Model
- `id`: Auto-incrementing primary key (bigint)
- `email`: Unique email address (text)
- `name`: User's full name (text)
- `password`: Hashed password (text)
- `createdAt`: Account creation timestamp (timestamptz)

### Absence Model
- `id`: Auto-incrementing primary key (bigint)
- `name`: Name of the absent person (text)
- `date`: Date of absence (timestamp)
- `reason`: Reason for absence (text)
- `userId`: Foreign key to User (bigint)
- `createdAt`: Record creation timestamp (timestamptz)
- `updatedAt`: Last update timestamp (timestamp)

## Testing the Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test API Endpoints
Use PowerShell or curl to test:

```powershell
# Test user registration
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth" -Method POST -Body $body -ContentType "application/json"
```

### 3. Check Supabase Dashboard
- Go to your Supabase project dashboard
- Check the Table Editor to see created records
- Monitor the Logs for any errors

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check if your Supabase project is active
2. **Authentication Failed**: Verify your anon key is correct
3. **Tables Not Found**: Run the manual SQL setup
4. **Permission Denied**: Check RLS policies in Supabase

### Reset Database
1. Go to Supabase dashboard > Settings > Database
2. Click "Reset Database" (⚠️ This will delete all data)
3. Re-run the manual setup SQL if needed

## Development Workflow

1. Make changes to your API routes in `app/api/`
2. Test with the development server
3. Check Supabase dashboard for data changes
4. Monitor logs for any errors

## Production Deployment

1. Ensure your Supabase project is in production mode
2. Set up proper RLS policies for security
3. Configure environment variables in your deployment platform
4. Test all endpoints in production environment

## Security Best Practices

1. **Row Level Security (RLS)**: Always enable RLS on tables
2. **API Keys**: Keep your service role key secret
3. **Environment Variables**: Never commit `.env.local` to version control
4. **JWT Secrets**: Use strong, unique JWT secrets
5. **CORS**: Configure CORS policies appropriately

## Next Steps

After setting up the database:
1. Test user registration and login
2. Test absence creation and management
3. Configure additional RLS policies if needed
4. Set up monitoring and logging
5. Plan for production deployment

