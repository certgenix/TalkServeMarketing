import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

const plans = [
  {
    name: 'Starter',
    price: '$199',
    period: 'month',
    description: 'Up to 200 calls (~400–600 min)',
    features: ['One number', 'Core integrations', 'Email support'],
    bestFor: 'single-location salons, clinics, and cafés',
  },
  {
    name: 'Professional',
    price: '$449',
    period: 'month',
    description: 'Up to 1,000 calls (~2,000–3,000 min)',
    features: [
      'Three numbers',
      'All integrations (CRM / POS / Booking)',
      'Multi-staff scheduling',
      'Custom voice training',
      'Priority support & advanced analytics',
    ],
    popular: true,
    bestFor: 'growing practices and restaurants',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Unlimited calls and numbers',
    features: [
      'Dedicated success manager',
      'SLA (99.9% uptime)',
      'API access & custom integrations',
      'White-label branding',
      'HIPAA BAA + Canadian data residency',
    ],
  },
];

export default function PricingPreview() {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Pricing
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.15}>
              <div
                className={`rounded-2xl p-8 border-2 h-full flex flex-col ${
                  plan.popular
                    ? 'border-primary bg-blue-50 dark:bg-blue-900/10'
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
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-600 dark:text-slate-400">
                      {' '}/ {plan.period}
                    </span>
                  )}
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <span className="text-green-500 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.bestFor && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Best for: {plan.bestFor}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="text-center space-y-2">
            <p className="text-slate-600 dark:text-slate-400">
              Overage: $0.25 per minute after plan limit.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Guarantee: 30-day money-back • cancel anytime.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all mt-4"
            >
              View full pricing details
              <HiArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
