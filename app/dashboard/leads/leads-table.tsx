"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import type { Lead } from "@/lib/types";

type Props = {
  leads: Lead[];
};

export function LeadsTable({ leads }: Props) {
  const [query, setQuery] = useState("");

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return leads;
    return leads.filter((lead) =>
      [lead.name, lead.email, lead.phone, lead.chatbot_name]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(normalized))
    );
  }, [leads, query]);

  function exportCsv() {
    const header = ["Name", "Email", "Phone", "Chatbot Name", "Date Captured"];
    const rows = filteredLeads.map((lead) => [
      lead.name ?? "",
      lead.email ?? "",
      lead.phone ?? "",
      lead.chatbot_name,
      formatDate(lead.created_at),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-6 rounded-xl border border-surface-2 bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-2 px-4 py-3">
        <p className="text-sm text-muted">
          {filteredLeads.length} of {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search leads..."
              className="w-48 rounded-xl border border-surface-2 bg-ink py-1.5 pl-9 pr-3 text-sm text-cloud outline-none focus:ring-2 focus:ring-amber"
            />
          </div>
          <button
            type="button"
            onClick={exportCsv}
            disabled={filteredLeads.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-surface-2 px-3 py-1.5 text-sm font-medium text-cloud hover:bg-surface-2 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2/40 text-xs font-semibold uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Chatbot Name</th>
              <th className="px-4 py-3">Date Captured</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted">
                  {leads.length === 0
                    ? "No leads captured yet."
                    : `No leads match "${query}".`}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-surface-2">
                  <td className="px-4 py-3 text-cloud">{lead.name || "—"}</td>
                  <td className="px-4 py-3 text-muted">{lead.email || "—"}</td>
                  <td className="px-4 py-3 text-muted">{lead.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted">{lead.chatbot_name}</td>
                  <td className="px-4 py-3 text-muted">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}