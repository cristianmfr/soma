import { authClient } from "@/shared/auth-client";

export async function socialSignIn(provider: string) {
  return await authClient.signIn.social({
    provider,
  });
}
