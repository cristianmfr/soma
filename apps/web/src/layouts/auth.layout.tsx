import { Outlet } from "@tanstack/react-router";

export function AuthLayout() {
  return (
    <div className="flex h-dvh w-full flex-1 flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
