"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
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
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/signup"
              className="inline-block rounded-full bg-amber-solid px-6 py-3 text-sm font-medium text-ink-solid hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get Started Free
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#how-it-works"
              className="inline-block rounded-full border border-surface-2 px-6 py-3 text-sm font-medium text-cloud hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              See how it works
            </a>
          </motion.div>
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
      </motion.div>

      {/* Signature element: a live widget mockup demonstrating the product on itself */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex justify-center md:justify-end"
      >
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

          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { y: [0, -18, 0], rotate: [0, 0.6, 0, -0.6, 0] }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative -mt-16 ml-auto w-64 rounded-2xl border border-surface-2 bg-surface p-4 shadow-xl shadow-amber/10"
          >
            <div className="flex items-center gap-2 border-b border-surface-2 pb-3">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-amber-solid text-xs font-medium text-ink-solid">
                AI
              </span>
              <span className="text-xs font-medium text-cloud">Assistant</span>
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
