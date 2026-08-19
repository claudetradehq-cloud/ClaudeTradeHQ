import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedBacktests } from "@/components/featured-backtests";
import { CtaSection } from "@/components/cta-section";

/**
 * The hero snapshot pulls live FX Blue stats, so the home page revalidates on
 * the same 30-minute cadence as /fx-blue-links.
 */
export const revalidate = 1800;

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
