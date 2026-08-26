"use client";

import { Download } from "lucide-react";
import type { Lead } from "@/lib/types";

type Props = {
  leads: Lead[];
};

export function LeadsTable({ leads }: Props) {
  function exportCsv() {
    const header = ["Name", "Email", "Phone", "Chatbot Name", "Date Captured"];
    const rows = leads.map((lead) => [
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
      <div className="flex items-center justify-between border-b border-surface-2 px-4 py-3">
        <p className="text-sm text-muted">
          {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </p>
        <button
          type="button"
          onClick={exportCsv}
          disabled={leads.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-surface-2 px-3 py-1.5 text-sm font-medium text-cloud hover:bg-surface-2 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
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
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted">
                  No leads captured yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
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