import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy — Chatbot SaaS",
};

// NOTE: the 14-day guarantee below is a common, trust-building default
// for SaaS products — but it's your business decision. Adjust the
// number of days (or remove it) to match what you actually want to
// offer before going live.
export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated="August 26, 2026">
      <p>
        We want you to be confident upgrading to Pro. Here&apos;s how
        refunds and cancellations work.
      </p>

      <h2>14-day money-back guarantee</h2>
      <p>
        If you upgrade to Pro and it&apos;s not right for you, contact us
        within 14 days of your first payment for a full refund, no
        questions asked.
      </p>

      <h2>Cancelling your subscription</h2>
      <p>
        You can cancel your Pro subscription at any time from your Lemon
        Squeezy receipt email or by contacting us. Cancelling stops future
        billing; you keep Pro access until the end of your current billing
        period. We don&apos;t provide prorated refunds for partial months
        outside the 14-day guarantee above.
      </p>

      <h2>Billing issues</h2>
      <p>
        If you believe you were charged in error (duplicate charge, wrong
        amount), contact us and we&apos;ll investigate and correct it
        promptly.
      </p>

      <h2>How refunds are processed</h2>
      <p>
        Refunds are issued by Lemon Squeezy, our payment processor, back
        to your original payment method. Processing time depends on your
        bank or card provider, typically 5–10 business days.
      </p>

      <h2>Contact us</h2>
      <p>
        To request a refund or ask about a charge, email{" "}
        <a href="mailto:support@yourdomain.com" className="text-amber hover:brightness-110">
          support@yourdomain.com
        </a>
        .
      </p>
    </LegalPage>
  );
}