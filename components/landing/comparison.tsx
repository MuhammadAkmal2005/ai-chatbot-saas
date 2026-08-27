"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "./reveal";

const rows = [
  { label: "Availability", without: "Business hours only", with: "24 hours a day, every day" },
  { label: "Response time", without: "Minutes to hours (if you catch it)", with: "Instant" },
  { label: "Setup time", without: "Weeks, with a dev or agency", with: "About 2 minutes" },
  { label: "Missed leads", without: "Common, especially overnight", with: "Captured automatically" },
  { label: "Monthly cost", without: "A support hire's salary", with: "Free to start" },
];

export function Comparison() {
  return (
    <section className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <h2 className="text-center font-display text-2xl text-cloud sm:text-3xl">
            What changes when you add it
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-xl border border-surface-2 bg-surface">
            <div className="grid grid-cols-3 border-b border-surface-2 text-sm font-semibold text-cloud">
              <div className="p-4"></div>
              <div className="p-4 text-muted">Without</div>
              <div className="p-4 text-amber">With Chatbot SaaS</div>
            </div>
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 border-b border-surface-2 text-sm last:border-b-0"
              >
                <div className="p-4 font-medium text-cloud">{row.label}</div>
                <div className="flex items-start gap-2 p-4 text-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  {row.without}
                </div>
                <div className="flex items-start gap-2 p-4 text-cloud">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  {row.with}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
