import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChangePasswordForm } from "./change-password-form";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // No billing yet, so every account is on the Free plan for now.
  // Once Paddle/Lemon Squeezy is wired up, this will read a real
  // `plan` column instead of being hardcoded.
  const plan = "Free";

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-cloud">Settings</h1>
      <p className="mt-2 text-sm text-muted">
        Manage your account and workspace.
      </p>

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

      <section className="mt-6 rounded-xl border border-dashed border-surface-2 bg-surface/50 p-6">
        <h2 className="font-display text-lg text-cloud">Billing</h2>
        <p className="mt-1 text-sm text-muted">
          Paid plans and billing management will appear here once Pro
          launches. You&apos;re on the Free plan and won&apos;t be charged
          anything until then.
        </p>
      </section>
    </div>
  );
}