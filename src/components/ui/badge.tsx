import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "primary" | "outline";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        tone === "primary" && "bg-primary text-primary-fg",
        tone === "muted" && "bg-raised text-muted",
        tone === "outline" &&
          "text-fg shadow-[0_0_0_1px_rgba(243,237,227,0.16)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
