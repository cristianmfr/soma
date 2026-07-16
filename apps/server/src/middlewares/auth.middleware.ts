import { Elysia } from "elysia";
import { auth } from "@/shared/auth";

export const authMiddleware = new Elysia({ name: "auth-middleware" })
  .mount(auth.handler)
  .macro({
    requireAuth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({ headers });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
    requireOrganization: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({ headers });

        if (!session) return status(401);

        if (session.session.activeOrganizationId) {
          return {
            user: session.user,
            session: session.session,
          };
        }

        const organizations = await auth.api.listOrganizations({ headers });

        if (organizations.length === 0) {
          return status(403, { error: "onboarding_required" });
        }

        await auth.api.setActiveOrganization({
          headers,
          body: { organizationId: organizations[0]?.id },
        });

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
