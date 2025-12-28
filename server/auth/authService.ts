/**
 * Prize2Pride Lingua Spanish Platform
 * Authentication Service - Full Stack Security
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Complete authentication system with JWT, sessions, and OAuth
 */

import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Environment variables (should be set in production)
const JWT_SECRET = process.env.JWT_SECRET || 'prize2pride-eternal-secret-key-2025';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'prize2pride-refresh-secret-key-2025';
const JWT_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '7d';
const SALT_ROUNDS = 12;

// Types
export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  preferredLanguage: string;
  currentLevel: string;
  preferredMode: string;
  role: 'user' | 'premium' | 'admin' | 'superadmin';
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SessionData {
  userId: string;
  email: string;
  role: string;
  subscription?: {
    planId: string;
    status: string;
  };
  preferences: {
    language: string;
    level: string;
    mode: string;
  };
}

// Validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  preferredLanguage: z.enum(['en', 'fr', 'de', 'it', 'ar', 'zh']).default('en'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// JWT Token generation
export function generateAccessToken(payload: Omit<TokenPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'access' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function generateRefreshToken(payload: Omit<TokenPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );
}

export function generateAuthTokens(user: User): AuthTokens {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
    expiresIn: 3600, // 1 hour in seconds
  };
}

// Token verification
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    if (decoded.type !== 'access') return null;
    return decoded;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    if (decoded.type !== 'refresh') return null;
    return decoded;
  } catch {
    return null;
  }
}

// Session management
const activeSessions: Map<string, SessionData> = new Map();

export function createSession(user: User, subscription?: { planId: string; status: string }): string {
  const sessionId = uuidv4();
  
  activeSessions.set(sessionId, {
    userId: user.id,
    email: user.email,
    role: user.role,
    subscription,
    preferences: {
      language: user.preferredLanguage,
      level: user.currentLevel,
      mode: user.preferredMode,
    },
  });

  return sessionId;
}

export function getSession(sessionId: string): SessionData | null {
  return activeSessions.get(sessionId) || null;
}

export function destroySession(sessionId: string): boolean {
  return activeSessions.delete(sessionId);
}

export function updateSessionPreferences(
  sessionId: string, 
  preferences: Partial<SessionData['preferences']>
): boolean {
  const session = activeSessions.get(sessionId);
  if (!session) return false;
  
  session.preferences = { ...session.preferences, ...preferences };
  activeSessions.set(sessionId, session);
  return true;
}

// Email verification token
export function generateEmailVerificationToken(userId: string): string {
  return jwt.sign(
    { userId, type: 'email_verification' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyEmailVerificationToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
    if (decoded.type !== 'email_verification') return null;
    return { userId: decoded.userId };
  } catch {
    return null;
  }
}

// Password reset token
export function generatePasswordResetToken(userId: string): string {
  return jwt.sign(
    { userId, type: 'password_reset' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function verifyPasswordResetToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
    if (decoded.type !== 'password_reset') return null;
    return { userId: decoded.userId };
  } catch {
    return null;
  }
}

// Role-based access control
export const ROLE_PERMISSIONS = {
  user: ['read:lessons', 'write:progress', 'read:chat', 'write:chat'],
  premium: ['read:lessons', 'write:progress', 'read:chat', 'write:chat', 'read:premium', 'write:premium'],
  admin: ['read:lessons', 'write:progress', 'read:chat', 'write:chat', 'read:premium', 'write:premium', 'read:admin', 'write:admin'],
  superadmin: ['*'],
};

export function hasPermission(role: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [];
  return permissions.includes('*') || permissions.includes(permission);
}

export function requirePermission(role: string, permission: string): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Permission denied: ${permission}`);
  }
}

// Rate limiting (in-memory for demo, use Redis in production)
const rateLimitStore: Map<string, { count: number; resetAt: number }> = new Map();

export function checkRateLimit(
  key: string, 
  maxRequests: number = 100, 
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || record.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  rateLimitStore.set(key, record);
  return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt };
}

// OAuth helpers (for future implementation)
export interface OAuthProfile {
  provider: 'google' | 'facebook' | 'apple' | 'github';
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export function generateOAuthState(): string {
  return uuidv4();
}

export function validateOAuthState(state: string, expectedState: string): boolean {
  return state === expectedState;
}

// Export auth service
export const authService = {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  generateAuthTokens,
  verifyAccessToken,
  verifyRefreshToken,
  createSession,
  getSession,
  destroySession,
  updateSessionPreferences,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  hasPermission,
  requirePermission,
  checkRateLimit,
  generateOAuthState,
  validateOAuthState,
};

export default authService;
