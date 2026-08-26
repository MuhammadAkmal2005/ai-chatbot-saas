import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { MarketingHeader } from "@/components/marketing-header";
import { MarketingFooter } from "@/components/marketing-footer";

export const metadata: Metadata = {
  title: "Contact — Chatbot SaaS",
  description: "Get in touch with the Chatbot SaaS team.",
};

// TODO: replace with your real support inbox before going live.
const SUPPORT_EMAIL = "support@yourdomain.com";

export default function ContactPage() {
  return (
    <div className="bg-ink text-cloud">
      <MarketingHeader />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          Contact
        </p>
        <h1 className="mt-4 font-display text-4xl text-cloud">
          Talk to a human.
        </h1>
        <p className="mt-4 text-base text-muted">
          Questions about pricing, billing, or setting up your chatbot?
          Email us and we&apos;ll get back to you, usually within one
          business day.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-solid px-6 py-3 text-sm font-semibold text-ink-solid hover:brightness-95"
        >
          <Mail className="h-4 w-4" />
          {SUPPORT_EMAIL}
        </a>
      </main>
      <MarketingFooter />
    </div>
  );
}