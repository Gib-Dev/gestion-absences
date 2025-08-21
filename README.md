# Gestion Absences - Absence Management System

A modern, production-ready Next.js application for managing employee absences and attendance tracking.

## Features

- **Secure Authentication** - JWT-based user authentication system with Supabase
- **User Management** - User registration, login, and profile management
- **Absence Tracking** - Submit, view, and manage absence requests
- **Dashboard** - Comprehensive overview of all data and statistics
- **Modern UI** - Responsive design with Tailwind CSS
- **Database** - PostgreSQL with Supabase (production-ready)
- **Production Ready** - Optimized for deployment with proper error handling

## Quick Start

### Prerequisites
- Node.js 18+ 
- Git
- Supabase account

### Installation
```bash
# Clone the repository
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences

# Install dependencies
npm install

# Set up environment variables
cp env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

### Environment Setup
Create a `.env.local` file with your Supabase configuration:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# JWT Configuration
JWT_SECRET=your-jwt-secret
```

## Documentation

- **[Quick Start Guide](docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Quick Deploy Guide](docs/QUICK_DEPLOY.md)** - Deploy to production in 5 minutes
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Comprehensive deployment instructions
- **[Database Setup](docs/DATABASE_SETUP.md)** - Supabase configuration and management
- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Clean project organization
- **[Migration Guide](docs/MIGRATION_GUIDE.md)** - Prisma to Supabase migration details
- **[GitHub Protection Setup](docs/GITHUB_PROTECTION_SETUP.md)** - Repository security configuration

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Project Structure

```
gestion-absences/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── absences/      # Absence management endpoints
│   │   └── users/         # User management endpoints
│   ├── auth/              # Authentication pages
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── dashboard/         # Dashboard page
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries (Supabase client)
│   ├── profile/           # User profile page
│   └── statistics/        # Statistics page
├── docs/                  # Documentation
├── public/                # Static assets
└── scripts/               # Utility scripts
```

## Database Schema

### User Model
- `id` - Primary key (bigint)
- `email` - Unique email address (text)
- `name` - User's full name (text)
- `password` - Hashed password (text)
- `createdAt` - Account creation timestamp (timestamptz)

### Absence Model
- `id` - Primary key (bigint)
- `name` - Name of absent person (text)
- `date` - Date of absence (timestamp)
- `reason` - Reason for absence (text)
- `userId` - Foreign key to User (bigint)
- `createdAt` - Record creation timestamp (timestamptz)
- `updatedAt` - Last update timestamp (timestamp)

## Deployment

This application is optimized for deployment on modern platforms:

- **Vercel** (Recommended) - Zero-config deployment
- **Railway** - Full-stack deployment
- **Netlify** - Static site deployment
- **Docker** - Containerized deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed production deployment instructions.

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation with Zod
- CORS protection
- Environment variable security
- Row Level Security (RLS) with Supabase

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL with Supabase
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
- **Styling**: Tailwind CSS, CSS Modules
- **Deployment**: Vercel, Railway, Docker

## Recent Fixes & Improvements

### Database Migration
- **Successfully migrated from Prisma to Supabase** - Complete database layer replacement
- **All CRUD operations functional** - Create, Read, Update, Delete for absences and users
- **Authentication system working** - JWT + Supabase integration complete
- **Production-ready database** - PostgreSQL with proper constraints and RLS

### Authentication System
- **Fixed login redirection** - Users now properly redirect to dashboard after login
- **Resolved API errors** - `/api/auth/me` endpoint now works correctly
- **Improved middleware** - Simplified authentication flow for better performance
- **Enhanced error handling** - Graceful token validation and cleanup

### Navigation & UI
- **Active navigation states** - Menu items show current page
- **Responsive design** - Mobile-friendly navigation
- **Footer component** - Integrated with website color scheme
- **Page layout system** - Consistent structure across all pages

### Code Quality
- **Performance optimization** - React.memo, useCallback, useMemo
- **Constants centralization** - All text and configuration in one place
- **Error boundaries** - Better error handling and user experience
- **Type safety** - Improved validation and error messages

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting any changes.

### Quick Start for Contributors:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our [code standards](CONTRIBUTING.md#code-standards)
4. Test your changes thoroughly
5. Commit using [conventional commits](CONTRIBUTING.md#commit-message-format)
6. Push to your fork and create a Pull Request

### Repository Protection
Our repository is protected with:
- **Branch protection rules** - Main branch is protected
- **CI/CD pipeline** - Automated testing and quality checks
- **Pull request templates** - Structured review process
- **Issue templates** - Standardized bug reports and feature requests

See [docs/GITHUB_PROTECTION_SETUP.md](docs/GITHUB_PROTECTION_SETUP.md) for detailed information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Check the [documentation](docs/) first
- Report bugs via GitHub Issues
- Ask questions in Discussions
- Contact the development team

## Changelog

### v3.0.0 - Supabase Migration (Current)
- **Complete Prisma to Supabase migration** - All database operations now use Supabase
- **Production database ready** - PostgreSQL with proper constraints and RLS policies
- **All CRUD operations functional** - Absences and users management fully operational
- **Authentication system unified** - JWT + Supabase working seamlessly
- **Performance improvements** - Optimized database queries and error handling

### v2.2.0 - Production Authentication Fixes
- **Fixed authentication flow** - Login/registration now works correctly
- **Resolved API errors** - All endpoints functioning properly
- **Unified authentication system** - Consistent token verification across APIs
- **Enhanced error handling** - Better user experience and debugging

### v2.0.0 - Production Refactor
- **Complete codebase refactoring**
- **Edge Runtime compatible middleware**
- **Centralized authentication system**
- **Comprehensive error handling**
- **API service layer**
- **Production-ready architecture**

### v1.0.0 - Initial Release
- Basic absence management functionality
- User authentication system
- Dashboard and statistics

---

**Status**: **READY FOR PRODUCTION** - Successfully migrated to Supabase, all APIs functional, database operations working perfectly



