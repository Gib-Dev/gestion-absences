# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Git installed

## 5-Minute Setup

### 1. Clone & Install
```bash
git clone https://github.com/Gib-Dev/gestion-absences.git
cd gestion-absences
npm install
```

### 2. Database Setup
```bash
# Copy environment file
cp env.example .env

# Edit .env with your database details
# DATABASE_URL="postgresql://username:password@localhost:5432/gestion_absences"
# JWT_SECRET="your-secret-key-here"
```

### 3. Auto-Setup Database
```bash
npm run setup
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Default Login
- **Email**: admin@example.com
- **Password**: password123

## What's Included

✅ **User Management**: Register, login, profile management  
✅ **Absence Tracking**: Add, view, delete absences  
✅ **Dashboard**: Overview of all data  
✅ **Responsive Design**: Works on all devices  
✅ **Database**: PostgreSQL with Prisma ORM  
✅ **Authentication**: JWT-based security  

## Need Help?

- Check [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed database configuration
- Review [README.md](./README.md) for full project documentation
- Open an issue on GitHub for bugs or questions

## Common Issues

**Database Connection Failed?**
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

**Setup Script Failed?**
- Run `npm run db:generate` manually
- Check database permissions
- Verify .env file exists

**Port Already in Use?**
- Change port in package.json scripts
- Kill existing Node.js processes
- Use `npm run dev -- -p 3001`

