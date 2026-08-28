"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Chatbot } from "@/lib/types";

type ChatbotSummary = Pick<Chatbot, "id" | "name" | "is_active">;

export function ChatbotsList({ chatbots }: { chatbots: ChatbotSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return chatbots;
    return chatbots.filter((chatbot) =>
      chatbot.name.toLowerCase().includes(normalized)
    );
  }, [chatbots, query]);

  return (
    <div>
      {chatbots.length > 3 && (
        <div className="relative mt-6 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chatbots..."
            className="w-full rounded-xl border border-surface-2 bg-surface py-2 pl-9 pr-3 text-sm text-cloud outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No chatbots match &quot;{query}&quot;.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((chatbot) => (
            <li
              key={chatbot.id}
              className="rounded-xl border border-surface-2 bg-surface p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-cloud">{chatbot.name}</h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    chatbot.is_active
                      ? "bg-signal/10 text-signal"
                      : "bg-surface-2 text-muted"
                  }`}
                >
                  {chatbot.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <Link
                href={`/dashboard/chatbots/${chatbot.id}`}
                className="mt-4 inline-flex text-sm font-medium text-amber hover:brightness-110"
              >
                Manage
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}