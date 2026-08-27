"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Home,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import { Reveal } from "./reveal";

const useCases = [
  { icon: ShoppingCart, title: "Online stores", body: "Answer sizing, shipping, and return questions before checkout." },
  { icon: Home, title: "Real estate", body: "Qualify buyers and collect contact details outside office hours." },
  { icon: Wrench, title: "Local services", body: "Capture booking requests while you're on a job, not by the phone." },
  { icon: Building2, title: "Agencies & consultants", body: "Filter serious leads from tire-kickers before a call is booked." },
  { icon: GraduationCap, title: "Course creators", body: "Answer curriculum questions on autopilot, day or night." },
  { icon: Briefcase, title: "Small SaaS teams", body: "Give early users instant answers without a full support team." },
];

export function UseCases() {
  return (
    <section id="who-its-for" className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Built for businesses like yours
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            If your website gets visitors when nobody&apos;s watching it, this
            is for you.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-xl border border-surface-2 bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-amber">
                  <useCase.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base text-cloud">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{useCase.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
