"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setHasSession(!!user);
      setCheckingSession(false);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setLoading(false);
      setError(updateError.message);
      return;
    }

    // Deliberately sign out the temporary recovery session instead of
    // forwarding into the dashboard. Email links shouldn't silently log
    // someone into the full app — the person should log in fresh with
    // their new password, same as any professional product.
    await supabase.auth.signOut();
    setLoading(false);
    setDone(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 text-cloud">
      <div className="w-full max-w-md rounded-2xl border border-surface-2 bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl text-cloud">Set a new password</h1>

        {checkingSession ? (
          <p className="mt-4 text-sm text-muted">Checking your link...</p>
        ) : done ? (
          <div className="mt-6">
            <p className="rounded-xl bg-signal/10 px-4 py-3 text-sm text-signal">
              Your password has been reset.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block w-full rounded-xl bg-amber-solid px-4 py-2.5 text-center text-sm font-semibold text-ink-solid hover:brightness-95"
            >
              Go to login
            </Link>
          </div>
        ) : !hasSession ? (
          <p className="mt-4 text-sm text-red-500" role="alert">
            This link is invalid or has expired. Request a new one from the
            login page.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cloud">
                New password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-xl border border-surface-2 bg-ink px-3 py-2 text-cloud outline-none ring-amber focus:ring-2"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-solid px-4 py-2.5 text-sm font-semibold text-ink-solid hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}