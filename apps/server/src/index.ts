import { env } from "@soma/env"
import { createApp } from "./http/app"

const app = createApp()

app.listen({ hostname: env.HOST, port: env.PORT })

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
