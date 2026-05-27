import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const getAuthCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: env.NODE_ENV === 'production',
  path: '/',
  maxAge: SEVEN_DAYS_MS,
});

export const generateToken = (res: Response, userId: string): string => {
  const expiresIn = env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn,
  });

  res.cookie('token', token, getAuthCookieOptions());

  return token;
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie('token', getAuthCookieOptions());
};
