import { Router } from 'express';

import { login, logout, me, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';

const authRouter = Router();

authRouter.post('/register', authRateLimiter, register);
authRouter.post('/login', authRateLimiter, login);
authRouter.post('/logout', logout);
authRouter.get('/me', authMiddleware, me);

export default authRouter;