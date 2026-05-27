import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

import { env } from '../config/env';
import { AppError } from '../utils/AppError';

export const notFoundMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const formatZodErrors = (error: ZodError): { field: string; message: string }[] =>
  error.issues.map((issue) => ({
    field: issue.path.join('.') || 'body',
    message: issue.message,
  }));

const isDuplicateKeyError = (err: unknown): boolean =>
  typeof err === 'object' &&
  err !== null &&
  'code' in err &&
  (err as { code?: number }).code === 11000;

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Validation failed',
      errors: formatZodErrors(err),
    });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: `Invalid value for field: ${err.path}` });
    return;
  }

  if (isDuplicateKeyError(err)) {
    res.status(409).json({ message: 'A record with that value already exists' });
    return;
  }

  if (err instanceof Error) {
    const message = env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
    res.status(500).json({ message });
    return;
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
