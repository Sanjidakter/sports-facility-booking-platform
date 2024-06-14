// src/app/modules/auth/auth.routes.ts
import { Router } from 'express';
import { signUp, login } from './auth.controller';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
