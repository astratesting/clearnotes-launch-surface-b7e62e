import { HeroSection } from "@/components/hero-section";
import { ValuePropositions } from "@/components/value-propositions";
import { SocialProof } from "@/components/social-proof";
import { WaitlistForm } from "@/components/waitlist-form";
import { PricingPreview } from "@/components/pricing-preview";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ValuePropositions />
      <SocialProof />
      <WaitlistForm />
      <PricingPreview />
      <FAQSection />
      <Footer />
    </main>
  );
}
