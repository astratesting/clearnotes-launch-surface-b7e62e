"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
    enableAnalytics();
  };

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    if (preferences.analytics) {
      enableAnalytics();
    }
  };

  const enableAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-4xl mx-auto">
          {showSettings ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-semibold text-gray-900">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <CookiePreferenceRow
                  title="Necessary"
                  description="Essential for the site to function properly"
                  checked={true}
                  disabled={true}
                />
                <CookiePreferenceRow
                  title="Analytics"
                  description="Help us improve by tracking usage"
                  checked={preferences.analytics}
                  onChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, analytics: checked }))
                  }
                />
                <CookiePreferenceRow
                  title="Marketing"
                  description="Personalized content and ads"
                  checked={preferences.marketing}
                  onChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, marketing: checked }))
                  }
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={acceptSelected}
                  className="bg-sky-blue hover:bg-sky-blue/90 text-white"
                >
                  Save Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                >
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start space-x-4">
                <Cookie className="w-8 h-8 text-sky-blue flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We use cookies to enhance your browsing experience, serve
                    personalized content, and analyze our traffic. Read our{" "}
                    <a
                      href="/privacy"
                      className="text-sky-blue hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    to learn more.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={acceptAll}
                      className="bg-sky-blue hover:bg-sky-blue/90 text-white"
                    >
                      Accept All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CookiePreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-5 h-5 rounded border-gray-300 text-sky-blue focus:ring-sky-blue disabled:opacity-50"
      />
    </div>
  );
}
