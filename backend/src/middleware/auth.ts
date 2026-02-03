import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/responses.js';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      email?: string;
      role?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      errorResponse(res, 'Missing or invalid authorization header', 401);
      return;
    }

    const token = authHeader.slice(7);
    const payload = verifyAccessToken(token);

    req.userId = payload.userId;
    req.email = payload.email;
    req.role = payload.role;

    next();
  } catch (error) {
    errorResponse(res, 'Invalid or expired token', 401, error);
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.role || !roles.includes(req.role)) {
      errorResponse(res, 'Insufficient permissions', 403);
      return;
    }
    next();
  };
};
