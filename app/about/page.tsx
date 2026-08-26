import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing-header";
import { MarketingFooter } from "@/components/marketing-footer";

export const metadata: Metadata = {
  title: "About — Chatbot SaaS",
  description: "Why we built Chatbot SaaS and who it's for.",
};

export default function AboutPage() {
  return (
    <div className="bg-ink text-cloud">
      <MarketingHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          About us
        </p>
        <h1 className="mt-4 font-display text-4xl text-cloud">
          Built for teams too small to staff a night shift.
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Most website chat widgets are built for large support teams —
            expensive, slow to set up, and overkill if you&apos;re a small
            business or a solo founder. Chatbot SaaS exists for everyone
            else: the businesses that lose a customer every time a question
            comes in at 2am and nobody&apos;s there to answer it.
          </p>
          <p>
            We built it around one idea: adding an AI chatbot to a website
            should take minutes, not weeks, and shouldn&apos;t require
            hiring a developer or an agency. One script tag, and your site
            has a front desk that never sleeps.
          </p>
          <p>
            We&apos;re an independent, self-funded product — not backed by a
            large support org — which is why we keep things simple, honest,
            and priced for small businesses first.
          </p>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}