import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    // PostHog
    if (window.posthog) {
      window.posthog.capture(eventName, properties);
    }
    // Google Analytics
    if (window.gtag) {
      window.gtag("event", eventName, properties);
    }
  }
}
