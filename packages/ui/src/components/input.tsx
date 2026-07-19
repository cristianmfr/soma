import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@soma/ui/utils/cn";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-secondary bg-secondary/30 px-3 font-normal text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/75 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
