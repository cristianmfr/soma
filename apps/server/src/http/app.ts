import { auth } from "@soma/auth"
import Elysia from "elysia"
import { corsConfig } from "@/config/cors"
import { openapiConfig } from "@/config/openapi"
import { getHealth } from "./routes/get-health"

export const createApp = () => {
  const app = new Elysia()

  app.group("/", (app) => app.use(getHealth))

  app.use(corsConfig)
  app.use(openapiConfig)
  app.mount(auth.handler)

  return app
}
