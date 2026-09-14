import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-md bg-raised px-3.5 text-sm text-fg shadow-[0_0_0_1px_rgba(243,237,227,0.1)] placeholder:text-subtle transition-[box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
