import { Module } from "@/core/bases/module";
import { UsersController } from "./users.controller";

export class UsersModule extends Module {
  protected controllers() {
    return [UsersController];
  }
}
