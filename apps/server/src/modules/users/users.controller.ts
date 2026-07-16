import { Controller } from "@/core/bases/controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { listOrganizationsResponse } from "./users.schema";
import { UsersService } from "./users.service";

export class UsersController extends Controller {
  private usersService = UsersService.getInstance();

  constructor() {
    super("/users");
  }

  protected registerRoutes(): void {
    this.router.use(authMiddleware).get(
      "/me/organizations",
      async (ctx) => {
        const userId = ctx.user.id;

        const result = await this.usersService.listOrganizations(userId);

        return ctx.status(200, result);
      },
      {
        requireAuth: true,
        response: {
          200: listOrganizationsResponse,
        },
      },
    );
  }
}
