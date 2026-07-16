import { Elysia } from "elysia";

export abstract class Controller {
  public readonly router: Elysia<any>;

  constructor(prefix: string) {
    this.router = new Elysia({
      prefix,
    });

    this.registerRoutes();
  }

  protected abstract registerRoutes(): void;
}
