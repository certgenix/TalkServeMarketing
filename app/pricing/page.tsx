import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import TestimonialCarousel, { Testimonial } from '@/components/TestimonialCarousel';
import Button from '@/components/Button';
import { HiCheckCircle, HiPhone } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Pricing - Affordable AI Receptionist Plans | TalkServe',
  description: 'TalkServe pricing: Starter at $199/mo, Professional at $449/mo, and custom Enterprise plans. 30-day money-back guarantee. Cancel anytime.',
};

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
  return (
    <>
      <HeroSection
        title="Transparent pricing."
        highlightedText="Serious ROI."
        description="Choose the plan that fits your business. Scale as you grow. Typical ROI: $3,000–$5,000 recovered monthly from missed calls."
        imagePath="/images/heroes/Business_growth_and_ROI_14e4879e.png"
        imageAlt="Business growth and ROI"
      />

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 0.15}>
                <div
                  className={`rounded-2xl p-8 border-2 h-full flex flex-col ${
                    plan.popular
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/10 shadow-xl scale-105'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                  }`}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-600 dark:text-slate-400 text-lg">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <HiCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 italic">
                    {plan.bestFor}
                  </p>

                  <a
                    href="/contact"
                    className={`block text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  <strong>Overage:</strong> $0.25 per minute after plan limit
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Guarantee:</strong> 30-day money-back • Cancel anytime
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

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
                href="/contact"
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
