import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-surface-2 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight text-cloud">
          Chatbot SaaS
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/#features" className="hover:text-cloud">
            Features
          </Link>
          <Link href="/#how-it-works" className="hover:text-cloud">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-cloud">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-cloud">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="text-sm text-muted hover:text-cloud">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-amber-solid px-4 py-2 text-sm font-medium text-ink-solid hover:brightness-95"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </header>
  );
}