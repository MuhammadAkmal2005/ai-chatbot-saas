"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";

const faqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. You paste one script tag into your site's HTML — most website builders and platforms have a spot for this. If you can add a tracking pixel or an analytics snippet, you can add this.",
  },
  {
    question: "Does it work with WordPress, Shopify, or a custom site?",
    answer:
      "Yes. Since it's just a script tag, it works on any platform that lets you edit your site's HTML, including WordPress, Shopify, Webflow, and custom-built sites.",
  },
  {
    question: "What happens if I go over my free plan's limit?",
    answer:
      "Your chatbot pauses responses until the next month, or until you upgrade to Pro. You'll see your usage in Settings before you hit the limit.",
  },
  {
    question: "Can I control what the chatbot says?",
    answer:
      "Yes. You write its instructions, welcome message, and tone in plain English — it answers based on what you tell it, not a generic script.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from your billing receipt email at any time. You keep Pro access until the end of your current billing period, and there's a 14-day money-back guarantee on your first payment.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your account and chatbot data live in your own database, and conversations are processed through Groq's AI infrastructure. See our Privacy Policy for full details.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="text-center font-display text-2xl text-cloud sm:text-3xl">
            Questions people actually ask
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={faq.question} delay={index * 0.04}>
                <div className="rounded-xl border border-surface-2 bg-surface">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-cloud">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
