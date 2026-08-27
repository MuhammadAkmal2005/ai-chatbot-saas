"use client";

import { motion } from "framer-motion";
import { Bot, Clock, Download, MessagesSquare, Palette, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";

const features = [
  {
    icon: Clock,
    title: "Live in one script tag",
    body: "Paste a single line into your site's HTML. No plugins, no build step, no waiting on IT.",
  },
  {
    icon: Bot,
    title: "Trained on what you already wrote",
    body: "Point it at your docs, FAQs, or product pages. It answers in your voice, not a generic script.",
  },
  {
    icon: MessagesSquare,
    title: "Every chat becomes a lead",
    body: "Names, emails, and intent land in your dashboard automatically — nothing to export by hand.",
  },
  {
    icon: Palette,
    title: "Matches your brand",
    body: "Set your own color and position. It looks like part of your site, not a bolted-on widget.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, your control",
    body: "Conversations and leads live in your own dashboard. Deactivate any chatbot instantly, anytime.",
  },
  {
    icon: Download,
    title: "Export leads anytime",
    body: "Pull every captured lead to a CSV in one click — no lock-in, no waiting on a support ticket.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Built for sites that can&apos;t staff a 24/7 team
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-xl border border-surface-2 bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-amber">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg text-cloud">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
