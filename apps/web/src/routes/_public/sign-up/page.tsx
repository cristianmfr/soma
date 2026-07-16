import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { VerifyEmail } from "@/features/auth/components/verify-email";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";

export const Route = createFileRoute("/_public/sign-up/")({
  component: SignUpPage,
});

function SignUpPage() {
  const { step } = useAuthStore();

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h3 className="select-none">Create your account</h3>
        <p className="select-none text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="flex w-full max-w-72 flex-col">
        {step === "verify-email" ? <VerifyEmail /> : <SignUpForm />}
      </div>
    </div>
  );
}
