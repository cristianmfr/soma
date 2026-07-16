import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/generated/client";
import { env } from "@soma/env/server";
import { RedisClient } from "bun";

export function createRedis() {
  const connectionString = `${env.REDIS_URL}`;
  return new RedisClient(connectionString);
}

export function createDb() {
  const connectionString = `${env.DATABASE_URL}`
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export const db = createDb()
export const redis = createRedis()