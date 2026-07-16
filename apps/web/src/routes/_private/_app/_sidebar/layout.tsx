import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@/shared/auth-client";

export const Route = createFileRoute("/_private/_app/_sidebar")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (!session?.session) throw redirect({ to: "/sign-in" });

    const { data: organizations } = await authClient.organization.list();

    if (organizations?.length === 0) throw redirect({ to: "/onboarding" });

    if (!session?.session.activeOrganizationId && organizations) {
      const organizationId = organizations[0].id;
      await authClient.organization.setActive({
        organizationId,
      });
    }
  },
});

function RouteComponent() {
  return <div>Dashboard</div>;
}
