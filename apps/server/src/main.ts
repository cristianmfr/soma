import cors from "@elysia/cors";
import openapi from "@elysia/openapi";
import { env } from "@soma/env/server";
import { AppModule } from "./app";

const corsOrigins = env.ALLOWED_CORS_ORIGINS.split("|");

const app = AppModule.register();

app.use(
  cors({
    origin: corsOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(
  openapi({
    documentation: {
      info: {
        title: "Soma API",
        description: "Soma is a personal finance management platform.",
        version: "v0.0.1",
      },
    },
    path: "/docs",
  }),
);

app.listen({ hostname: env.HOST, port: env.PORT });

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);
