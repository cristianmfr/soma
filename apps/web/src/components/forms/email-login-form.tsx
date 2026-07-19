"use client"

import { Input } from "@soma/ui/components/input"
import { Field, FieldGroup, FieldLabel } from "@soma/ui/field"
import { Controller } from "react-hook-form"
import z from "zod"
import { useZodForm } from "@/hooks/use-zod-form"
import { signIn } from "@/lib/auth"
import { useI18n } from "@/lib/i18n/client"

export function EmailLoginForm() {
  const t = useI18n()

  const { control, handleSubmit } = useZodForm(
    z.object({
      email: z
        .email("Enter a valid email address")
        .min(1, "Enter your email address"),
    }),
  )

  const onSubmit = handleSubmit(async ({ email }) => {
    return await signIn.magicLink({
      email,
    })
  })

  return (
    <form
      id="login.email.form"
      onSubmit={onSubmit}
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
                name="email"
                placeholder={t("auth.page.signup.email.placeholder")}
                className="h-12"
              />
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
