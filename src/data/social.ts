export const X_HANDLE = "CapyonHood";
export const X_PROFILE_URL = "https://x.com/CapyonHood";

/** Swap this to the raid post when you have it, e.g. https://x.com/CapyonHood/status/123 */
export const X_POST_URL = "https://x.com/CapyonHood";

export const FORM_ID =
  "1FAIpQLSflPZYnkgmp9a5gi9gFEQ5iyAwhv-9fUQ98M9jqGFRJMZPZOQ";
export const FORM_RESPONSE_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
export const FORM_WALLET_ENTRY = "entry.2133641761";
export const FORM_HANDLE_ENTRY = "entry.524303953";

export function tweetIdFromUrl(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
}

export function xTaskHref(kind: "follow" | "like" | "comment" | "repost"): string {
  const tweetId = tweetIdFromUrl(X_POST_URL);
  if (kind === "follow") {
    return `https://x.com/intent/follow?screen_name=${X_HANDLE}`;
  }
  if (!tweetId) return X_POST_URL;
  if (kind === "like") return `https://x.com/intent/like?tweet_id=${tweetId}`;
  if (kind === "repost") return `https://x.com/intent/retweet?tweet_id=${tweetId}`;
  return `https://x.com/intent/tweet?in_reply_to=${tweetId}`;
}

export function googleFormBody(wallet: string, handle: string): URLSearchParams {
  return new URLSearchParams({
    [FORM_WALLET_ENTRY]: wallet,
    [FORM_HANDLE_ENTRY]: handle,
    submit: "Submit",
  });
}

/** Posts wallet + handle into the Google Form. The visitor never leaves this page. */
export async function submitToGoogleForm(wallet: string, handle: string) {
  const body = googleFormBody(wallet, handle);
  try {
    const blob = new Blob([body.toString()], {
      type: "application/x-www-form-urlencoded",
    });
    navigator.sendBeacon(FORM_RESPONSE_URL, blob);
  } catch {
    /* sendBeacon can throw if the payload is rejected; fetch still runs */
  }
  await Promise.race([
    fetch(FORM_RESPONSE_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }).catch(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 500);
    }),
  ]);
}

export const X_TASKS = [
  {
    id: "follow" as const,
    label: "Follow",
    detail: `@${X_HANDLE}`,
  },
  {
    id: "like" as const,
    label: "Like",
    detail: "the raid post",
  },
  {
    id: "comment" as const,
    label: "Comment",
    detail: "drop a vibe on the post",
  },
  {
    id: "repost" as const,
    label: "Repost",
    detail: "spread the hood",
  },
];
