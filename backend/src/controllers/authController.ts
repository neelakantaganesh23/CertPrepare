import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { hashPassword, comparePasswords, isValidPassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { successResponse, errorResponse } from '../utils/responses.js';

const prisma = new PrismaClient();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

const refreshTokenSchema = z.object({
  refresh_token: z.string(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validated = registerSchema.parse(req.body);

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      errorResponse(res, 'Email already registered', 400);
      return;
    }

    // Validate password strength
    if (!isValidPassword(validated.password)) {
      errorResponse(
        res,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        400
      );
      return;
    }

    // Hash password
    const passwordHash = await hashPassword(validated.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        password_hash: passwordHash,
        first_name: validated.first_name,
        last_name: validated.last_name,
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      'Registration successful',
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      errorResponse(res, 'Validation error', 400, error.errors);
      return;
    }
    errorResponse(res, 'Registration failed', 500, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validated = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user || !user.is_active) {
      errorResponse(res, 'Invalid credentials', 401);
      return;
    }

    // Verify password
    const isPasswordValid = await comparePasswords(
      validated.password,
      user.password_hash
    );

    if (!isPasswordValid) {
      errorResponse(res, 'Invalid credentials', 401);
      return;
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(res, {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      errorResponse(res, 'Validation error', 400, error.errors);
      return;
    }
    errorResponse(res, 'Login failed', 500, error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validated = refreshTokenSchema.parse(req.body);

    const payload = verifyRefreshToken(validated.refresh_token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.is_active) {
      errorResponse(res, 'User not found or inactive', 401);
      return;
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    successResponse(res, { access_token: accessToken });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      errorResponse(res, 'Validation error', 400, error.errors);
      return;
    }
    errorResponse(res, 'Token refresh failed', 401, error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // JWT tokens are stateless, so logout is handled on the client side
  // In production, you might want to add token to a blacklist in Redis
  successResponse(res, null, 'Logout successful');
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      errorResponse(res, 'Unauthorized', 401);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        role: true,
        email_verified: true,
        is_active: true,
        created_at: true,
      },
    });

    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    successResponse(res, user);
  } catch (error) {
    errorResponse(res, 'Failed to fetch user', 500, error);
  }
};
