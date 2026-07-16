import { Button } from "@soma/ui/components/button";
import { Input } from "@soma/ui/components/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@soma/ui/field";
import { Link } from "@tanstack/react-router";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { useZodForm } from "@/hooks/use-zod-form";
import { signUp, signUpSchema } from "../api/sign-up";
import { useAuthStore } from "../hooks/use-auth-store";

export function SignUpForm() {
  const { control, handleSubmit } = useZodForm(signUpSchema, {
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { setStep } = useAuthStore();

  const onEmailSignUpSubmit = handleSubmit(async (formData) => {
    try {
      await signUp(formData).then(() => {
        setStep("verify-email");
      });
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.error(error);
    }
  });

  return (
    <div className="flex w-full flex-col gap-6 *:selection:bg-primary/75">
      <form
        id="email.login.form"
        onSubmit={onEmailSignUpSubmit}
        className="flex w-full flex-col gap-4"
      >
        <FieldGroup>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={!!fieldState.error?.message}
                  type="text"
                  placeholder="John Doe"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={!!fieldState.error?.message}
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={!!fieldState.error?.message}
                  type="password"
                  placeholder="Enter password"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={!!fieldState.error?.message}
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
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

      <div className="text-center text-muted-foreground/75 text-xs *:[p]:text-xs">
        <p> By clicking continue, you agree to our</p>
        <p className="*:[a]:transition *:[a]:ease-in-out *:[a]:hover:text-white">
          <Link to="/sign-in">Terms of Service</Link> and{" "}
          <Link to="/sign-in">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
