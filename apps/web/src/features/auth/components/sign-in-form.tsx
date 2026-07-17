import { Button } from "@soma/ui/components/button";
import { Input } from "@soma/ui/components/input";
import { Separator } from "@soma/ui/components/separator";
import { Field, FieldGroup, FieldLabel } from "@soma/ui/field";
import { Link } from "@tanstack/react-router";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import googleIcon from "@/assets/icons/google.png";
import { useZodForm } from "@/hooks/use-zod-form";
import { signIn, signInSchema } from "../api/sign-in";
import { socialSignIn } from "../api/social-sign-in";

export function SignInForm() {
  const { control, handleSubmit } = useZodForm(signInSchema, {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onEmailSignInSubmit = handleSubmit(async (formData) => {
    try {
      await signIn(formData);
      toast.success("Authenticated successfully!");
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.error(error);
    }
  });

  const onGoogleSignIn = async () => {
    return await socialSignIn("google");
  };

  return (
    <div className="flex w-full flex-col gap-6 *:selection:bg-primary/75">
      <div className="flex w-full">
        <Button
          type="button"
          className="h-9 w-full"
          variant="secondary"
          onClick={onGoogleSignIn}
        >
          <img src={googleIcon} alt="google" className="size-3.5" />
          Sign in with Google
        </Button>
      </div>
      <div className="relative flex w-full items-center justify-center">
        <Separator className="w-full" />
        <p className="absolute select-none bg-background px-2 text-[10px] text-muted-foreground uppercase">
          Or continue with email
        </p>
      </div>
      <form
        id="email.login.form"
        onSubmit={onEmailSignInSubmit}
        className="flex w-full flex-col gap-4"
      >
        <FieldGroup>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
              </Field>
            )}
          />
        </FieldGroup>

        <Field>
          <Button type="submit" form="email.login.form" className="h-9 w-full">
            Continue
          </Button>
        </Field>
      </form>

      <div className="select-none text-center text-muted-foreground *:[p]:text-xs">
        <p className="*:[a]:transition *:[a]:ease-in-out *:[a]:hover:text-white">
          Don&apos;t have an account? <Link to="/sign-in">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
