import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { APP_CONFIG } from '@/constants';

// Input validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(APP_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  name: z.string().min(APP_CONFIG.VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(APP_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters')
});

// JWT token management
export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || APP_CONFIG.AUTH.TOKEN_EXPIRY,
    issuer: 'gestion-absences',
    audience: 'gestion-absences-users'
  });
};

export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'gestion-absences',
      audience: 'gestion-absences-users'
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Password hashing
export const hashPassword = async (password) => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Authentication middleware helper
export const authenticateUser = (req) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header');
  }
  
  const token = authHeader.substring(7);
  return verifyToken(token);
};

