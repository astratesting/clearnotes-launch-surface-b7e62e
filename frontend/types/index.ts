export interface WaitlistEntry {
  email: string;
  name?: string;
  company?: string;
  gdprConsent: boolean;
  createdAt?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge: string | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SocialProofProps {
  testimonials: Testimonial[];
  companyLogos: Array<{
    name: string;
    width: number;
  }>;
}

export interface ValueProposition {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export interface NavigationProps {
  transparent?: boolean;
}

export interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export interface WaitlistFormProps {
  onSubmit?: (email: string, name: string) => void;
  className?: string;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}
