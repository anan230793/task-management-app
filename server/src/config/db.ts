import mongoose from 'mongoose';

import { env } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
  } catch {
    process.exit(1);
  }
};
