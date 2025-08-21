# Project Structure

## Overview

This document describes the clean, organized structure of the Gestion Absences project after the successful migration from Prisma to Supabase.

## Root Directory Structure

```
gestion-absences/
├── app/                    # Next.js 15 App Router
├── docs/                   # Project documentation
├── public/                 # Static assets
├── utils/                  # Utility functions
├── .github/                # GitHub workflows and templates
├── .vercel/                # Vercel deployment configuration
├── .gitignore              # Git ignore patterns
├── .eslintrc.json          # ESLint configuration
├── CHANGELOG.md            # Version history and changes
├── CONTRIBUTING.md         # Contribution guidelines
├── env.local.example       # Environment variables template
├── jsconfig.json           # JavaScript configuration
├── LICENSE                 # MIT License
├── middleware.js           # Next.js middleware
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependencies
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Main project documentation
├── tailwind.config.mjs     # Tailwind CSS configuration
└── vercel.json             # Vercel deployment settings
```

## Core Application Structure

### `/app` - Next.js App Router
```
app/
├── api/                    # API routes
│   ├── absences/          # Absence management endpoints
│   │   └── route.js       # CRUD operations for absences
│   ├── auth/              # Authentication endpoints
│   │   ├── me/            # User profile endpoint
│   │   │   └── route.js   # GET current user info
│   │   └── route.js       # User registration and login
│   └── users/             # User management endpoints
│       └── route.js       # CRUD operations for users
├── auth/                   # Authentication pages
│   ├── login/             # Login page
│   │   └── page.jsx       # User login form
│   └── register/          # Registration page
│       └── page.jsx       # User registration form
├── components/             # Reusable UI components
│   ├── Button.jsx         # Button component
│   ├── Card.jsx           # Card layout component
│   ├── Footer.jsx         # Page footer
│   ├── FormAbsence.jsx    # Absence form
│   ├── FormUser.jsx       # User form
│   ├── Loading.jsx        # Loading spinner
│   ├── Modal.jsx          # Modal dialog
│   ├── NavBar.jsx         # Navigation bar
│   ├── NavBar.module.css  # Navigation styles
│   ├── PageLayout.jsx     # Page layout wrapper
│   ├── Sidebar.jsx        # Sidebar navigation
│   ├── Table.jsx          # Generic table component
│   ├── TableAbsences.jsx  # Absences table
│   └── UserList.jsx       # Users list component
├── context/                # React context providers
│   ├── AbsencesContext.js # Absences state management
│   └── AuthContext.js     # Authentication state
├── dashboard/              # Dashboard page
│   ├── dashboard.module.css # Dashboard styles
│   └── page.jsx           # Main dashboard
├── hooks/                  # Custom React hooks
│   └── useAbsences.js     # Absences data hook
├── lib/                    # Utility libraries
│   ├── api.js             # API service layer
│   ├── auth-edge.js       # Edge runtime auth
│   ├── auth.js            # Authentication utilities
│   ├── errors.js          # Error handling
│   └── supabase.js        # Supabase client
├── layout.jsx              # Root layout component
├── layout.module.css       # Layout styles
├── page.jsx                # Home page
├── page.module.css         # Home page styles
├── profile/                # User profile page
│   ├── page.jsx           # Profile management
│   └── profile.module.css  # Profile styles
├── statistics/             # Statistics page
│   └── page.jsx           # Data visualization
├── styles/                 # Global styles
│   ├── globals.css        # Global CSS
│   └── variables.css      # CSS variables
└── utils/                  # Utility functions
    └── dateUtils.js       # Date formatting utilities
```

## Documentation Structure

### `/docs` - Project Documentation
```
docs/
├── DATABASE_SETUP.md       # Supabase database setup guide
├── DEPLOYMENT.md           # Production deployment guide
├── GITHUB_PROTECTION_SETUP.md # Repository security setup
├── MIGRATION_GUIDE.md      # Prisma to Supabase migration
├── PROJECT_STRUCTURE.md    # This file
├── QUICK_DEPLOY.md         # Quick deployment guide
└── QUICK_START.md          # Quick start guide
```

## Key Configuration Files

### Environment Configuration
- **`env.local.example`** - Template for environment variables
- **`.env.local`** - Local environment variables (not in git)

### Build Configuration
- **`next.config.mjs`** - Next.js configuration
- **`tailwind.config.mjs`** - Tailwind CSS configuration
- **`postcss.config.mjs`** - PostCSS configuration
- **`jsconfig.json`** - JavaScript path mapping

### Deployment Configuration
- **`vercel.json`** - Vercel deployment settings
- **`.vercel/`** - Vercel project configuration

### Code Quality
- **`.eslintrc.json`** - ESLint rules
- **`.github/`** - GitHub workflows and templates

## Removed Files and Directories

After the Supabase migration, the following were removed:

### Prisma-related
- `prisma/` - Prisma schema, migrations, and seed files
- `scripts/setup-database.js` - Database setup script
- `scripts/deploy.js` - Deployment script

### Local Data
- `data/` - Local JSON data files
- `*.db` - SQLite database files

## Benefits of Clean Structure

### 1. **Clear Separation of Concerns**
- **`/app`** - Application logic and components
- **`/docs`** - Comprehensive documentation
- **`/public`** - Static assets
- **`/utils`** - Utility functions

### 2. **Modern Next.js Architecture**
- App Router structure
- API routes organization
- Component hierarchy
- Context providers

### 3. **Production Ready**
- Supabase integration
- Environment configuration
- Deployment settings
- Code quality tools

### 4. **Developer Experience**
- Clear file organization
- Comprehensive documentation
- Consistent naming conventions
- Easy navigation

## File Naming Conventions

### Components
- **PascalCase** for React components (e.g., `Button.jsx`)
- **kebab-case** for CSS modules (e.g., `NavBar.module.css`)

### Pages and Routes
- **kebab-case** for directories (e.g., `user-profile/`)
- **page.jsx** for page components
- **route.js** for API endpoints

### Utilities
- **camelCase** for JavaScript files (e.g., `dateUtils.js`)
- **kebab-case** for documentation (e.g., `QUICK_START.md`)

## Getting Started

1. **Clone the repository**
2. **Copy environment template**: `cp env.local.example .env.local`
3. **Configure Supabase**: Update environment variables
4. **Install dependencies**: `npm install`
5. **Start development**: `npm run dev`

## Contributing

- Follow the established file structure
- Use consistent naming conventions
- Update documentation when adding new features
- Follow the contribution guidelines in `CONTRIBUTING.md`

---

**This structure reflects the clean, production-ready state after the successful Prisma to Supabase migration.**
