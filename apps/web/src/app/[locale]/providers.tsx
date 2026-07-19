"use client";

import { Toaster } from "@soma/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next";
import { I18nProviderClient } from "@/lib/i18n/client";
import { queryClient } from "@/lib/react-query";

interface ProvidersProps extends React.PropsWithChildren {
  locale: string;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <I18nProviderClient locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </I18nProviderClient>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
