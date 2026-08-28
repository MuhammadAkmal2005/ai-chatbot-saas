import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Statuses that mean "this user should have Pro access."
const PRO_STATUSES = new Set(["active", "trialing", "past_due"]);

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get("paddle-signature");
  const secret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("PADDLE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (!signatureHeader || !isValidSignature(rawBody, signatureHeader, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventType: string = payload.event_type;

  if (!eventType?.startsWith("subscription.")) {
    return NextResponse.json({ received: true });
  }

  const data = payload.data ?? {};
  const userId: string | undefined = data.custom_data?.user_id;

  if (!userId) {
    // Not one of our checkouts (missing custom data) — ignore quietly.
    return NextResponse.json({ received: true });
  }

  const status: string = data.status;
  const plan = PRO_STATUSES.has(status) ? "pro" : "free";
  const currentPeriodEnd = data.current_billing_period?.ends_at ?? null;

  const supabase = createAdminClient();
  const { error } = await supabase.from("subscriptions").upsert({
    user_id: userId,
    plan,
    status,
    paddle_customer_id: String(data.customer_id ?? ""),
    paddle_subscription_id: String(data.id ?? ""),
    current_period_end: currentPeriodEnd,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to update subscription:", error);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// Paddle's signature header looks like: "ts=1671552777;h1=<hex digest>"
// The digest is HMAC-SHA256 of `${ts}:${rawBody}` using the webhook secret.
function isValidSignature(rawBody: string, header: string, secret: string) {
  const parts = Object.fromEntries(
    header.split(";").map((part) => part.split("=") as [string, string])
  );
  const timestamp = parts.ts;
  const receivedHash = parts.h1;

  if (!timestamp || !receivedHash) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}:${rawBody}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(receivedHash, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) return false;

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}