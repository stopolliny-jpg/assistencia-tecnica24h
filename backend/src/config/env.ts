import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  FRONTEND_URL: z.string(),
  ADMIN_URL: z.string(),
  WHATSAPP_NUMBER: z.string(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REDIRECT_URI: z.string().optional(),
  TOKEN_ENCRYPTION_SECRET: z.string().length(32, 'Must be 32 characters long for AES-256-CBC')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
