import { Request, Response } from 'express';
import { z } from 'zod';

import * as authService from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { clearAuthCookie, generateToken } from '../utils/generateToken';

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(128)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).toLowerCase(),
  password: passwordSchema,
});

const loginSchema = z.object({
  email: z.string().trim().email().max(254).toLowerCase(),
  password: z.string().min(6).max(128),
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const input = registerSchema.parse(req.body);
  const user = await authService.register(input);

  generateToken(res, user.id);

  res.status(201).json({
    message: 'User registered successfully',
    user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);
  const user = await authService.login(input);

  generateToken(res, user.id);

  res.status(200).json({
    message: 'Login successful',
    user,
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(200).json({ message: 'Logged out' });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.id);
  res.status(200).json({ user });
});