import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

// This route is the target of the links Supabase emails out (signup
// confirmation, password recovery). It uses verifyOtp with a token_hash
// instead of the PKCE exchangeCodeForSession flow, because email links
// are routinely opened in a different browser/app than the one that
// requested them (Gmail app, Outlook, etc.) — PKCE requires a secret
// stored in that original browser, so it fails in exactly that common
// case. token_hash verification has no such requirement.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      redirect(next);
    }
  }

  redirect("/login?error=invalid_link");
}