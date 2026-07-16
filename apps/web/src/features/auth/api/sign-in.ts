import { z } from "zod";
import { authClient } from "@/shared/auth-client";

export const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

type SignInRequest = z.infer<typeof signInSchema>;

export async function signIn(input: SignInRequest) {
  return await authClient.signIn.email(input);
}
