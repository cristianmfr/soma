import { env } from "@soma/env";
import { createAuthClient } from "better-auth/client";
import {
  magicLinkClient,
  organizationClient,
} from "better-auth/client/plugins";

export const { signIn, signOut, signUp, getSession, magicLink } =
  createAuthClient({
    baseURL: env.NEXT_PUBLIC_SERVER_URL,
    basePath: "/api/auth",
    plugins: [magicLinkClient(), organizationClient()],
  });
