# ClearNotes Landing Page - MVP

A conversion-focused landing page for **ClearNotes**, the calm AI meeting notetaker that joins your calls, transcribes conversations, and emails you action items.

## Features

✅ **Hero Section** - Clear headline, subheadline, and primary CTA with gradient background
✅ **Value Propositions** - 4 key benefits with icons and hover effects
✅ **Social Proof** - Testimonials, company logos, and trust indicators
✅ **Waitlist Form** - Email capture with GDPR-compliant opt-in
✅ **Pricing Preview** - 3-tier plan comparison (Free, Pro, Team)
✅ **FAQ Section** - 7 common questions with expandable answers
✅ **Footer** - Links, social media, and legal information
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **SEO Optimized** - Meta tags, Open Graph, and Twitter cards
✅ **Analytics Ready** - Google Analytics 4 and PostHog integration
✅ **Cookie Consent** - GDPR-compliant cookie banner
✅ **Fast Performance** - Next.js 14 with App Router and optimization

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animations
- **Fonts**: Geist Sans, Lora (Google Fonts)

### Backend (API Routes)
- **Framework**: Next.js API Routes (Python FastAPI also available)
- **Email**: Resend integration ready
- **Database**: PostgreSQL (schema ready)

### Design System
- **Brand**: ClearNotes "Calm System"
- **Colors**: Sky Blue (#7EC8E3), Mint (#B4E6C4), Sand (#F5E6D3), Soft White (#FEFEFE)
- **Typography**: Geist Sans (body), Lora (display)
- **Motif**: Harbor/maritime calm aesthetic

## Quick Start

### Prerequisites
- Node.js 18.17+ installed
- npm or yarn
- Git

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/astratesting/clearnotes-launch-surface-b7e62e.git
cd clearnotes-launch-surface-b7e62e/frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 2. Configure Environment

Edit `.env.local` with your values:

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ClearNotes
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/astratesting/clearnotes-launch-surface-b7e62e)

### Option 2: Manual Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as the root directory

2. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_GA_ID=your_ga_id
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_API_URL=https://api.clearnotes.ai
   NEXT_PUBLIC_SITE_URL=https://clearnotes.ai
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### 3. Custom Domain Setup

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain (e.g., `clearnotes.ai`)
4. Configure DNS records as instructed

## Project Structure

```
clearnotes-launch-surface-b7e62e/
├── frontend/                    # Next.js frontend
│   ├── app/                   # App Router pages
│   │   ├── page.tsx          # Landing page
│   │   ├── layout.tsx        # Root layout with SEO
│   │   ├── globals.css       # Global styles
│   │   └── api/              # API routes
│   │       └── waitlist/
│   │           └── route.ts  # Waitlist API endpoint
│   ├── components/            # React components
│   │   ├── navigation.tsx
│   │   ├── hero-section.tsx
│   │   ├── value-propositions.tsx
│   │   ├── social-proof.tsx
│   │   ├── waitlist-form.tsx
│   │   ├── waitlist-modal.tsx
│   │   ├── pricing-preview.tsx
│   │   ├── faq-section.tsx
│   │   ├── footer.tsx
│   │   ├── analytics.tsx
│   │   ├── cookie-banner.tsx
│   │   └── ui/               # shadcn/ui components
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── lib/                  # Utilities
│   │   └── utils.ts
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── backend/                   # Python backend (optional)
│   ├── main.py               # FastAPI application
│   ├── requirements.txt
│   └── Dockerfile
├── .github/                  # CI/CD workflows
│   └── workflows/
│       ├── frontend.yml
│       └── backend.yml
├── __tests__/                # Test files
└── README.md                # This file
```

## Environment Variables

| Variable | Description | Required | Default |
|-----------|-------------|----------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | No | - |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog API Key | No | - |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog Host URL | No | `https://app.posthog.com` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | No | `http://localhost:8000` |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL | No | `http://localhost:3000` |
| `RESEND_API_KEY` | Resend API Key (for emails) | No | - |

## Analytics Setup

### Google Analytics 4

1. Create a GA4 property at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to environment variables as `NEXT_PUBLIC_GA_ID`

### PostHog

1. Sign up at [PostHog](https://posthog.com)
2. Get your API key from Project Settings
3. Add to environment variables as `NEXT_PUBLIC_POSTHOG_KEY`

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Performance Optimization

- ✅ Static site generation with Next.js
- ✅ Image optimization (WebP format)
- ✅ Font optimization (Google Fonts with display swap)
- ✅ Code splitting and lazy loading
- ✅ CSS purging with Tailwind
- ✅ Security headers configured
- ✅ SEO meta tags optimized

## Brand Guidelines

### Colors
- **Sky Blue**: `#7EC8E3` - Primary brand color
- **Mint**: `#B4E6C4` - Secondary/accent color
- **Sand**: `#F5E6D3` - Warm neutral
- **Soft White**: `#FEFEFE` - Background

### Typography
- **Geist Sans**: Body text, UI elements
- **Lora**: Headings, display text

### Voice & Tone
- Calm, reassuring, and professional
- Focus on presence and mindfulness
- Clear, jargon-free communication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Email**: hello@clearnotes.ai
- **Twitter**: [@clearnotes](https://twitter.com/clearnotes)
- **GitHub Issues**: [Report a bug](https://github.com/astratesting/clearnotes-3e966e/issues)

---

Built with ❤️ and calm by the ClearNotes team.
