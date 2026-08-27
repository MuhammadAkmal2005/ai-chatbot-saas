"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Turnstile } from "@/components/turnstile";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const captchaRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
      captchaToken: captchaToken ?? undefined,
    });

    if (resetError) {
      setError(resetError.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink px-4 text-cloud">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-surface-2 bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl text-cloud">Reset your password</h1>
        <p className="mt-2 text-sm text-muted">
          Enter your account email and we&apos;ll send you a link to set a
          new password.
        </p>

        {status === "sent" ? (
          <p className="mt-6 rounded-xl bg-signal/10 px-4 py-3 text-sm text-signal">
            Check {email} for a link to reset your password.
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

            <Turnstile onVerify={setCaptchaToken} />

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || (captchaRequired && !captchaToken)}
              className="w-full rounded-xl bg-amber-solid px-4 py-2.5 text-sm font-semibold text-ink-solid hover:brightness-95 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-amber hover:brightness-110">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}