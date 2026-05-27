import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '../config/env';

interface AuthPayload extends JwtPayload {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token as string | undefined;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.user = { id: decoded.userId };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};