"use client";

import { useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

/**
 * Setup required in your Paddle dashboard:
 * 1. Create a Product with a recurring Price (e.g. "Pro Monthly").
 * 2. Copy the Price ID (starts with pri_) into NEXT_PUBLIC_PADDLE_PRICE_ID.
 * 3. Developer Tools -> Authentication -> copy a Client-side token
 *    (starts with test_ in sandbox, live_ in production) into
 *    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN.
 * 4. Set NEXT_PUBLIC_PADDLE_ENVIRONMENT to "sandbox" while testing,
 *    "production" once your Paddle account is fully approved and live.
 */
export function UpgradeButton({ userId, email }: { userId: string; email: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
    const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as
      | "sandbox"
      | "production"
      | undefined;

    if (!token || !priceId) {
      alert("Billing isn't configured yet. Check back soon.");
      return;
    }

    setLoading(true);
    const paddle: Paddle | undefined = await initializePaddle({
      token,
      environment: environment ?? "sandbox",
    });
    setLoading(false);

    if (!paddle) {
      alert("Couldn't load checkout. Please try again in a moment.");
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email },
      customData: { user_id: userId },
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="mt-4 rounded-xl bg-amber-solid px-4 py-2 text-sm font-semibold text-ink-solid hover:brightness-95 disabled:opacity-60"
    >
      {loading ? "Loading checkout..." : "Upgrade to Pro"}
    </button>
  );
}