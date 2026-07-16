import { db } from "@soma/db";
import { Service } from "@/core/bases/service";

export class UsersService extends Service {
  async listOrganizations(userId: string) {
    const where = {
      members: {
        every: {
          userId,
          role: {
            equals: "owner",
          },
        },
      },
    };

    const [total, organizations] = await Promise.all([
      await db.organization.count({
        where,
      }),
      await db.organization.findMany({
        where,
      }),
    ]);

    return {
      organizations,
      total,
    };
  }
}
