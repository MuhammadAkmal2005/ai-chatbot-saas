import type { SupabaseClient } from "@supabase/supabase-js";

// Keep this in sync with the pricing copy on the landing page.
export const FREE_MONTHLY_MESSAGE_LIMIT = 100;

export async function getUserPlan(
  supabase: SupabaseClient,
  userId: string
): Promise<"free" | "pro"> {
  const { data } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.plan === "pro" ? "pro" : "free";
}

/**
 * Counts user messages sent across ALL of a user's chatbots so far this
 * calendar month (UTC). The limit is per-account, not per-chatbot, since
 * that's what the pricing page promises.
 */
export async function getMonthlyMessageCount(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { data: ownedChatbots } = await supabase
    .from("chatbots")
    .select("id")
    .eq("user_id", userId);

  const chatbotIds = (ownedChatbots ?? []).map((row: { id: string }) => row.id);

  if (chatbotIds.length === 0) {
    return 0;
  }

  const now = new Date();
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  ).toISOString();

  const { count } = await supabase
    .from("chat_logs")
    .select("id", { count: "exact", head: true })
    .in("chatbot_id", chatbotIds)
    .eq("role", "user")
    .gte("created_at", startOfMonth);

  return count ?? 0;
}