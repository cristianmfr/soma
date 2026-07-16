import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const Route = createFileRoute("/_public/sign-in/")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h3 className="select-none">Welcome to Soma</h3>
        <p className="select-none text-muted-foreground">
          Sign in to your Soma account
        </p>
      </div>
      <div className="flex w-full max-w-72 flex-col">
        <SignInForm />
      </div>
    </div>
  );
}
