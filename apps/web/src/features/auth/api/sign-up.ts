import { z } from "zod";
import { authClient } from "@/shared/auth-client";

export const signUpSchema = z
  .object({
    name: z
      .string("Enter your full name")
      .min(2, "Enter a valid name")
      .regex(/^[^\d]*$/, "Names cannot contain numbers")
      .regex(/^[a-zA-Z ]+$/, "Special characters are not allowed"),
    email: z
      .email("Enter a valid email address")
      .min(1, "Enter your email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpRequest = z.infer<typeof signUpSchema>;

export async function signUp({ name, email, password }: SignUpRequest) {
  return await authClient.signUp.email({ name, email, password });
}
