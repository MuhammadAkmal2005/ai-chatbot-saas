import { MarketingHeader } from "@/components/marketing-header";
import { MarketingFooter } from "@/components/marketing-footer";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { UseCases } from "@/components/landing/use-cases";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Comparison } from "@/components/landing/comparison";
import { Faq } from "@/components/landing/faq";
import { EarlyAccess } from "@/components/landing/early-access";
import { Pricing } from "@/components/landing/pricing";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <div className="bg-ink text-cloud">
      <MarketingHeader />
      <Hero />
      <Features />
      <UseCases />
      <HowItWorks />
      <Comparison />
      <Faq />
      <EarlyAccess />
      <Pricing />
      <FinalCta />
      <MarketingFooter />
    </div>
  );
}