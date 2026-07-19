import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full min-h-dvh w-full flex-1 flex-col">
      {children}
    </div>
  );
}
