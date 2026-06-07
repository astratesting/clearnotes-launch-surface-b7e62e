"use client";

import { Mic, Mail, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const valueProps = [
  {
    icon: Mic,
    title: "Joins Automatically",
    description:
      "ClearNotes joins your calendar calls automatically. No invites to send, no bots to manage. It just shows up and listens.",
    color: "text-sky-blue",
    bgColor: "bg-sky-blue/10",
  },
  {
    icon: Mail,
    title: "Action Items via Email",
    description:
      "Get a clean email after every meeting with action items, decisions, and key takeaways. No dashboard to check.",
    color: "text-mint",
    bgColor: "bg-mint/10",
  },
  {
    icon: Shield,
    title: "Private by Design",
    description:
      "Your meetings stay private. Enterprise-grade encryption, GDPR compliant, and you control what gets processed.",
    color: "text-sand",
    bgColor: "bg-sand/30",
  },
  {
    icon: Zap,
    title: "Works with Everything",
    description:
      "Zoom, Google Meet, Microsoft Teams, Webex. If there's a meeting link, ClearNotes can join it.",
    color: "text-sky-blue",
    bgColor: "bg-sky-blue/10",
  },
];

export function ValuePropositions() {
  return (
    <section id="features" className="section-padding bg-soft-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Built for How You Actually Work
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            ClearNotes is designed as a calm system that stays out of your way
            until you need it. No interruptions, just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <Card
              key={prop.title}
              className="relative p-8 border-0 shadow-sm hover:shadow-md transition-all duration-300 card-hover bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`inline-flex p-3 rounded-2xl ${prop.bgColor} mb-6`}
              >
                <prop.icon className={`w-6 h-6 ${prop.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                {prop.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-calm rounded-3xl">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">
                Trusted by 2,400+ professionals
              </p>
              <p className="text-sm text-gray-600">
                From 150+ companies worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
