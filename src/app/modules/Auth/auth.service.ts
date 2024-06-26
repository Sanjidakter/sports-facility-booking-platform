// src/app/modules/auth/auth.service.ts
import jwt from 'jsonwebtoken';
import config from '../../../config';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
