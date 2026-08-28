import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", user.id)
    .maybeSingle();

  // We don't have a Paddle cancellation API wired up yet — only
  // the webhook that reacts to cancellations. Deleting the account while
  // a paid subscription is still active would leave billing running with
  // no account left to manage it from. Block until it's cancelled first.
  if (subscription?.plan === "pro" && subscription.status === "active") {
    return NextResponse.json(
      {
        error:
          "You have an active Pro subscription. Cancel it first from your Paddle receipt email, then come back to delete your account.",
      },
      { status: 400 }
    );
  }

  const { data: ownedChatbots } = await supabase
    .from("chatbots")
    .select("id")
    .eq("user_id", user.id);

  const chatbotIds = (ownedChatbots ?? []).map((row: { id: string }) => row.id);

  if (chatbotIds.length > 0) {
    await supabase.from("chat_logs").delete().in("chatbot_id", chatbotIds);
    await supabase.from("leads").delete().in("chatbot_id", chatbotIds);
    await supabase.from("chatbots").delete().in("id", chatbotIds);
  }

  await supabase.from("subscriptions").delete().eq("user_id", user.id);

  const admin = createAdminClient();
  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}