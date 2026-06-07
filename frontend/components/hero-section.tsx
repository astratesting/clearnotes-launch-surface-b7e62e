"use client";

import { useState } from "react";
import { Anchor, Waves, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/waitlist-modal";

export function HeroSection() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-blue/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-mint/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Waves className="w-[600px] h-[600px] text-sky-blue/5 animate-wave" />
        </div>
      </div>

      <div className="container relative z-10 pt-20 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-sky-blue/10 text-sky-blue px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Anchor className="w-4 h-4" />
            <span>Now in Private Beta</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 leading-tight mb-6 animate-slide-up">
            Your AI Notetaker That{" "}
            <span className="gradient-text">Joins the Call</span>
            <br />
            So You Can Stay Present
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            ClearNotes joins your meetings, transcribes every word, and emails you
            action items afterward. No plugins to install. No buttons to press.
            Just calm, focused conversations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Button
              size="lg"
              className="bg-sky-blue hover:bg-sky-blue/90 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              onClick={() => setIsWaitlistOpen(true)}
            >
              Join the Waitlist
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto border-2 hover:bg-gray-50"
              onClick={() => {
                const features = document.getElementById("features");
                features?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See How It Works
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span>2-minute setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </section>
  );
}
