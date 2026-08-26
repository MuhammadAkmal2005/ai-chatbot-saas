import Link from "next/link";
import { MarketingHeader } from "@/components/marketing-header";
import { MarketingFooter } from "@/components/marketing-footer";

export default function Home() {
  return (
    <div className="bg-ink text-cloud">
      <MarketingHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            Always on duty
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-cloud sm:text-5xl">
            The front desk that never clocks out.
          </h1>
          <p className="mt-5 max-w-md text-base text-muted">
            Answer questions, qualify visitors, and capture leads around the
            clock — even at 3am, when your team is asleep and a visitor is
            about to leave.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-amber-solid px-6 py-3 text-sm font-medium text-ink-solid hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border border-surface-2 px-6 py-3 text-sm font-medium text-cloud hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              See how it works
            </a>
          </div>
          <div className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Copy. Paste. Done.
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-surface-2 bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
{`<script
  src="https://yourapp.com/widget.js"
  data-key="pk_live_your_key"
  async
></script>`}
            </pre>
          </div>
        </div>

        {/* Signature element: a live widget mockup demonstrating the product on itself */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-full max-w-sm rounded-xl border border-surface-2 bg-surface/60 p-3 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
              <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
              <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
              <span className="ml-3 font-mono text-[10px] text-muted">
                yoursite.com
              </span>
            </div>
            <div className="h-40 rounded-lg border border-surface-2 bg-ink/40" />

            <div className="motion-safe:animate-float relative -mt-16 ml-auto w-64 rounded-2xl border border-surface-2 bg-surface p-4 shadow-xl shadow-amber/5">
              <div className="flex items-center gap-2 border-b border-surface-2 pb-3">
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-amber-solid text-xs font-medium text-ink-solid">
                  AI
                </span>
                <span className="text-xs font-medium text-cloud">
                  Assistant
                </span>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  Online
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-surface-2 px-3 py-2 text-xs text-cloud">
                  Hey! Looking for pricing, or want a quick demo?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-amber-solid px-3 py-2 text-xs text-ink-solid">
                  Do you have a free plan?
                </div>
                <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-surface-2 px-3 py-2">
                  <span className="motion-safe:animate-pulse h-1.5 w-1.5 rounded-full bg-muted" />
                  <span className="motion-safe:animate-pulse h-1.5 w-1.5 rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="motion-safe:animate-pulse h-1.5 w-1.5 rounded-full bg-muted [animation-delay:300ms]" />
                </div>
              </div>
              <div className="mt-3 flex items-center rounded-full border border-surface-2 px-3 py-1.5 text-[11px] text-muted">
                Type your message...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-surface-2 bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Built for sites that can&apos;t staff a 24/7 team
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">
                Live in one script tag
              </h3>
              <p className="mt-2 text-sm text-muted">
                Paste a single line into your site&apos;s HTML. No plugins, no
                build step, no waiting on IT.
              </p>
            </div>
            <div className="rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">
                Trained on what you already wrote
              </h3>
              <p className="mt-2 text-sm text-muted">
                Point it at your docs, FAQs, or product pages. It answers in
                your voice, not a generic script.
              </p>
            </div>
            <div className="rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">
                Every chat becomes a lead
              </h3>
              <p className="mt-2 text-sm text-muted">
                Names, emails, and intent land in your dashboard
                automatically — nothing to export by hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — a real sequence, so numbering earns its place */}
      <section id="how-it-works" className="border-t border-surface-2 bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Three steps, about two minutes
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <span className="font-mono text-sm text-amber">01</span>
              <h3 className="mt-2 font-display text-lg text-cloud">
                Create your account
              </h3>
              <p className="mt-1 text-sm text-muted">
                Sign up free. No card required.
              </p>
            </div>
            <div>
              <span className="font-mono text-sm text-amber">02</span>
              <h3 className="mt-2 font-display text-lg text-cloud">
                Paste one script tag
              </h3>
              <p className="mt-1 text-sm text-muted">
                Drop it before{" "}
                <code className="font-mono text-xs">{"</body>"}</code> on any
                page.
              </p>
            </div>
            <div>
              <span className="font-mono text-sm text-amber">03</span>
              <h3 className="mt-2 font-display text-lg text-cloud">
                Watch conversations come in
              </h3>
              <p className="mt-1 text-sm text-muted">
                Your dashboard fills up while you do everything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="border-t border-surface-2 bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Start free. Upgrade when you need to.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">Free</h3>
              <p className="mt-1 font-display text-3xl text-cloud">$0</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>1 chatbot</li>
                <li>100 messages / month</li>
                <li>Community support</li>
              </ul>
              <Link
                href="/signup"
                className="mt-6 inline-block rounded-full bg-amber-solid px-5 py-2.5 text-sm font-medium text-ink-solid hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Start free
              </Link>
            </div>
            <div className="rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">Pro</h3>
              <p className="mt-1 font-display text-3xl text-cloud">
                For growing sites
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Unlimited chatbots</li>
                <li>Unlimited conversations</li>
                <li>Priority support</li>
                <li>Remove Chatbot SaaS branding</li>
              </ul>
              <Link
                href="/signup"
                className="mt-6 inline-block rounded-full border border-surface-2 px-5 py-2.5 text-sm font-medium text-cloud hover:bg-surface-2"
              >
                Sign up, then upgrade
              </Link>
              <p className="mt-3 text-xs text-muted">
                Create a free account first — you can upgrade to Pro from
                Settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}