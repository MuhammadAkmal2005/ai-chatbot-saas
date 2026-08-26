import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChangePasswordForm } from "./change-password-form";
import { UpgradeButton } from "./upgrade-button";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { upgraded?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", user.id)
    .maybeSingle();

  const plan = subscription?.plan === "pro" ? "Pro" : "Free";

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-cloud">Settings</h1>
      <p className="mt-2 text-sm text-muted">
        Manage your account and workspace.
      </p>

      {searchParams.upgraded === "true" && (
        <p className="mt-6 rounded-xl bg-signal/10 px-4 py-3 text-sm text-signal">
          Thanks for upgrading! It can take a minute for Pro to activate —
          refresh this page if it still shows Free.
        </p>
      )}

      <section className="mt-8 rounded-xl border border-surface-2 bg-surface p-6">
        <h2 className="font-display text-lg text-cloud">Account</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted">Email</dt>
            <dd className="text-cloud">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Plan</dt>
            <dd>
              <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-cloud">
                {plan}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-xl border border-surface-2 bg-surface p-6">
        <h2 className="font-display text-lg text-cloud">Password</h2>
        <p className="mt-1 text-sm text-muted">
          We&apos;ll email you a secure link to set a new password.
        </p>
        <ChangePasswordForm email={user.email ?? ""} />
      </section>

      <section className="mt-6 rounded-xl border border-surface-2 bg-surface p-6">
        <h2 className="font-display text-lg text-cloud">Billing</h2>
        {plan === "Pro" ? (
          <p className="mt-1 text-sm text-muted">
            You&apos;re on the Pro plan. To cancel or update payment details,
            use the link in your Lemon Squeezy receipt email.
          </p>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">
              You&apos;re on the Free plan. Upgrade to Pro for unlimited
              chatbots and conversations.
            </p>
            <UpgradeButton userId={user.id} email={user.email ?? ""} />
          </>
        )}
      </section>
    </div>
  );
}