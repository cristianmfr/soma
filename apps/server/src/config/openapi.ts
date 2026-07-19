import openapi from "@elysia/openapi"
import Elysia from "elysia"

export const openapiConfig = new Elysia().use(
  openapi({
    documentation: {
      info: {
        title: "Soma API",
        description: "Soma is a personal finance management platform.",
        version: "v0.0.1",
      },
    },
    path: "/docs",
  }),
)
