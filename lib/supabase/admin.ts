import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// SERVER-SIDE ONLY. Never import this in a Client Component or expose
// SUPABASE_SERVICE_ROLE_KEY to the browser — it bypasses Row Level
// Security entirely. Used only by the Paddle webhook to update
// a user's plan after we've verified the request really came from
// Paddle.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}