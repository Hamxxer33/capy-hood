import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Heart,
  MessageCircle,
  Repeat2,
  RotateCcw,
  Shield,
  Ticket,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GDT_CAP, HOOD, WL_CAP } from "@/data/hood";
import {
  submitToGoogleForm,
  X_HANDLE,
  X_TASKS,
  xTaskHref,
} from "@/data/social";
import {
  clearPass,
  generatePassId,
  loadSpots,
  restoreSpot,
  savePass,
  takeSpot,
  type HoodPass,
  type Spots,
  type Tier,
} from "@/lib/pass";
import { cn } from "@/lib/utils";

type TaskId = (typeof X_TASKS)[number]["id"];
type TaskState = Record<TaskId, boolean>;

const TASKS_KEY = "capy-hood-tasks-v1";

const TASK_ICONS = {
  follow: UserPlus,
  like: Heart,
  comment: MessageCircle,
  repost: Repeat2,
} as const;

const EMPTY_TASKS: TaskState = {
  follow: false,
  like: false,
  comment: false,
  repost: false,
};

function loadTasks(): TaskState {
  if (typeof window === "undefined") return EMPTY_TASKS;
  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (!raw) return EMPTY_TASKS;
    return { ...EMPTY_TASKS, ...(JSON.parse(raw) as TaskState) };
  } catch {
    return EMPTY_TASKS;
  }
}

function saveTasks(state: TaskState) {
  window.localStorage.setItem(TASKS_KEY, JSON.stringify(state));
}

export function ApplySection({
  pass,
  onPass,
}: {
  pass: HoodPass | null;
  onPass: (pass: HoodPass | null) => void;
}) {
  const [spots, setSpots] = useState<Spots>({ gdt: 127, wl: 504 });
  const [tasks, setTasks] = useState<TaskState>(EMPTY_TASKS);
  const [handle, setHandle] = useState("");
  const [wallet, setWallet] = useState("");
  const [why, setWhy] = useState("");
  const [favorite, setFavorite] = useState(HOOD[0].id);
  const [tier, setTier] = useState<Tier>("gdt");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setSpots(loadSpots());
    setTasks(loadTasks());
  }, []);

  const doneCount = X_TASKS.filter((t) => tasks[t.id]).length;
  const tasksDone = doneCount === X_TASKS.length;

  function toggleTask(id: TaskId) {
    setTasks((prev) => {
      const next = { ...prev, [id]: true };
      saveTasks(next);
      return next;
    });
    const href = xTaskHref(id);
    window.setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer");
    }, 0);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!tasksDone) {
      setError("Finish the task first — follow, like, comment, and repost.");
      return;
    }

    const cleanHandle = handle.trim().replace(/^@/, "");
    if (!/^[A-Za-z0-9_]{1,15}$/.test(cleanHandle)) {
      setError("Drop a real X handle.");
      return;
    }
    const cleanWallet = wallet.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(cleanWallet)) {
      setError("Wallet is required — a 0x address.");
      return;
    }
    if (spots[tier] <= 0) {
      setError("That list is full. Try the other tier.");
      return;
    }

    setSending(true);
    try {
      await submitToGoogleForm(cleanWallet, cleanHandle);
    } catch {
      setSending(false);
      setError("Couldn't reach the list. Try once more.");
      return;
    }

    const next: HoodPass = {
      id: generatePassId(),
      handle: `@${cleanHandle}`,
      wallet: cleanWallet,
      discord: "",
      tier,
      why: why.trim() || "On the list.",
      favorite,
      vibeScore: null,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    savePass(next);
    setSpots(takeSpot(tier));
    onPass(next);
    setSending(false);
    toast.success("You're on the list. Don't refresh like a degen.");
  }

  function withdraw() {
    if (!pass) return;
    setSpots(restoreSpot(pass.tier));
    clearPass();
    onPass(null);
    toast("Pass withdrawn. The meadow forgets.");
  }

  return (
    <section id="tiers" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs uppercase tracking-widest text-subtle">
          Lists
        </p>
        <h2 className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-6xl">
          GDT and WL
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Two doors. Same hood. GDT is guaranteed. WL is first-come when mint
          opens. Public gets whatever's left. No token attached to either.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <TierCard
            icon={<Shield className="size-4" />}
            name="GDT"
            title="Guaranteed"
            body="300 spots. You mint. No race, no refresh war. A nod from the hood is enough."
            remaining={spots.gdt}
            cap={GDT_CAP}
            featured
          />
          <TierCard
            icon={<Ticket className="size-4" />}
            name="WL"
            title="Whitelist · FCFS"
            body="900 spots. You're on the list. When the meadow opens, first calm hands win."
            remaining={spots.wl}
            cap={WL_CAP}
          />
        </div>
      </div>

      <div id="apply" className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-subtle">
              The task
            </p>
            <h3 className="mt-2 font-display text-4xl tracking-wide text-fg">
              Follow. Like. Comment. Repost.
            </h3>
            <p className="mt-3 text-sm text-muted">
              One task. Four moves on X. Do them all and submit unlocks. We
              match the form against @{X_HANDLE}.
            </p>

            <p className="mt-6 font-display text-3xl tracking-wide text-primary tabular-nums">
              {doneCount} / {X_TASKS.length}
            </p>
            <p className="text-xs uppercase tracking-widest text-subtle">
              {tasksDone ? "Submit is open" : "Submit is locked"}
            </p>

            <ol className="mt-6 space-y-2">
              {X_TASKS.map((task, i) => {
                const Icon = TASK_ICONS[task.id];
                const done = tasks[task.id];
                return (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className={cn(
                        "flex min-h-14 w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left transition-[background-color,box-shadow] duration-150",
                        done
                          ? "bg-primary text-primary-fg"
                          : "bg-raised text-fg shadow-[0_0_0_1px_rgba(243,237,227,0.08)] hover:shadow-[0_0_0_1px_rgba(243,237,227,0.16)]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-md",
                          done ? "bg-primary-fg/10" : "bg-bg",
                        )}
                      >
                        {done ? (
                          <Check className="size-4" />
                        ) : (
                          <Icon className="size-4" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          <span className="mr-2 tabular-nums text-current/60">
                            0{i + 1}
                          </span>
                          {task.label}
                        </span>
                        <span
                          className={cn(
                            "block text-xs",
                            done ? "text-primary-fg/70" : "text-muted",
                          )}
                        >
                          {task.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 opacity-70" />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative rounded-2xl bg-bg p-5 sm:p-6">
            {pass ? (
              <PassCard pass={pass} onWithdraw={withdraw} />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="font-display text-4xl tracking-wide text-fg">
                    Apply
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Finish the task, then drop wallet and handle here. You
                    stay on this page — we send it to the list.
                  </p>
                </div>

                <fieldset className="grid grid-cols-2 gap-2">
                  <legend className="mb-2 text-sm font-medium text-fg">
                    Requested list
                  </legend>
                  {(["gdt", "wl"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={cn(
                        "h-11 rounded-md text-sm font-medium capitalize transition-colors duration-150",
                        tier === t
                          ? "bg-primary text-primary-fg"
                          : "bg-raised text-fg",
                      )}
                    >
                      {t === "gdt" ? "GDT" : "WL"}
                    </button>
                  ))}
                </fieldset>

                <div className="grid gap-2">
                  <Label htmlFor="handle">X handle</Label>
                  <Input
                    id="handle"
                    name="handle"
                    autoComplete="username"
                    placeholder="@capy"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="wallet">Wallet</Label>
                  <Input
                    id="wallet"
                    name="wallet"
                    placeholder="0x…"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    spellCheck={false}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="why">Why the hood? (optional)</Label>
                  <Textarea
                    id="why"
                    name="why"
                    maxLength={280}
                    placeholder="Keep it under a tweet."
                    value={why}
                    onChange={(e) => setWhy(e.target.value)}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-fg">Favorite capy</p>
                  <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-8">
                    {HOOD.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setFavorite(member.id)}
                        aria-label={member.name}
                        aria-pressed={favorite === member.id}
                        className={cn(
                          "overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          favorite === member.id
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-bg"
                            : "opacity-70 hover:opacity-100",
                        )}
                      >
                        <img
                          src={member.src}
                          alt=""
                          className="hood-pfp aspect-square w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {error ? (
                  <p className="text-sm text-danger" role="alert">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!tasksDone || sending}
                >
                  {!tasksDone
                    ? "Finish the task first"
                    : sending
                      ? "Sending…"
                      : `Submit for ${tier === "gdt" ? "GDT" : "WL"}`}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  icon,
  name,
  title,
  body,
  remaining,
  cap,
  featured = false,
}: {
  icon: ReactNode;
  name: string;
  title: string;
  body: string;
  remaining: number;
  cap: number;
  featured?: boolean;
}) {
  const pct = Math.round((remaining / cap) * 100);

  return (
    <article
      className={cn(
        "rounded-2xl p-6",
        featured ? "bg-primary text-primary-fg" : "bg-surface text-fg",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md",
            featured ? "bg-primary-fg/10" : "bg-raised",
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            "font-display text-2xl tracking-wide tabular-nums",
            featured ? "text-primary-fg" : "text-primary",
          )}
        >
          {remaining}
          <span
            className={cn(
              "ml-1 text-base",
              featured ? "text-primary-fg/70" : "text-subtle",
            )}
          >
            / {cap} left
          </span>
        </span>
      </div>
      <h3 className="mt-6 font-display text-4xl tracking-wide">{name}</h3>
      <p
        className={cn(
          "mt-1 text-sm font-medium",
          featured ? "text-primary-fg/80" : "text-muted",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          featured ? "text-primary-fg/80" : "text-muted",
        )}
      >
        {body}
      </p>
      <div
        className={cn(
          "mt-6 h-1.5 overflow-hidden rounded-full",
          featured ? "bg-primary-fg/20" : "bg-raised",
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            featured ? "bg-primary-fg" : "bg-primary",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </article>
  );
}

function PassCard({
  pass,
  onWithdraw,
}: {
  pass: HoodPass;
  onWithdraw: () => void;
}) {
  const capy = HOOD.find((m) => m.id === pass.favorite) ?? HOOD[0];
  const issued = new Date(pass.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        <Check className="size-4 text-primary" />
        <p className="text-xs uppercase tracking-widest text-subtle">
          Hood pass
        </p>
      </div>
      <h3 className="mt-2 font-display text-4xl tracking-wide text-fg">
        You're in the meadow
      </h3>
      <p className="mt-1 text-sm text-muted">
        Wallet and handle are on the list. Screenshot this for the meadow.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl bg-raised p-1.5">
        <div className="grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-[7rem_1fr]">
          <img
            src={capy.src}
            alt={capy.name}
            className="hood-pfp aspect-square w-full rounded-md object-cover"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary">
                {pass.tier === "gdt" ? "GDT" : "WL"}
              </Badge>
              <Badge tone="outline">{pass.status}</Badge>
            </div>
            <p className="mt-3 font-display text-3xl tracking-wide text-primary tabular-nums">
              {pass.id}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">
                  Handle
                </dt>
                <dd className="text-fg">{pass.handle}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">
                  Issued
                </dt>
                <dd className="text-fg tabular-nums">{issued}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">
                  Favorite
                </dt>
                <dd className="text-fg">{capy.name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">
                  Wallet
                </dt>
                <dd className="truncate text-fg">{pass.wallet || "—"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {pass.why && pass.why !== "On the form." ? (
        <p className="mt-4 text-sm text-muted">“{pass.why}”</p>
      ) : null}

      <Button
        type="button"
        variant="outline"
        className="mt-6 w-full"
        onClick={onWithdraw}
      >
        <RotateCcw className="size-4" />
        Withdraw pass
      </Button>
    </div>
  );
}
