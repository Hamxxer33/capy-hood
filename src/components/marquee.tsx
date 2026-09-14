import { HOOD } from "@/data/hood";

export function HoodMarquee() {
  const loop = [...HOOD, ...HOOD];

  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-b border-border bg-surface py-3"
    >
      <div className="marquee-track flex w-max gap-3">
        {loop.map((member, i) => (
          <img
            key={`${member.id}-${i}`}
            src={member.src}
            alt=""
            className="hood-pfp size-20 rounded-md object-cover sm:size-24"
          />
        ))}
      </div>
    </section>
  );
}
