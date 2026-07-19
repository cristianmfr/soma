"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { magicLink } from "@/lib/auth"

export default function Page() {
  const { locale, auth } = useParams<{ locale: string; auth: string[] }>()
  const router = useRouter()
  const verifying = useRef(false)

  const method = auth[0]
  const token = auth[1]

  useEffect(() => {
    const isValidMethod = method === "login" || method === "signup"

    if (!token && isValidMethod) {
      router.replace(`/${locale}/login`)
      return
    }

    if (verifying.current) {
      return
    }
    verifying.current = true

    magicLink
      .verify({
        query: {
          token,
        },
        fetchOptions: {
          credentials: "include",
        },
      })
      .then(({ error }) => {
        router.replace(error ? `/${locale}/login` : `/${locale}`)
      })
  }, [token, locale, router])

  return null
}
