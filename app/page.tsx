import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedBacktests } from "@/components/featured-backtests";
import { CtaSection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedBacktests />
      <CtaSection />
    </>
  );
}
