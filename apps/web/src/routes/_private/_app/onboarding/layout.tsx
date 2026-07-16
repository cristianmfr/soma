import { createFileRoute, redirect } from "@tanstack/react-router";
import { OnboardingLayout } from "@/layouts/onboarding.layout";
import { authClient } from "@/shared/auth-client";

export const Route = createFileRoute("/_private/_app/onboarding")({
  component: OnboardingLayout,
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (!session?.session) throw redirect({ to: "/sign-in" });

    const { data: organizations } = await authClient.organization.list();

    if (organizations?.length !== 0) throw redirect({ to: "/" });
  },
});
