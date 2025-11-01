import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';
import HeroSection from '@/components/HeroSection';
import { HiCheckCircle, HiX, HiPhone } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Service Businesses - AI Appointment Booking for Service Providers | TalkServe',
  description: 'TalkServe captures every lead and schedules every job—so you never lose business to a missed call. Perfect for salons, HVAC, plumbing, and more.',
};

const challenges = [
  'Leads lost when no one answers',
  'After-hours inquiries unattended',
  'Double bookings and no-shows',
  'Repetitive questions draining time',
];

const solutions = [
  'Books appointments from live calendars',
  'Captures and qualifies leads (24/7)',
  'Answers service and pricing questions',
  'Collects estimate and project details',
  'Routes calls by service or staff availability',
  'Automates follow-ups and review requests',
  'Integrates with HubSpot, Salesforce, Jobber, ServiceTitan',
];

const realWorldCalls = [
  {
    type: 'HVAC emergency',
    flow: '"AC stopped working." → books urgent visit → texts arrival time.',
  },
  {
    type: 'Salon',
    flow: '"Need a cut and colour." → shows stylist slots → books appointment.',
  },
  {
    type: 'Legal',
    flow: '"Contract dispute." → qualifies lead → schedules consultation.',
  },
  {
    type: 'Plumbing',
    flow: '"Leak under sink." → asks diagnostic questions → sets estimate.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title="Turn every call into a"
        highlightedText="booked appointment."
        description="TalkServe captures every lead and schedules every job—so you never lose business to a missed call again."
        imagePath="/images/heroes/Clean_professional_workspace_no_text_75f2c21f.png"
        imageAlt="Clean professional workspace with appointment scheduling"
      >
        <div className="mb-8">
          <Button 
            href="/contact"
            size="lg" 
            className="gap-2"
          >
            <HiPhone className="h-5 w-5" />
            Talk to Us
          </Button>
        </div>
      </HeroSection>

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-8">
              Perfect For
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Salons',
                'Spas',
                'HVAC',
                'Plumbing',
                'Auto Repair',
                'Cleaning',
                'Law Firms',
                'Medical Clinics',
                'Fitness Studios',
                'Pet Grooming',
                'Home Services',
              ].map((industry, index) => (
                <AnimatedSection key={industry} delay={index * 0.05}>
                  <span className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium">
                    {industry}
                  </span>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              The Challenge
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {challenges.map((challenge, index) => (
              <AnimatedSection key={challenge} delay={index * 0.1}>
                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/30">
                  <HiX className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 dark:text-slate-300">{challenge}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              The TalkServe Solution
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution} delay={index * 0.1}>
                <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <HiCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 dark:text-slate-300">{solution}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Real-World Calls
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {realWorldCalls.map((call, index) => (
              <AnimatedSection key={call.type} delay={index * 0.1}>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-primary mb-2">{call.type}:</h3>
                  <p className="text-slate-600 dark:text-slate-400">{call.flow}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Results Snapshot
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/30">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Before
                </h3>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li>• 30–40% calls missed</li>
                  <li>• 10 hours/week lost</li>
                  <li>• 20% no-shows</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-8 border border-green-100 dark:border-green-900/30">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  After
                </h3>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li>• 100% answer rate</li>
                  <li>• +45% lead conversion</li>
                  <li>• No-shows cut to 5–8%</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-50 to-slate-50 dark:from-green-900/20 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
              <blockquote className="text-2xl font-medium text-slate-900 dark:text-white mb-6">
                &ldquo;TalkServe books jobs while I&apos;m cleaning. It handles pricing questions
                and rescheduling. My business has grown 50% in six months.&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Maria Rodriguez
                </p>
                <p className="text-slate-600 dark:text-slate-400">Green Clean Services</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Stop losing business to missed calls.
            </h2>
            <Button 
              href="/contact"
              variant="secondary"
              size="lg" 
              className="gap-2 bg-white text-primary dark:text-primary hover:bg-blue-50"
            >
              <HiPhone className="h-5 w-5" />
              Talk to Us
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
