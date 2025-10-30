# TalkServe AI Marketing Website

## Overview
Professional marketing website for TalkServe AI - an AI receptionist service that answers calls 24/7, books appointments, and handles customer inquiries automatically.

**Tech Stack:**
- Next.js 15+ (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Icons
- next-sitemap (SEO)

**Current Status:** Fully implemented with 8 pages, dark mode, animations, and responsive design.

## Project Structure

```
/
├── app/
│   ├── components/         # Home page sections
│   │   ├── Hero.tsx
│   │   ├── MissedCalls.tsx
│   │   ├── MeetTalkServe.tsx
│   │   ├── IndustryCards.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Results.tsx
│   │   ├── Features.tsx
│   │   ├── PricingPreview.tsx
│   │   ├── WhyChoose.tsx
│   │   └── FinalCTA.tsx
│   ├── dental/             # Dental industry page
│   ├── restaurants/        # Restaurants industry page
│   ├── services/           # Service businesses page
│   ├── features/           # Features page
│   ├── pricing/            # Pricing page
│   ├── security/           # Security & compliance page
│   ├── contact/            # Contact page with form
│   │   └── ContactForm.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts    # Contact form API endpoint
│   │   └── outbound-call/
│   │       └── route.ts    # VoiceFlow outbound call API
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── not-found.tsx       # 404 page
├── components/             # Reusable components
│   ├── Header.tsx          # Sticky header with hide-on-scroll
│   ├── Footer.tsx          # Footer with links
│   ├── DarkModeProvider.tsx # Dark mode context
│   ├── Button.tsx          # Animated button component
│   ├── AnimatedSection.tsx # Scroll-reveal animations
│   ├── TestimonialCarousel.tsx # Auto-playing carousel
│   ├── VoiceflowWidget.tsx # VoiceFlow outbound call widget
│   └── VoiceAgentDialog.tsx # Contact form for voice calls
└── public/                 # Static assets
```

## Features Implemented

### Pages (8 total)
1. **Home** - Hero, problems, solutions, industry cards, how it works, results, features preview, pricing preview, testimonials
2. **Dental** - Industry-specific content for dental practices
3. **Restaurants** - Industry-specific content for restaurants
4. **Services** - Industry-specific content for service businesses
5. **Features** - Full feature list with categorized sections
6. **Pricing** - Three pricing tiers with testimonials carousel
7. **Security** - Security & compliance information
8. **Contact** - Contact information and working form
9. **404** - Custom not found page

### Design Features
- **Colors:** Primary blue (#2563EB), slate grays, clean white backgrounds
- **Typography:** Inter (body), Plus Jakarta Sans (headings)
- **Dark Mode:** System preference detection with localStorage persistence
- **Animations:** Framer Motion entrance effects, scroll reveals, hover states
- **Responsive:** Mobile-first design with Tailwind breakpoints
- **Performance:** Next.js Image optimization, lazy loading, minimal bundle size

### Navigation
- Sticky header with hide-on-scroll behavior
- Dropdown menu for Industries section
- Mobile hamburger menu
- Dark mode toggle
- Smooth scrolling

### SEO Optimization
- Per-page metadata and Open Graph tags
- next-sitemap for sitemap.xml generation
- robots.txt for crawler access
- Semantic HTML5 markup
- Proper heading hierarchy

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Recent Changes
- **2025-10-30:** Implemented VoiceFlow outbound calling feature with fully controlled form and state persistence
- **2025-10-30:** Added API route for VoiceFlow phone number integration (agent ID: 6902ebd8bcc0c2e54603a7f6)
- **2025-10-30:** Created VoiceAgentDialog with comprehensive error handling and user feedback
- **2025-10-28:** Initial implementation of all 8 pages with complete content
- **2025-10-28:** Set up Framer Motion animations across all components
- **2025-10-28:** Implemented dark mode with system preference detection
- **2025-10-28:** Added contact form with Next.js API route
- **2025-10-28:** Configured SEO with metadata and sitemap generation

## VoiceFlow Integration

### Outbound Calling Feature
- **Floating Phone Button:** Bottom-right corner, triggers voice call dialog
- **Contact Form:** Collects user info (name, email, phone, consent)
- **API Integration:** Secure server-side API calls to VoiceFlow
- **State Management:** Fully controlled form with data persistence across dialog close/reopen
- **Error Handling:** Comprehensive error messages, retry capability with preserved data
- **Success Flow:** User acknowledges success with "Done" button before dialog closes

### Environment Variables Required
- `VOICEFLOW_DM_API_KEY` - VoiceFlow Dialog Manager API key for outbound calls

### API Endpoint
- **POST /api/outbound-call** - Initiates outbound phone call via VoiceFlow
  - Body: `{ phoneNumber, firstName, lastName, email }`
  - Returns: `{ success, message, data }` or error

## Notes
- The website runs on port 5000 for development and production
- Contact form logs submissions to console (connect to email service for production)
- VoiceFlow outbound calls require valid VOICEFLOW_DM_API_KEY in environment
- Form data persists across dialog closures until successful call completion
- All content is from the provided TalkServe marketing copy
- Animations use smooth timing functions (220-300ms) for professional feel
- Design inspired by Linear and Vercel marketing sites
