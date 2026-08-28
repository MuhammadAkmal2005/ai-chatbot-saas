import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-surface-2 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span className="font-display text-lg text-cloud">Chatbot SaaS</span>
            <p className="mt-2 text-sm text-muted">
              The front desk that never clocks out.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-muted hover:text-cloud">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted hover:text-cloud">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted hover:text-cloud">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted hover:text-cloud">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted hover:text-cloud">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-cloud">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted hover:text-cloud">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted hover:text-cloud">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-muted hover:text-cloud">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-2 pt-6 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Chatbot SaaS. All rights reserved.</span>
          <span>Payments securely processed by Paddle.</span>
        </div>
      </div>
    </footer>
  );
}