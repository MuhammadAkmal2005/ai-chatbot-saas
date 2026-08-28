"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Turnstile } from "@/components/turnstile";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const captchaRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: captchaToken ? { captchaToken } : undefined,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink px-4 text-cloud">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-surface-2 bg-surface p-8 shadow-sm">
        <Link href="/" className="text-sm text-muted hover:text-cloud">
          ← Back to home
        </Link>
        <h1 className="mt-4 font-display text-2xl text-cloud">Log in</h1>
        <p className="mt-2 text-sm text-muted">
          Welcome back. Sign in to manage your chatbots.
        </p>

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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-cloud">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-medium text-amber hover:brightness-110">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-surface-2 bg-ink px-3 py-2 text-cloud outline-none ring-amber focus:ring-2"
            />
          </div>

          <Turnstile onVerify={setCaptchaToken} />

          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || (captchaRequired && !captchaToken)}
            className="w-full rounded-xl bg-amber-solid px-4 py-2.5 text-sm font-semibold text-ink-solid hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-amber hover:brightness-110">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}