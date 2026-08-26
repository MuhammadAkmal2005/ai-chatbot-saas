import Link from "next/link";
import { MarketingHeader } from "@/components/marketing-header";
import { MarketingFooter } from "@/components/marketing-footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-cloud">
      <MarketingHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-mono text-sm text-amber">404</p>
        <h1 className="mt-4 font-display text-3xl text-cloud">
          This page went quiet.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-amber-solid px-6 py-3 text-sm font-semibold text-ink-solid hover:brightness-95"
        >
          Back to homepage
        </Link>
      </main>
      <MarketingFooter />
    </div>
  );
}