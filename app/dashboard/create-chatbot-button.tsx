"use client";

import { useFormStatus } from "react-dom";

export function CreateChatbotButton({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "empty";
}) {
  const { pending } = useFormStatus();
  const base =
    variant === "empty"
      ? "inline-flex items-center rounded-xl bg-amber-solid px-5 py-2.5 text-sm font-semibold text-ink-solid shadow-sm hover:brightness-95 disabled:opacity-60"
      : "inline-flex items-center rounded-xl bg-amber-solid px-4 py-2 text-sm font-semibold text-ink-solid shadow-sm hover:brightness-95 disabled:opacity-60";

  return (
    <button type="submit" disabled={pending} className={base}>
      {pending ? "Creating..." : label}
    </button>
  );
}