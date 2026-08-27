"use client";

import { Reveal } from "./reveal";

const steps = [
  {
    number: "01",
    title: "Create your account",
    body: "Sign up free. No card required.",
  },
  {
    number: "02",
    title: "Paste one script tag",
    body: (
      <>
        Drop it before <code className="font-mono text-xs">{"</body>"}</code>{" "}
        on any page.
      </>
    ),
  },
  {
    number: "03",
    title: "Watch conversations come in",
    body: "Your dashboard fills up while you do everything else.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-2xl text-cloud sm:text-3xl">
            Three steps, about two minutes
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <span className="font-mono text-sm text-amber">{step.number}</span>
              <h3 className="mt-2 font-display text-lg text-cloud">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
