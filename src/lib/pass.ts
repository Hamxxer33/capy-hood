export type Tier = "gdt" | "wl";

export type HoodPass = {
  id: string;
  handle: string;
  wallet: string;
  discord: string;
  tier: Tier;
  why: string;
  favorite: string;
  vibeScore: number | null;
  createdAt: string;
  status: "pending";
};

const PASS_KEY = "capy-hood-pass";
const SPOTS_KEY = "capy-hood-spots-v2";

const GDT_REMAINING_SEED = 127;
const WL_REMAINING_SEED = 504;

export type Spots = { gdt: number; wl: number };

export function generatePassId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "CH-";
  for (let i = 0; i < 4; i += 1) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return id;
}

export function loadPass(): HoodPass | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PASS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as HoodPass;
  } catch {
    return null;
  }
}

export function savePass(pass: HoodPass): void {
  window.localStorage.setItem(PASS_KEY, JSON.stringify(pass));
}

export function clearPass(): void {
  window.localStorage.removeItem(PASS_KEY);
}

export function loadSpots(): Spots {
  if (typeof window === "undefined") {
    return { gdt: GDT_REMAINING_SEED, wl: WL_REMAINING_SEED };
  }
  try {
    const raw = window.localStorage.getItem(SPOTS_KEY);
    if (raw) return JSON.parse(raw) as Spots;
  } catch {
    /* ignore */
  }
  return { gdt: GDT_REMAINING_SEED, wl: WL_REMAINING_SEED };
}

export function takeSpot(tier: Tier): Spots {
  const current = loadSpots();
  const next: Spots = {
    gdt: tier === "gdt" ? Math.max(0, current.gdt - 1) : current.gdt,
    wl: tier === "wl" ? Math.max(0, current.wl - 1) : current.wl,
  };
  window.localStorage.setItem(SPOTS_KEY, JSON.stringify(next));
  return next;
}

export function restoreSpot(tier: Tier): Spots {
  const current = loadSpots();
  const next: Spots = {
    gdt: tier === "gdt" ? current.gdt + 1 : current.gdt,
    wl: tier === "wl" ? current.wl + 1 : current.wl,
  };
  window.localStorage.setItem(SPOTS_KEY, JSON.stringify(next));
  return next;
}

export function recommendTier(score: number): Tier {
  return score >= 9 ? "gdt" : "wl";
}
