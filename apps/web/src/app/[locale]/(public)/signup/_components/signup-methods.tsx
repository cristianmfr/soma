import { Button } from "@soma/ui/components/button";
import { useI18n } from "@/lib/i18n/client";

interface SignUpMethodsProps {
  onEmailSelect: () => void;
  onGoogleSelect: () => void;
}

export function SignUpMethods({
  onEmailSelect,
  onGoogleSelect,
}: SignUpMethodsProps) {
  const t = useI18n();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-center">
        <h3 className="select-none font-medium text-lg">
          {t("auth.page.signup.title")}
        </h3>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button
          type="button"
          onClick={onGoogleSelect}
          className="w-full rounded-full font-normal"
          size="lg"
        >
          {t("auth.page.signup.google")}
        </Button>
        <Button
          type="button"
          className="w-full rounded-full font-normal"
          variant="secondary"
          onClick={onEmailSelect}
          size="lg"
        >
          {t("auth.page.signup.email")}
        </Button>
      </div>
      <div className="select-none text-center text-muted-foreground *:[p]:text-xs">
        <p className="*:[a]:transition *:[a]:ease-in-out *:[a]:hover:text-white">
          {t("auth.page.signup.login.text")}{" "}
          <a href="/login"> {t("auth.page.signup.login.link")}</a>
        </p>
      </div>
    </div>
  );
}
