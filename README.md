# 🏢 Gestion Absences - Absence Management System

A modern, production-ready Next.js application for managing employee absences and attendance tracking.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication system
- 👥 **User Management** - User registration, login, and profile management
- 📝 **Absence Tracking** - Submit, view, and manage absence requests
- 📊 **Dashboard** - Comprehensive overview of all data and statistics
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 🚀 **Production Ready** - Optimized for deployment with proper error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences

# Install dependencies
npm install

# Set up environment
cp env.example .env
# Edit .env with your database credentials

# Auto-setup database
npm run setup

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

### Default Login
- **Email**: admin@example.com
- **Password**: password123

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

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

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
- **Database**: PostgreSQL
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
- **Styling**: Tailwind CSS, CSS Modules
- **Deployment**: Vercel, Railway, Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 Check the [documentation](docs/) first
- 🐛 Report bugs via GitHub Issues
- 💬 Ask questions in Discussions
- 📧 Contact the development team

## 🔄 Changelog

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



