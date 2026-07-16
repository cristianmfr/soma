import { z } from "zod";
import { authClient } from "@/shared/auth-client";

export const createInitialOrganizationSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

type Request = z.infer<typeof createInitialOrganizationSchema>;

export async function createInitialOrganization({ name, slug }: Request) {
  return await authClient.organization.create({
    name,
    slug,
  });
}
