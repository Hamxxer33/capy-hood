import { useState } from "react";
import { HOOD, type Member } from "@/data/hood";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function HoodGallery() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <section id="hood" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-subtle">
              The hood
            </p>
            <h2 className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-6xl">
              Faces of the meadow
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Eleven of 3,000. Pixel-drawn. Thick outlines. Zero utility pitch.
            Click a capy. Stay a while.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {HOOD.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setActive(member)}
              className="group rounded-xl bg-surface p-1.5 text-left transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={member.src}
                className="hood-pfp aspect-square w-full rounded-lg object-cover"
                alt=""
              />
              <div className="flex items-baseline justify-between gap-2 px-1.5 pt-3 pb-1.5">
                <span className="text-sm font-medium text-fg">{member.name}</span>
                <span className="truncate text-xs text-subtle">{member.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          {active ? (
            <div className="grid gap-4 sm:grid-cols-[minmax(0,14rem)_1fr]">
              <img
                src={active.src}
                alt={active.name}
                className="hood-pfp aspect-square w-full rounded-lg object-cover"
              />
              <div className="pr-8">
                <Badge tone="outline">{active.role}</Badge>
                <DialogTitle className="mt-3">{active.name}</DialogTitle>
                <DialogDescription className="mt-2 text-base text-fg">
                  “{active.quote}”
                </DialogDescription>
                <ul className="mt-5 grid grid-cols-2 gap-3">
                  {active.traits.map((trait) => (
                    <li key={trait.label}>
                      <p className="text-xs uppercase tracking-widest text-subtle">
                        {trait.label}
                      </p>
                      <p className="mt-0.5 text-sm text-fg">{trait.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
