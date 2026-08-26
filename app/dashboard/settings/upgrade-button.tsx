"use client";

import { buildProCheckoutUrl } from "@/lib/lemonsqueezy";

export function UpgradeButton({ userId, email }: { userId: string; email: string }) {
  function handleClick() {
    window.location.href = buildProCheckoutUrl(userId, email);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-4 rounded-xl bg-amber-solid px-4 py-2 text-sm font-semibold text-ink-solid hover:brightness-95"
    >
      Upgrade to Pro
    </button>
  );
}