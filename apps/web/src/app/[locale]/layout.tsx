import "@soma/ui/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const fontSans = Inter({
  display: "swap",
  variable: "--font-sans",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Soma",
    default: "Soma",
  },
};

interface RootLayoutProps extends React.PropsWithChildren {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html
      lang={locale ?? "en"}
      className={`${fontSans.variable} font-sans antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale ?? "en"}>{children}</Providers>
      </body>
    </html>
  );
}
