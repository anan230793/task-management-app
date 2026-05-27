import bcrypt from 'bcryptjs';

import User, { SafeUser, UserDocument } from '../models/User.model';
import { AppError } from '../utils/AppError';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

const toSafeUser = (user: UserDocument): SafeUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const register = async ({ name, email, password }: RegisterInput): Promise<SafeUser> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return toSafeUser(user);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: number }).code === 11000
    ) {
      throw new AppError('Email already registered', 409);
    }

    throw new AppError('Failed to register user', 500);
  }
};

export const login = async ({ email, password }: LoginInput): Promise<SafeUser> => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !user.password) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  return toSafeUser(user as UserDocument);
};

export const getMe = async (userId: string): Promise<SafeUser> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return toSafeUser(user as UserDocument);
};