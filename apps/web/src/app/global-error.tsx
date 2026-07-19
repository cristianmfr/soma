"use client";

import "@soma/ui/globals.css";

import { Button } from "@soma/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error);
      });
    }
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md px-4 text-center">
            <h2 className="mb-4 font-medium">Ocorreu um erro</h2>
            <p className="mb-6 text-[#878787] text-sm">
              Fomos informados e estamos analisando o caso.
              <br />
              Se o problema persistir, entre em contato com nossa equipe de
              suporte.
            </p>

            {error.digest && (
              <p className="mt-4 text-[#4a4a4a] text-xs">
                Error ID: {error.digest}
              </p>
            )}

            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-6"
            >
              Recarregar página
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
