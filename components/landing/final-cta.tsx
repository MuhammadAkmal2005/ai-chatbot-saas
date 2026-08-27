"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="border-t border-surface-2 bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl text-cloud sm:text-4xl">
            Stop losing visitors while you sleep.
          </h2>
          <p className="mt-4 text-base text-muted">
            Set up your first chatbot free, in about two minutes.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-block"
          >
            <Link
              href="/signup"
              className="inline-block rounded-full bg-amber-solid px-8 py-3.5 text-sm font-semibold text-ink-solid hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get Started Free
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
