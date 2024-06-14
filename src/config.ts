// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
  mongoUri: process.env.MONGO_URI || 'your-mongodb-uri',
};
