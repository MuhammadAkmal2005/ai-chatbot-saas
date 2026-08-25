import Link from "next/link";
import { MessageSquare, Sparkles, Zap } from "lucide-react";

const features = [
  {
    title: "Instant Setup",
    description: "Add a chat widget to your site with a single snippet. Live in about two minutes.",
    icon: Zap,
  },
  {
    title: "AI-Powered Answers",
    description: "Answer customer questions around the clock with an AI assistant trained on your content.",
    icon: Sparkles,
  },
  {
    title: "Lead Capture",
    description: "Turn conversations into contacts. Collect names, emails, and intent automatically.",
    icon: MessageSquare,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-semibold text-indigo-600">Chatbot SaaS</span>
        <Link
          href="/login"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Log in
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-12 text-center sm:pt-20">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Add an AI Chatbot to Your Website in 2 Minutes
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Capture more leads with AI customer support that answers questions, qualifies visitors, and
          never sleeps.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Get Started Free
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <feature.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
