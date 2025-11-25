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
- Firebase Authentication (email/password + Google OAuth)

**Current Status:** Fully implemented with 9 pages, dark mode, animations, responsive design, and Firebase authentication.

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
│   ├── onboarding/         # Business onboarding form
│   │   ├── page.tsx
│   │   └── OnboardingForm.tsx
│   ├── contact/            # Contact page with form
│   │   └── ContactForm.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts    # Contact form API endpoint
│   │   ├── onboarding/
│   │   │   └── route.ts    # Onboarding form API endpoint
│   │   └── outbound-call/
│   │       └── route.ts    # VoiceFlow outbound call API
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── not-found.tsx       # 404 page
├── components/             # Reusable components
│   ├── auth/               # Firebase authentication components
│   │   ├── LoginForm.tsx   # Email/password + Google login
│   │   ├── SignupForm.tsx  # Email/password registration
│   │   ├── AuthModal.tsx   # Modal wrapper for auth forms
│   │   ├── UserProfile.tsx # User profile dropdown
│   │   └── README.md       # Authentication documentation
│   ├── Header.tsx          # Sticky header with hide-on-scroll
│   ├── Footer.tsx          # Footer with links
│   ├── DarkModeProvider.tsx # Dark mode context
│   ├── Button.tsx          # Animated button component
│   ├── AnimatedSection.tsx # Scroll-reveal animations
│   ├── TestimonialCarousel.tsx # Auto-playing carousel
│   ├── VoiceflowWidget.tsx # VoiceFlow outbound call widget
│   └── VoiceAgentDialog.tsx # Contact form for voice calls
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Firebase auth state management
├── lib/                    # Utilities and configuration
│   └── firebase.ts         # Firebase SDK configuration
└── public/                 # Static assets
```

## Features Implemented

### Pages (9 total)
1. **Home** - Hero, problems, solutions, industry cards, how it works, results, features preview, pricing preview, testimonials
2. **Dental** - Industry-specific content for dental practices
3. **Restaurants** - Industry-specific content for restaurants
4. **Services** - Industry-specific content for service businesses
5. **Features** - Full feature list with categorized sections
6. **Pricing** - Three pricing tiers with testimonials carousel
7. **Security** - Security & compliance information
8. **Onboarding** - Business onboarding form with file upload
9. **Contact** - Contact information and working form
10. **404** - Custom not found page

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

## Firebase Authentication

### Setup
The website includes Firebase authentication with:
- Email/password login and signup
- Google OAuth sign-in
- User profile management
- Password reset functionality

### Components
- **AuthContext**: Manages authentication state across the app
- **LoginForm**: Email/password and Google login
- **SignupForm**: User registration with email/password
- **AuthModal**: Modal wrapper for login/signup forms
- **UserProfile**: Displays logged-in user with logout option

### Environment Variables
Required Firebase credentials (stored in Replit Secrets):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Usage
Wrap your app with `AuthProvider` in `app/layout.tsx`:
```tsx
import { AuthProvider } from '@/contexts/AuthContext';

<AuthProvider>
  {children}
</AuthProvider>
```

Use the `useAuth` hook in any component:
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { user, signIn, signUp, signInWithGoogle, logout } = useAuth();
```

See `components/auth/README.md` for detailed documentation.

## Recent Changes
- **2025-11-25:** Implemented Firebase Authentication with email/password login/signup and Google OAuth
- **2025-11-25:** Created AuthContext for managing authentication state across the application
- **2025-11-25:** Added LoginForm, SignupForm, AuthModal, and UserProfile components
- **2025-11-25:** Configured Firebase SDK with secure environment variables (NEXT_PUBLIC_FIREBASE_*)
- **2025-11-25:** Integrated authentication modal into Header component (Login/Register buttons)
- **2025-11-25:** Wrapped application with AuthProvider in layout.tsx for app-wide auth state
- **2025-11-25:** Added comprehensive authentication documentation in components/auth/README.md
- **2025-11-25:** Removed WhatsApp widget from the application
- **2025-11-25:** Updated onboarding form success message to show WhatsApp activation notice (24-hour activation timeline)
- **2025-11-24:** Created business onboarding form page with fields for owner info, business details, services, industry type, and file upload for business context documents
- **2025-11-24:** Added onboarding page to main navigation between Security and Contact
- **2025-11-24:** Implemented onboarding API endpoint to handle form submissions with multipart/form-data support
- **2025-11-24:** Integrated onboarding form with Firebase Cloud Function (https://us-central1-talkserve.cloudfunctions.net/onboarding) to store form data and files
- **2025-10-31:** Modernized phone call widget UI with rounded corners, better focus states, and improved spacing
- **2025-10-31:** Limited country selector to US (+1), Canada (+1), and UK (+44) only
- **2025-10-31:** Redesigned success state to show minimal dialog with only success message and Done button
- **2025-10-31:** Enhanced form inputs with gradient backgrounds, ring effects, and modern styling
- **2025-10-31:** Improved country dropdown with better layout and hover states
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
