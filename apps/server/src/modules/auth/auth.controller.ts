import { Controller } from "@/core/bases/controller";
import { auth } from "@/shared/auth";

export class AuthController extends Controller {
  constructor() {
    super("");
  }

  protected registerRoutes(): void {
    this.router.mount(auth.handler);
  }
}
