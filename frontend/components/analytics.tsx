"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    posthog: {
      init: (key: string, options: Record<string, unknown>) => void;
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      reset: () => void;
      debug: () => void;
    };
  }
}

export function Analytics() {
  useEffect(() => {
    // Initialize PostHog
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.posthog.com/posthog.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
          autocapture: true,
          capture_pageview: true,
          disable_session_recording: false,
          loaded: (posthog: typeof window.posthog) => {
            if (process.env.NODE_ENV === "development") {
              posthog.debug();
            }
          },
        });
      };
    }

    // Initialize Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== "undefined") {
      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      gaScript.onload = () => {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          page_path: window.location.pathname,
        });
      };
    }
  }, []);

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      }
      if (window.posthog) {
        window.posthog.capture("$pageview", { $current_url: url });
      }
    };

    // Listen for Next.js route changes
    handleRouteChange(window.location.pathname);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
