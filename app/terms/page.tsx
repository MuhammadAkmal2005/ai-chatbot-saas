import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Chatbot SaaS",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 26, 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of
        Chatbot SaaS (the &quot;Service&quot;). By creating an account, you
        agree to these Terms.
      </p>

      <h2>Your account</h2>
      <p>
        You&apos;re responsible for keeping your account credentials secure
        and for all activity under your account. You must provide accurate
        information when signing up.
      </p>

      <h2>Plans and billing</h2>
      <p>
        The Free plan includes limited monthly usage as described on our
        pricing page. Paid Pro subscriptions are billed on a recurring
        basis and processed by Lemon Squeezy, acting as merchant of
        record. Lemon Squeezy&apos;s own terms also apply to your payment.
        Subscriptions renew automatically until cancelled; you can cancel
        anytime and retain access until the end of the paid period.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to use the Service to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Build chatbots that impersonate a real person without consent</li>
        <li>Distribute malware, spam, or illegal content</li>
        <li>Attempt to bypass usage limits or reverse-engineer the Service</li>
        <li>Collect personal data from end-visitors without a lawful basis and appropriate disclosure</li>
      </ul>

      <h2>Your content</h2>
      <p>
        You retain ownership of the content you provide (chatbot
        instructions, welcome messages, and similar). You&apos;re
        responsible for ensuring you have the right to use any content you
        upload or reference.
      </p>

      <h2>Service availability</h2>
      <p>
        We aim for high uptime but don&apos;t guarantee the Service will be
        uninterrupted or error-free. We may modify or discontinue features
        with reasonable notice where practical.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Service is provided &quot;as is&quot; without warranties of any
        kind, express or implied. AI-generated chatbot responses may
        occasionally be inaccurate; you&apos;re responsible for reviewing
        your chatbot&apos;s configuration and monitoring its behavior.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Chatbot SaaS will not be
        liable for indirect, incidental, or consequential damages arising
        from your use of the Service.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate accounts that violate these Terms. You
        may stop using the Service and delete your account at any time.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms occasionally. Continued use of the
        Service after changes take effect means you accept the updated
        Terms.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these Terms? Email us at{" "}
        <a href="mailto:support@yourdomain.com" className="text-amber hover:brightness-110">
          support@yourdomain.com
        </a>
        .
      </p>
    </LegalPage>
  );
}