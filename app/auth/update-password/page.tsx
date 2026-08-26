"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function UpdatePasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const supabase = createClient();

    if (!code) {
      setVerifyError("This link is invalid or has expired. Request a new one from Settings.");
      setVerifying(false);
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => {
      if (exchangeError) {
        setVerifyError("This link is invalid or has expired. Request a new one from Settings.");
      }
      setVerifying(false);
    });
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/dashboard/settings");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 text-cloud">
      <div className="w-full max-w-md rounded-2xl border border-surface-2 bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl text-cloud">Set a new password</h1>

        {verifying ? (
          <p className="mt-4 text-sm text-muted">Verifying your link...</p>
        ) : verifyError ? (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {verifyError}
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

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={null}>
      <UpdatePasswordInner />
    </Suspense>
  );
}