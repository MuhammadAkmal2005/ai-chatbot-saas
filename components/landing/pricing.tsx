"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Start free. Upgrade when you need to.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">Free</h3>
              <p className="mt-1 font-display text-3xl text-cloud">$0</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>1 chatbot</li>
                <li>100 messages / month</li>
                <li>Community support</li>
              </ul>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-block"
              >
                <Link
                  href="/signup"
                  className="inline-block rounded-full bg-amber-solid px-5 py-2.5 text-sm font-medium text-ink-solid hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Start free
                </Link>
              </motion.div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-surface-2 bg-surface p-6">
              <h3 className="font-display text-lg text-cloud">Pro</h3>
              <p className="mt-1 font-display text-3xl text-cloud">
                For growing sites
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Unlimited chatbots</li>
                <li>Unlimited conversations</li>
                <li>Custom widget branding (colors, logo)</li>
                <li>Priority support</li>
                <li>Remove Chatbot SaaS branding</li>
              </ul>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-block"
              >
                <Link
                  href="/signup"
                  className="inline-block rounded-full border border-surface-2 px-5 py-2.5 text-sm font-medium text-cloud hover:bg-surface-2"
                >
                  Sign up, then upgrade
                </Link>
              </motion.div>
              <p className="mt-3 text-xs text-muted">
                Create a free account first — you can upgrade to Pro from
                Settings.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}