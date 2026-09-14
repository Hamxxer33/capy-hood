import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOOD } from "@/data/hood";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#hood", label: "The Hood" },
  { href: "#tiers", label: "Tiers" },
  { href: "#apply", label: "Apply" },
  { href: "#manifesto", label: "Manifesto" },
];

export function SiteHeader({ hasPass }: { hasPass: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={HOOD[0].src}
            alt=""
            className="hood-pfp size-8 rounded-sm object-cover"
          />
          <span className="font-display text-2xl tracking-wide text-fg">
            CAPY HOOD
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#apply">{hasPass ? "Your pass" : "Apply"}</a>
          </Button>
        </nav>

        <button
          type="button"
          className="relative flex size-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-11 items-center text-sm text-fg"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-2 w-full" onClick={() => setOpen(false)}>
            <a href="#apply">{hasPass ? "Your pass" : "Apply"}</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
