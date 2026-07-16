import { Module } from "@/core/bases/module";
import { AuthController } from "./auth.controller";

export class AuthModule extends Module {
  protected controllers() {
    return [AuthController];
  }
}
