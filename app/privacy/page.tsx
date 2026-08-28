import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Chatbot SaaS",
};

// TODO before going live: replace [Your Contact Email] and [Your
// Business Name / Jurisdiction] below with your real details. This is
// a standard SaaS template, not personalized legal advice — have it
// reviewed once you're generating real revenue.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 26, 2026">
      <p>
        This Privacy Policy explains what information Chatbot SaaS
        (&quot;we&quot;, &quot;us&quot;) collects, how we use it, and the
        choices you have, whether you&apos;re a customer who signs up for an
        account, or a visitor chatting with one of our customers&apos;
        chatbots.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Account data:</strong> when you sign up, we collect your
        email address and password (stored securely, hashed, by our
        authentication provider, Supabase).
      </p>
      <p>
        <strong>Chatbot configuration:</strong> the chatbot name, welcome
        message, instructions, and appearance settings you create.
      </p>
      <p>
        <strong>End-visitor chat data:</strong> when someone chats with a
        chatbot built on our platform, we store the conversation and any
        contact details (name, email, phone) they voluntarily share, so
        our customer can follow up with them as a lead.
      </p>
      <p>
        <strong>Payment data:</strong> we do not process or store your card
        details ourselves. Payments are handled entirely by Lemon Squeezy,
        our payment processor and merchant of record. Review their{" "}
        privacy policy for details on how they handle payment information.
      </p>

      <h2>How we use information</h2>
      <p>
        We use collected information to operate the service (running your
        chatbots, storing leads, enforcing plan limits), to communicate
        with you about your account, and to improve the product. We do not
        sell personal information to third parties.
      </p>

      <h2>Third-party service providers</h2>
      <p>
        We rely on a small number of trusted providers to run the service:
        Supabase (database and authentication), Groq (AI processing of
        chat messages), Vercel (hosting), and Lemon Squeezy (payments).
        Each processes data only as needed to provide their service to us.
      </p>

      <h2>Data retention and deletion</h2>
      <p>
        We retain account and chatbot data for as long as your account is
        active. You can permanently delete your account and all associated
        chatbots, leads, and chat history at any time from Settings in your
        dashboard. Deletion is immediate and irreversible.
      </p>
      <p>
        One exception: where we&apos;re legally required to retain certain
        records — for example, billing and payment records held by our
        payment processor for tax and fraud-prevention purposes — those
        records may be retained by that processor per their own obligations,
        independent of your account with us.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access,
        correct, or delete your personal data, or to object to certain
        processing. To exercise these rights, contact us using the details
        below.
      </p>

      <h2>International data transfers</h2>
      <p>
        Our service providers operate infrastructure in multiple countries.
        By using Chatbot SaaS, you understand your data may be processed
        outside your country of residence.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Chatbot SaaS is not directed at children under 16, and we do not
        knowingly collect personal information from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will
        be reflected by updating the date at the top of this page.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href="mailto:support@yourdomain.com" className="text-amber hover:brightness-110">
          support@yourdomain.com
        </a>
        .
      </p>
    </LegalPage>
  );
}