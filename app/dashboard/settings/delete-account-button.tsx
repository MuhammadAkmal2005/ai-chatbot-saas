"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DeleteAccountButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/account/delete", { method: "POST" });
    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(data.error ?? "Something went wrong.");
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
      >
        Delete account
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
      <p className="text-sm font-medium text-cloud">This cannot be undone.</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
        <li>All your chatbots and their embeds will stop working immediately.</li>
        <li>All captured leads and chat history will be permanently deleted.</li>
        <li>Any active subscription must be cancelled first, or this will be blocked.</li>
      </ul>
      <p className="mt-3 text-sm text-muted">
        Type <strong className="text-cloud">DELETE</strong> to confirm.
      </p>
      <input
        type="text"
        value={confirmText}
        onChange={(event) => setConfirmText(event.target.value)}
        className="mt-2 w-full max-w-xs rounded-xl border border-surface-2 bg-ink px-3 py-2 text-sm text-cloud outline-none focus:ring-2 focus:ring-red-500"
      />

      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={confirmText !== "DELETE" || loading}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Permanently delete my account"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setConfirmText("");
            setError(null);
          }}
          disabled={loading}
          className="rounded-xl border border-surface-2 px-4 py-2 text-sm font-medium text-cloud hover:bg-surface-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}