import Elysia from "elysia"

export const getHealth = new Elysia().get("/", async () => {
  return "OK"
})
