import { Badge } from "@/components/ui/badge";

const LINES = [
  {
    kicker: "01",
    title: "No token",
    body: "There is no ticker. No chart to refresh. No promised utility hiding behind a cute animal. The hood is the product.",
  },
  {
    kicker: "02",
    title: "Just vibe",
    body: "Life is too loud. These 3,000 capys were drawn to sit still. If you need a roadmap to feel something, this is not your meadow.",
  },
  {
    kicker: "03",
    title: "Drawn, not generated",
    body: "Pixel faces with thick ink. Hats, visors, cigars, rain. Every capy is a person in the hood — not a trait spreadsheet with a smile.",
  },
  {
    kicker: "04",
    title: "Mint when warm",
    body: "Robinhood Chain. OpenSea when we say so. GDT mints guaranteed. WL is first-come. Public gets the leftovers. Nobody is owed a floor.",
  },
];

const FAQS = [
  {
    q: "Is there a token?",
    a: "No. The line is the policy: no token, just vibe.",
  },
  {
    q: "What is GDT vs WL?",
    a: "GDT is guaranteed — 300 spots, you mint. WL is 900 spots, first-come when mint opens. Public is everyone else.",
  },
  {
    q: "What chain?",
    a: "Robinhood Chain. Listing planned on OpenSea. Contract drops with the mint — not before.",
  },
  {
    q: "How many?",
    a: "3,000. That's the whole hood. No extras, no team dump dressed as a treasury.",
  },
  {
    q: "Do I need a wallet to apply?",
    a: "No. X handle is enough. Wallet can come later. Capys are too lazy for extra paperwork.",
  },
  {
    q: "When is mint?",
    a: "When the water is warm. Follow @CapyonHood or join t.me/capyhoodnft. We will not fake a countdown.",
  },
];

export function Manifesto() {
  return (
    <>
      <section id="manifesto" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Badge tone="outline">Manifesto</Badge>
          <h2 className="mt-4 max-w-2xl font-display text-5xl tracking-wide text-fg sm:text-7xl">
            No token.
            <br />
            Just vibe.
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Capy Hood is a collection of 3,000 pixel-drawn capybaras. Not a
            coin. Not a DAO. A hood of faces that would rather sit in the
            water than explain themselves.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {LINES.map((line) => (
              <article key={line.kicker} className="bg-bg p-6 sm:p-8">
                <p className="text-xs uppercase tracking-widest text-subtle">
                  {line.kicker}
                </p>
                <h3 className="mt-3 font-display text-3xl tracking-wide text-fg">
                  {line.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {line.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-subtle">FAQ</p>
          <h2 className="mt-2 font-display text-5xl tracking-wide text-fg">
            The lazy answers
          </h2>
          <div className="mt-10 divide-y divide-border">
            {FAQS.map((item) => (
              <div
                key={item.q}
                className="grid gap-2 py-6 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
              >
                <h3 className="text-base font-medium text-fg">{item.q}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
