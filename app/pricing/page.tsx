'use client';

import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import TestimonialCarousel, { Testimonial } from '@/components/TestimonialCarousel';
import Button from '@/components/Button';
import { HiCheckCircle, HiPhone } from 'react-icons/hi';
import { useVoiceAgent } from '@/components/VoiceAgentContext';

const plans = [
  {
    name: 'Starter',
    price: '$199',
    period: '/month',
    description: 'Up to 200 calls (~400–600 min)',
    features: [
      'One number',
      'Core integrations',
      'Email support',
      'Basic analytics',
      '24/7 AI receptionist',
    ],
    bestFor: 'Best for: single-location salons, clinics, and cafés',
  },
  {
    name: 'Professional',
    price: '$449',
    period: '/month',
    description: 'Up to 1,000 calls (~2,000–3,000 min)',
    features: [
      'Three numbers',
      'All integrations (CRM / POS / Booking)',
      'Multi-staff scheduling',
      'Custom voice training',
      'Priority support',
      'Advanced analytics',
      'API access',
    ],
    popular: true,
    bestFor: 'Most popular for growing practices and restaurants',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Unlimited calls and numbers',
    features: [
      'Unlimited calls and numbers',
      'Dedicated success manager',
      'SLA (99.9% uptime)',
      'API access & custom integrations',
      'White-label branding',
      'HIPAA BAA + Canadian data residency',
      'Custom feature development',
      'Premium support',
    ],
    bestFor: 'For organizations with advanced needs',
  },
];

const testimonials: Testimonial[] = [
  {
    quote: 'Before TalkServe we missed 25 calls a week. Now zero. New patient bookings are up 45%, and my staff finally has time for patients in the chair.',
    author: 'Dr. Michael Torres',
    role: 'Dentist',
    company: 'Bright Smile Dental',
  },
  {
    quote: 'Friday nights used to be chaos. Now TalkServe handles every call and order perfectly. Sales up 30% without extra staff.',
    author: 'Frank Benedetto',
    role: 'Owner',
    company: "Tony's Pizzeria",
  },
  {
    quote: 'TalkServe books jobs while I\'m cleaning. It handles pricing questions and rescheduling. My business has grown 50% in six months.',
    author: 'Maria Rodriguez',
    role: 'Founder',
    company: 'Green Clean Services',
  },
];

export default function PricingPage() {
  const { openDialog } = useVoiceAgent();
  
  return (
    <>
      <HeroSection
        title="Transparent pricing."
        highlightedText="Serious ROI."
        description="Choose the plan that fits your business. Scale as you grow. Typical ROI: $3,000–$5,000 recovered monthly from missed calls."
        imagePath="/images/heroes/Business_growth_and_ROI_14e4879e.png"
        imageAlt="Business growth and ROI"
      >
        <div className="mb-8">
          <Button onClick={openDialog} size="lg" className="gap-2">
            <HiPhone className="h-5 w-5" />
            Talk to Us
          </Button>
        </div>
      </HeroSection>

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <TestimonialCarousel testimonials={testimonials} autoPlay={true} interval={6000} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of businesses that never miss a call.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={openDialog}
                variant="secondary"
                size="lg"
                className="gap-2 bg-white text-primary hover:bg-blue-50"
              >
                <HiPhone className="h-5 w-5" />
                Talk to Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
