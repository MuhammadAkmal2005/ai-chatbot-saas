import { MarketingHeader } from "@/components/marketing-header";
import { MarketingFooter } from "@/components/marketing-footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ink text-cloud">
      <MarketingHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl text-cloud">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
        <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-cloud [&_strong]:text-cloud">
          {children}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}