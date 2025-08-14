# 🏢 Gestion Absences - Absence Management System

A modern, production-ready Next.js application for managing employee absences and attendance tracking.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication system
- 👥 **User Management** - User registration, login, and profile management
- 📝 **Absence Tracking** - Submit, view, and manage absence requests
- 📊 **Dashboard** - Comprehensive overview of all data and statistics
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🗄️ **Database** - SQLite (local dev) / PostgreSQL (production) with Prisma ORM
- 🚀 **Production Ready** - Optimized for deployment with proper error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences

# Install dependencies
npm install

# Set up environment (SQLite for local development)
cp env.example .env
# Edit .env if you want to use PostgreSQL

# Auto-setup database (SQLite)
npm run setup

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

### Database Setup
The application now uses **SQLite by default** for local development, making it easier to get started:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

## 📚 Documentation

- **[📖 Documentation Index](docs/README.md)** - Complete documentation overview
- **[🚀 Quick Start Guide](docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[🚀 Quick Deploy Guide](docs/QUICK_DEPLOY.md)** - Deploy to production in 5 minutes
- **[📖 Deployment Guide](docs/DEPLOYMENT.md)** - Comprehensive deployment instructions
- **[🗄️ Database Setup](docs/DATABASE_SETUP.md)** - Database configuration and management
- **[📊 Project Status](docs/PROJECT_STATUS.md)** - Current development status and achievements

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database
npm run setup        # Complete database setup

# Code Quality
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
gestion-absences/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── absences/      # Absence management endpoints
│   ├── auth/              # Authentication pages
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── dashboard/         # Dashboard page
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── profile/           # User profile page
│   └── statistics/        # Statistics page
├── docs/                  # Documentation
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── scripts/               # Utility scripts
```

## 🗄️ Database Schema

### User Model
- `id` - Primary key
- `email` - Unique email address
- `name` - User's full name
- `password` - Hashed password
- `createdAt` - Account creation timestamp

### Absence Model
- `id` - Primary key
- `name` - Name of absent person
- `date` - Date of absence
- `reason` - Reason for absence
- `createdAt` - Record creation timestamp
- `updatedAt` - Last update timestamp

## 🚀 Deployment

This application is optimized for deployment on modern platforms:

- **Vercel** (Recommended) - Zero-config deployment
- **Railway** - Full-stack deployment
- **Netlify** - Static site deployment
- **Docker** - Containerized deployment

See [docs/DEPLOYMENT_PRODUCTION.md](docs/DEPLOYMENT_PRODUCTION.md) for detailed production deployment instructions.

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation with Zod
- CORS protection
- Environment variable security

## 🎨 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
- **Styling**: Tailwind CSS, CSS Modules
- **Deployment**: Vercel, Railway, Docker

## 🔧 Recent Fixes & Improvements

### Authentication System
- ✅ **Fixed login redirection** - Users now properly redirect to dashboard after login
- ✅ **Resolved API errors** - `/api/auth/me` endpoint now works correctly
- ✅ **Improved middleware** - Simplified authentication flow for better performance
- ✅ **Enhanced error handling** - Graceful token validation and cleanup

### Navigation & UI
- ✅ **Active navigation states** - Menu items show current page
- ✅ **Responsive design** - Mobile-friendly navigation
- ✅ **Footer component** - Integrated with website color scheme
- ✅ **Page layout system** - Consistent structure across all pages

### Code Quality
- ✅ **Performance optimization** - React.memo, useCallback, useMemo
- ✅ **Constants centralization** - All text and configuration in one place
- ✅ **Error boundaries** - Better error handling and user experience
- ✅ **Type safety** - Improved validation and error messages

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting any changes.

### Quick Start for Contributors:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our [code standards](CONTRIBUTING.md#code-standards)
4. Test your changes thoroughly
5. Commit using [conventional commits](CONTRIBUTING.md#commit-message-format)
6. Push to your fork and create a Pull Request

### 🛡️ Repository Protection
Our repository is protected with:
- ✅ **Branch protection rules** - Main branch is protected
- ✅ **CI/CD pipeline** - Automated testing and quality checks
- ✅ **Pull request templates** - Structured review process
- ✅ **Issue templates** - Standardized bug reports and feature requests

See [docs/GITHUB_PROTECTION_SETUP.md](docs/GITHUB_PROTECTION_SETUP.md) for detailed information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 Check the [documentation](docs/) first
- 🐛 Report bugs via GitHub Issues
- 💬 Ask questions in Discussions
- 📧 Contact the development team

## 🔄 Changelog

### v2.1.0 - Authentication & Navigation Fixes
- ✅ **Fixed authentication flow** - Login/registration now works correctly
- ✅ **Resolved API errors** - All endpoints functioning properly
- ✅ **Enhanced navigation** - Active states and responsive design
- ✅ **Improved error handling** - Better user experience
- ✅ **Performance optimization** - Faster loading and navigation

### v2.0.0 - Production Refactor
- ✅ Complete codebase refactoring
- ✅ Edge Runtime compatible middleware
- ✅ Centralized authentication system
- ✅ Comprehensive error handling
- ✅ API service layer
- ✅ Production-ready architecture

### v1.0.0 - Initial Release
- Basic absence management functionality
- User authentication system
- Dashboard and statistics

---

**Status**: 🟢 **READY FOR PRODUCTION** - All major issues resolved, authentication working correctly



