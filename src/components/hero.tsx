import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOOD, STATS } from "@/data/hood";
import { X_PROFILE_URL } from "@/data/social";
import { cn } from "@/lib/utils";

const FEATURED = [
  { member: HOOD[0], tilt: "-rotate-3", float: "float-card" },
  { member: HOOD[2], tilt: "rotate-3", float: "float-card-slow" },
  { member: HOOD[4], tilt: "rotate-2", float: "float-card-delay" },
  { member: HOOD[8], tilt: "-rotate-2", float: "float-card" },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="hero-wash absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <div
            className="stagger-in flex flex-wrap items-center gap-2"
            style={{ animationDelay: "0ms" }}
          >
            <Badge tone="primary">WL + GDT open</Badge>
            <Badge tone="outline">3,000 capys</Badge>
            <Badge tone="muted">Mint TBA</Badge>
          </div>

          <h1
            className="stagger-in mt-6 font-display text-7xl leading-[0.85] tracking-wide text-fg sm:text-8xl lg:text-9xl"
            style={{ animationDelay: "80ms" }}
          >
            CAPY
            <br />
            HOOD
          </h1>

          <p
            className="stagger-in mt-5 max-w-md text-lg text-muted"
            style={{ animationDelay: "160ms" }}
          >
            No token. Just vibe. A pixel-drawn crew of the calmest capybaras
            on Robinhood Chain — coming to OpenSea when the water is warm.
          </p>

          <div
            className="stagger-in mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button asChild size="lg">
              <a href="#apply">
                Apply for GDT
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://t.me/capyhoodnft"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Follow the hood
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md grid-cols-2 gap-5 lg:grid">
          {FEATURED.map(({ member, tilt, float }) => (
            <div key={member.id} className={tilt}>
              <img
                src={member.src}
                alt={member.name}
                className={cn(
                  "hood-pfp aspect-square w-full rounded-xl object-cover shadow-[var(--shadow-lift)]",
                  float,
                )}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 lg:hidden">
          {HOOD.slice(0, 3).map((member) => (
            <img
              key={member.id}
              src={member.src}
              alt={member.name}
              className="hood-pfp aspect-square w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-5 sm:px-6">
              <p className="font-display text-3xl tracking-wide text-primary tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-subtle">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
