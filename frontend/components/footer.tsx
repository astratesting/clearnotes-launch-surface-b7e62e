"use client";

import { Anchor, Twitter, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Beta Program", href: "#waitlist" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "mailto:hello@clearnotes.ai" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API", href: "/api" },
    { label: "Status", href: "https://status.clearnotes.ai" },
    { label: "Support", href: "mailto:support@clearnotes.ai" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Anchor className="w-8 h-8 text-sky-blue" />
              <span className="font-display text-xl font-semibold text-white">
                ClearNotes
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              The calm AI meeting notetaker that joins your calls, transcribes, and
              emails you action items.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/clearnotes"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/clearnotes"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/clearnotes"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@clearnotes.ai"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ClearNotes. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-500 text-sm flex items-center">
              <span className="w-2 h-2 bg-mint rounded-full mr-2 animate-gentle-pulse" />
              All systems operational
            </span>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
