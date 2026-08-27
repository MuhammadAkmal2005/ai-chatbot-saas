"use client";

import { Sparkles } from "lucide-react";
import { Reveal } from "./reveal";

// Deliberately not a fabricated testimonials section — there are no real
// customers yet, and inventing quotes would be dishonest and could bite
// you legally later. Replace this whole section with real testimonials
// once you have a handful of genuine ones (2–3 is plenty to start).
export function EarlyAccess() {
  return (
    <section className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Reveal>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-amber">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-2xl text-cloud sm:text-3xl">
            We&apos;re just getting started
          </h2>
          <p className="mt-3 text-base text-muted">
            Chatbot SaaS is brand new — you&apos;d be one of our first
            customers, not our thousandth. That means direct access to the
            person building it, fast responses to feature requests, and a
            product that&apos;s still shaped by early feedback like yours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}