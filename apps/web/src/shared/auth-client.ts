import { env } from "@soma/env/web";
import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  basePath: "/api/auth",
  plugins: [organizationClient()],
});
