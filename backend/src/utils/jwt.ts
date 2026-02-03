import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: config.jwtExpire,
  } as jwt.SignOptions);
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.jwtRefreshSecret as string, {
    expiresIn: config.jwtRefreshExpire,
  } as jwt.SignOptions);
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwtSecret as string) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwtRefreshSecret as string) as JWTPayload;
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
