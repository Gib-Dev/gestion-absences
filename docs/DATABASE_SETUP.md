# Database Setup Guide

## Prisma Database Integration

This project has been updated to use Prisma ORM with PostgreSQL instead of JSON files.

## Prerequisites

1. **PostgreSQL Database**: You need a PostgreSQL database running
2. **Node.js**: Version 18+ recommended
3. **Environment Variables**: Set up your `.env` file

## Environment Setup

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Update `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gestion_absences"
   DIRECT_URL="postgresql://username:password@localhost:5432/gestion_absences"
   JWT_SECRET="your-super-secret-jwt-key-here"
   ```

## Database Setup Commands

### 1. Generate Prisma Client
```bash
npm run db:generate
```

### 2. Push Schema to Database
```bash
npm run db:push
```

### 3. Run Migrations (if needed)
```bash
npm run db:migrate
```

### 4. Seed Database with Sample Data
```bash
npm run db:seed
```

### 5. Reset Database (⚠️ Destructive)
```bash
npm run db:reset
```

### 6. Open Prisma Studio (Database GUI)
```bash
npm run db:studio
```

## Database Schema

### User Model
- `id`: Auto-incrementing primary key
- `email`: Unique email address
- `name`: User's full name
- `password`: Hashed password
- `createdAt`: Account creation timestamp

### Absence Model
- `id`: Auto-incrementing primary key
- `name`: Name of the absent person
- `date`: Date of absence
- `reason`: Reason for absence
- `createdAt`: Record creation timestamp
- `updatedAt`: Last update timestamp

## Migration from JSON Files

The existing JSON data can be migrated to the database using the seed script or by creating a custom migration script.

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if PostgreSQL is running
2. **Authentication Failed**: Verify username/password in DATABASE_URL
3. **Database Doesn't Exist**: Create the database first
4. **Permission Denied**: Check database user permissions

### Reset Everything
```bash
npm run db:reset
npm run db:generate
npm run db:push
npm run db:seed
```

## Development Workflow

1. Make changes to `prisma/schema.prisma`
2. Run `npm run db:push` to apply changes
3. Run `npm run db:generate` to update Prisma client
4. Restart your development server

## Production Deployment

1. Set up production PostgreSQL database
2. Update environment variables
3. Run `npm run db:generate` and `npm run db:push`
4. Ensure `JWT_SECRET` is properly set

