import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

const industries = [
  {
    title: 'Dental Clinics',
    tagline: 'Your receptionist that never takes a break.',
    features: [
      'Schedule patients via call, SMS, or WhatsApp',
      'Send SMS/WhatsApp reminders and confirmations',
      'Route emergencies instantly to your team',
      'HIPAA-ready and PIPEDA-aligned',
    ],
    href: '/dental',
  },
  {
    title: 'Restaurants & Food Service',
    tagline: 'AI that takes your orders — literally.',
    features: [
      'Take phone, SMS, or WhatsApp orders and reservations',
      'POS integration for Square, Toast, and more',
      'Handle rush-hour overflow automatically',
      'Upsell naturally with every conversation',
    ],
    href: '/restaurants',
  },
  {
    title: 'Service Businesses',
    tagline: 'Turn every call or message into a booked appointment.',
    features: [
      'Capture and qualify leads across voice, SMS, and WhatsApp',
      'Book consultations and estimates',
      'Send automated follow-ups, reminders, and review requests',
      'Integrates with Jobber, ServiceTitan, HubSpot',
    ],
    href: '/services',
  },
];

export default function IndustryCards() {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Built for Businesses That Can&apos;t Miss Calls, Texts, or WhatsApp Messages
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <AnimatedSection key={industry.title} delay={index * 0.15}>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all duration-300 h-full flex flex-col">
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  {industry.title}
                </h3>
                <p className="text-primary font-medium mb-6">&ldquo;{industry.tagline}&rdquo;</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {industry.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                    >
                      <span className="text-primary mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={industry.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  See {industry.title.split(' ')[0]} Playbook
                  <HiArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
