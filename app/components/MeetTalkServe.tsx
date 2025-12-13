'use client';

import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';
import { HiCheckCircle, HiPhone } from 'react-icons/hi';
import { useVoiceAgent } from '@/components/VoiceAgentContext';

const features = [
  'Answers instantly — no hold music, no voicemail, no missed texts or WhatsApp messages.',
  'Books & takes orders — syncs with your calendar, booking app, or POS across all channels.',
  'Handles FAQs — services, hours, prices, menus, directions — by call, SMS, or WhatsApp.',
  'Confirms & reminds — automated SMS/WhatsApp reminders cut no-shows and missed appointments.',
  'Routes priority cases — urgent calls or messages go directly to your team.',
  'Works 24/7/365 — peak hours, weekends, holidays, and after-hours coverage.',
];

export default function MeetTalkServe() {
  const { openDialog } = useVoiceAgent();
  
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Meet TalkServe
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Your AI receptionist for Voice, SMS & WhatsApp — available 24/7.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <AnimatedSection key={feature} delay={index * 0.1} className="h-full">
              <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl p-6 h-full">
                <HiCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-700 dark:text-slate-300">{feature}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <Button onClick={openDialog} variant="primary" size="lg" className="gap-2">
            <HiPhone className="h-5 w-5" />
            Talk to Us
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
