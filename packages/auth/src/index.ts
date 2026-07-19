import { createDb, createRedis } from "@soma/db";
import { env } from "@soma/env";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink, organization } from "better-auth/plugins";
import { ac } from "./lib/access-control";
import { admin, member, owner } from "./lib/roles";

const trustedOrigins = env.ALLOWED_CORS_ORIGINS.split("|");

export function createAuth() {
  const prisma = createDb();
  const redis = createRedis();

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,

    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),

    basePath: "/api/auth",
    baseURL: env.BETTER_AUTH_URL,

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
    },

    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
      resetPasswordTokenExpiresIn: 60 * 60,
      sendResetPassword: async ({ token }) => {
        console.log(token);
      },
    },

    emailVerification: {
      autoSignInAfterVerification: true,
      sendOnSignUp: true,
      sendVerificationEmail: async ({ token }) => {
        console.log(token);
      },
    },

    plugins: [
      magicLink({
        disableSignUp: false,
        sendMagicLink: async ({ email, token, url, metadata }) => {
          const payload = {
            email,
            token,
            url,
            metadata,
          };

          console.log(JSON.stringify(payload));
        },
      }),
      organization({
        allowUserToCreateOrganization: true,

        ac,
        roles: {
          owner,
          admin,
          member,
        },
      }),
    ],

    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 15,
      },
    },

    secondaryStorage: {
      set: async (key, value, ttl) => {
        await redis.set(key, value);
        if (ttl) {
          await redis.expire(key, ttl);
        }
      },
      get: async (key) => {
        return await redis.get(key);
      },
      delete: async (key) => {
        await redis.del(key);
      },
    },

    advanced: {
      cookiePrefix: "soma",
      database: {
        generateId: false,
      },
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
    },

    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            const organization = await prisma.organization.findFirst({
              where: {
                members: {
                  every: {
                    userId: session.userId,
                  },
                },
              },
            });
            return {
              data: {
                ...session,
                activeOrganizationId: organization?.id,
              },
            };
          },
        },
      },
    },

    trustedOrigins,
  });
}

export const auth = createAuth();
