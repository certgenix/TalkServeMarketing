import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import {
  HiMicrophone,
  HiLightningBolt,
  HiPhone,
  HiCalendar,
  HiMail,
  HiCog,
  HiChartBar,
  HiShieldCheck,
} from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Features - AI Receptionist Capabilities | TalkServe',
  description: 'Explore TalkServe features: natural voice AI, smart call routing, appointment booking, integrations with 50+ platforms, analytics, and enterprise security.',
};

const featureCategories = [
  {
    title: 'Voice & Conversation',
    icon: HiMicrophone,
    features: [
      'Human-like speech with custom voices',
      'Context-aware conversations and interruptions',
      'Multilingual support (EN/FR/ES + 20 others)',
    ],
  },
  {
    title: 'Call Management',
    icon: HiPhone,
    features: [
      '<2s answer time & instant routing',
      'Unlimited simultaneous calls',
      'Call recording & transcription with regional consent',
      'Separate business / after-hours rules',
    ],
  },
  {
    title: 'Scheduling & Booking',
    icon: HiCalendar,
    features: [
      'Real-time calendar sync',
      'Appointment and waitlist management',
      'Multi-staff and multi-location support',
    ],
  },
  {
    title: 'Customer Communication',
    icon: HiMail,
    features: [
      'SMS / email confirmations & reminders',
      'Two-way messaging for changes',
      'Post-appointment follow-ups and review requests',
    ],
  },
  {
    title: 'Integrations',
    icon: HiCog,
    features: [
      'Dentrix • Eaglesoft • Open Dental',
      'Toast • Square • Clover • Lightspeed',
      'HubSpot • Salesforce • Zoho',
      'Jobber • ServiceTitan',
      'Slack • Microsoft Teams',
      'REST API for custom flows',
    ],
  },
  {
    title: 'Analytics & Reporting',
    icon: HiChartBar,
    features: [
      'Real-time dashboard for calls, bookings, revenue',
      'Customer insights and common questions',
      'Exportable reports and custom KPIs',
    ],
  },
  {
    title: 'Security & Compliance',
    icon: HiShieldCheck,
    features: [
      '256-bit encryption and audit logging',
      'Role-based access and SSO (Enterprise)',
      'HIPAA-ready with BAA (US)',
      'PIPEDA/PHIPA-aligned (Canada)',
      'Configurable data retention & regional storage',
      'Built-in call-recording disclosure',
    ],
  },
  {
    title: 'Smart Features',
    icon: HiLightningBolt,
    features: [
      'Natural language understanding',
      'Intelligent call escalation',
      'Automated upselling and recommendations',
      'Custom workflows and scripts',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <HeroSection
        title="Powerful AI. Built for business."
        highlightedText="Simple to use."
        description="Everything you need to handle calls professionally, automatically, and 24/7."
        imagePath="/images/heroes/AI_technology_features_visualization_10b037d0.png"
        imageAlt="AI technology features"
      />

      <section id="integrations" className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {featureCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <AnimatedSection key={category.title} delay={categoryIndex * 0.1}>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                        {category.title}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {category.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                        >
                          <span className="text-primary mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Ready to experience TalkServe?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              See how our AI receptionist can transform your business communications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
              >
                Start Free Trial
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                View Pricing
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
