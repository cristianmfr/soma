import cors from "@elysia/cors"
import { env } from "@soma/env"
import Elysia from "elysia"

const corsOrigins = env.ALLOWED_CORS_ORIGINS.split("|")

export const corsConfig = new Elysia().use(
  cors({
    origin: corsOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)
