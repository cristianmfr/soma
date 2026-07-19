"use client";

import { Button } from "@soma/ui/components/button";
import { EmailLoginForm } from "@/components/forms/email-login-form";
import { useI18n } from "@/lib/i18n/client";

interface SignUpMethodsProps {
  onBack: () => void;
}

export function LoginEmailMethod({ onBack }: SignUpMethodsProps) {
  const t = useI18n();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-center">
        <h3 className="select-none font-medium text-lg">
          {t("auth.page.login.email.title")}
        </h3>
      </div>
      <div className="flex w-full flex-col gap-2">
        <EmailLoginForm />
        <Button
          type="submit"
          form="login.email.form"
          className="rounded-full font-normal"
          size="lg"
        >
          {t("auth.page.login.email")}
        </Button>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer font-normal text-muted-foreground text-xs underline-offset-4 transition ease-in hover:text-foreground hover:underline"
      >
        {t("auth.page.login.back")}
      </button>
    </div>
  );
}
