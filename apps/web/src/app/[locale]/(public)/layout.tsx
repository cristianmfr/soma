import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full min-h-dvh w-full flex-1 flex-col items-center justify-center bg-linear-to-b from-input/40 to-background">
      {children}
    </div>
  );
}
