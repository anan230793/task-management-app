import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { connectDB } from './src/config/db';
import { env } from './src/config/env';

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(env.PORT);
};

startServer().catch(() => {
  process.exit(1);
});
