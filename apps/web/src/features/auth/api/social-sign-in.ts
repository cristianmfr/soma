import { env } from "@soma/env/web";
import { authClient } from "@/shared/auth-client";

export async function socialSignIn(provider: string) {
  return await authClient.signIn.social({
    provider,
    callbackURL: env.VITE_GOOGLE_REDIREC_URL,
  });
}
