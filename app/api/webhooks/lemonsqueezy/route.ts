import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Events that mean "this user should have Pro access."
const PRO_STATUSES = new Set(["active", "on_trial"]);

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (!signature || !isValidSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName: string = payload.meta?.event_name;
  const userId: string | undefined = payload.meta?.custom_data?.user_id;

  if (!userId) {
    // Not one of our checkouts (missing custom data) — ignore quietly.
    return NextResponse.json({ received: true });
  }

  if (!eventName?.startsWith("subscription_")) {
    return NextResponse.json({ received: true });
  }

  const attributes = payload.data?.attributes ?? {};
  const status: string = attributes.status;
  const plan = PRO_STATUSES.has(status) ? "pro" : "free";

  const supabase = createAdminClient();
  const { error } = await supabase.from("subscriptions").upsert({
    user_id: userId,
    plan,
    status,
    lemonsqueezy_customer_id: String(attributes.customer_id ?? ""),
    lemonsqueezy_subscription_id: String(payload.data?.id ?? ""),
    current_period_end: attributes.renews_at ?? attributes.ends_at ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to update subscription:", error);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

function isValidSignature(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}