"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ChangePasswordForm({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleClick() {
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "sending" || status === "sent"}
        className="rounded-xl border border-surface-2 px-4 py-2 text-sm font-medium text-cloud hover:bg-surface-2 disabled:opacity-60"
      >
        {status === "sending"
          ? "Sending..."
          : status === "sent"
            ? "Email sent"
            : "Send reset email"}
      </button>
      {status === "sent" && (
        <p className="mt-2 text-sm text-signal">
          Check {email} for a link to set a new password.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          Something went wrong. Try again in a moment.
        </p>
      )}
    </div>
  );
}