import { Elysia } from "elysia";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/auth.module";

const modules = [AuthModule, UsersModule];

export class AppModule {
  public static register() {
    const app = new Elysia();

    for (const Module of modules) {
      const module = new Module();
      app.use(module.module);
    }

    return app;
  }
}
