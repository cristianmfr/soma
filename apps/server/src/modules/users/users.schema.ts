import { t } from "elysia";

export const listOrganizationsResponse = t.Object({
  organizations: t.Array(
    t.Object({
      id: t.String(),
      name: t.String(),
      slug: t.String(),
      metadata: t.Optional(t.Nullable(t.Any())),
      createdAt: t.Date(),
      updatedAt: t.Date(),
    }),
  ),
  total: t.Number(),
});
