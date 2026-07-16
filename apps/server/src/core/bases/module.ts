import { Elysia } from "elysia";
import { Controller } from "./controller";

type ControllerConstructor = new () => Controller;

export abstract class Module {
  public readonly module: Elysia;

  constructor() {
    this.module = new Elysia();

    this.registerControllers();
  }

  protected abstract controllers(): ControllerConstructor[];

  private registerControllers() {
    for (const Controller of this.controllers()) {
      const controller = new Controller();

      this.module.use(controller.router);
    }
  }
}
