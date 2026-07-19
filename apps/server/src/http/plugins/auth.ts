import { auth as betterAuth } from "@soma/auth";
import { Elysia } from "elysia";

export const auth = new Elysia({ name: "auth-middleware" })
  .mount(betterAuth.handler)
  .macro({
    requireAuth: {
      async resolve({ status, request: { headers } }) {
        const session = await betterAuth.api.getSession({ headers });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
    requireOrganization: {
      async resolve({ status, request: { headers } }) {
        const session = await betterAuth.api.getSession({ headers });

        if (!session) return status(401);

        if (session.session.activeOrganizationId) {
          return {
            user: session.user,
            session: session.session,
          };
        }

        const organizations = await betterAuth.api.listOrganizations({
          headers,
        });

        if (organizations.length === 0) {
          return status(403, { error: "onboarding_required" });
        }

        await betterAuth.api.setActiveOrganization({
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
