import { ArrowUpRight } from "lucide-react";
import { X_HANDLE, X_PROFILE_URL } from "@/data/social";

export function SiteFooter() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl tracking-wide text-fg">
            CAPY HOOD
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            3,000 pixel-drawn capybaras. No token. Just vibe.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a
            href="https://t.me/capyhoodnft"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-fg transition-opacity duration-150 hover:opacity-70"
          >
            t.me/capyhoodnft
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href={X_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-fg transition-opacity duration-150 hover:opacity-70"
          >
            @{X_HANDLE}
            <ArrowUpRight className="size-4" />
          </a>
          <p className="text-subtle">Robinhood Chain · OpenSea soon</p>
        </div>
      </div>
    </footer>
  );
}
