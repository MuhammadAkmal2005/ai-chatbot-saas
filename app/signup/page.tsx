"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink px-4 text-cloud">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-surface-2 bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl text-cloud">Create an account</h1>
        <p className="mt-2 text-sm text-muted">
          Start adding an AI chatbot to your website for free.
        </p>

        {success ? (
          <p className="mt-8 rounded-xl border border-surface-2 bg-ink px-4 py-3 text-sm text-cloud">
            Check your email to confirm your account.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cloud">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-surface-2 bg-ink px-3 py-2 text-cloud outline-none ring-amber focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cloud">
                Password
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
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-amber hover:brightness-110">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}