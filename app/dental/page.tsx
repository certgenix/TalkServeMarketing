import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';
import HeroSection from '@/components/HeroSection';
import { HiCheckCircle, HiX, HiPhone } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Dental Clinics - AI Receptionist for Dental Practices | TalkServe',
  description: 'TalkServe answers every patient call, books appointments, verifies insurance, and reduces no-shows—24 hours a day. HIPAA-ready for dental practices.',
};

const challenges = [
  'Missed appointment requests during lunch or after hours',
  'Front desk juggling check-ins, insurance, and phones',
  '10–30% no-show rates draining revenue',
  'Emergencies when the office is closed',
];

const solutions = [
  '24/7 appointment scheduling and rescheduling',
  'Automated SMS & email reminders (−60% no-shows)',
  'Insurance information collection & verification',
  'New-patient intake with forms and preferences',
  'Emergency call routing to on-call staff',
  'HIPAA-ready with BAA (Enterprise)',
  'Integrates with Dentrix, Eaglesoft, Open Dental, Curve Dental',
];

const callFlows = [
  {
    scenario: 'New patient',
    flow: '"Do you take Blue Cross?" → checks insurance → books appointment.',
  },
  {
    scenario: 'Reschedule',
    flow: '"Move my Thursday cleaning." → offers times → updates calendar.',
  },
  {
    scenario: 'Emergency',
    flow: '"My crown fell off." → detects urgency → transfers to on-call dentist.',
  },
  {
    scenario: 'FAQ',
    flow: '"Do you offer teeth whitening?" → answers instantly.',
  },
];

export default function DentalPage() {
  return (
    <>
      <HeroSection
        title="A dental receptionist that"
        highlightedText="never takes a break."
        description="TalkServe answers every patient call, books appointments, verifies insurance, and reduces no-shows—24 hours a day."
        imagePath="/images/heroes/Dental_clinic_reception_area_e682dcd1.png"
        imageAlt="Modern dental clinic reception area"
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

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              The TalkServe Solution
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution} delay={index * 0.1}>
                <div className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl p-6">
                  <HiCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 dark:text-slate-300">{solution}</p>
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
              Common Call Flows
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {callFlows.map((flow, index) => (
              <AnimatedSection key={flow.scenario} delay={index * 0.1}>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-primary mb-2">{flow.scenario}:</h3>
                  <p className="text-slate-600 dark:text-slate-400">{flow.flow}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
              <blockquote className="text-2xl font-medium text-slate-900 dark:text-white mb-6">
                &ldquo;Before TalkServe we missed 25 calls a week. Now zero. New patient bookings
                are up 45%, and my staff finally has time for patients in the chair.&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Dr. Michael Torres
                </p>
                <p className="text-slate-600 dark:text-slate-400">Bright Smile Dental</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Give your patients the service they deserve.
            </h2>
            <Button 
              href="/contact"
              size="lg" 
              className="gap-2 bg-white text-primary hover:bg-blue-50"
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
