import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import path from "path";
import { z } from "zod";

const root = import.meta.dirname
  ? path.resolve(import.meta.dirname, "../..")
  : path.resolve(process.cwd(), "../..");

config({ path: path.join(root, ".env"), quiet: true });

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3001),
    HOST: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    ALLOWED_CORS_ORIGINS: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SERVER_URL: z.url(),
  },
  runtimeEnv: {
    PORT: process.env.SERVER_PORT,
    HOST: process.env.SERVER_HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    ALLOWED_CORS_ORIGINS: process.env.ALLOWED_CORS_ORIGINS,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
