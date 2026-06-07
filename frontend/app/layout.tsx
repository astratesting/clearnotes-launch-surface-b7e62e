import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClearNotes - AI Meeting Notetaker That Joins Your Calls",
  description:
    "ClearNotes is a calm AI meeting notetaker that joins your calls, transcribes conversations, and emails you action items. Stay present in your meetings.",
  keywords: [
    "AI meeting notes",
    "meeting transcription",
    "action items",
    "meeting assistant",
    "calm productivity",
  ],
  authors: [{ name: "ClearNotes" }],
  openGraph: {
    title: "ClearNotes - AI Meeting Notetaker",
    description:
      "Join calls, transcribe, and get action items via email. Stay present in your meetings.",
    url: "https://clearnotes.ai",
    siteName: "ClearNotes",
    images: [
      {
        url: "https://clearnotes.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClearNotes - Calm AI Meeting Notetaker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearNotes - AI Meeting Notetaker",
    description:
      "Join calls, transcribe, and get action items via email. Stay present in your meetings.",
    images: ["https://clearnotes.ai/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || ""}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure'
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-soft-white text-gray-900 antialiased`}>
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
