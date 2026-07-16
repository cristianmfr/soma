import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@/shared/auth-client";

export const Route = createFileRoute("/_api/verify-email/$token")({
  loader: async ({ params: { token } }) => {
    const result = await authClient.verifyEmail({
      query: {
        token,
      },
    });

    if (result.data?.status) {
      throw redirect({ to: "/" });
    }
  },
});
