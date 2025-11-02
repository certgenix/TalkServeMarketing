'use client';

import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';
import HeroSection from '@/components/HeroSection';
import { HiCheckCircle, HiX, HiPhone } from 'react-icons/hi';
import { useVoiceAgent } from '@/components/VoiceAgentContext';

const painPoints = [
  'Phones ringing during rush hour = missed orders',
  'Noisy kitchen = order errors and angry customers',
  'Closed hours = lost reservations and pre-orders',
];

const advantages = [
  'Takes complete phone orders with custom requests',
  'Manages reservations and waitlists with confirmations',
  'Integrates with Square, Toast, Clover, Lightspeed',
  'Answers menu and allergen questions accurately',
  'Suggests upsells like drinks and desserts',
  'Handles rush hours with unlimited simultaneous calls',
  'Multi-location dashboard for chains and franchises',
];

const exampleCalls = [
  {
    type: 'Order',
    flow: '"I\'d like a large pepperoni with extra cheese." → confirms → suggests combo → gives pickup time.',
  },
  {
    type: 'Reservation',
    flow: '"Table for 4 tomorrow at 7?" → checks availability → books → texts confirmation.',
  },
  {
    type: 'Menu info',
    flow: '"Does your pasta have nuts?" → reads allergen note from menu database.',
  },
  {
    type: 'Catering',
    flow: '"Need food for 30 people." → collects details → alerts manager.',
  },
];

const impacts = [
  '+28% average takeout increase',
  '8–12 hours/week saved for staff',
  '95% order accuracy',
  '+$2,000–$5,000 monthly revenue gain',
];

export default function RestaurantsPage() {
  const { openDialog } = useVoiceAgent();
  
  return (
    <>
      <HeroSection
        title="Never miss a"
        highlightedText="takeout order or reservation again."
        description="TalkServe takes orders, books tables, and answers menu questions—even when your kitchen is packed."
        imagePath="/images/heroes/Upscale_restaurant_interior_scene_7dcdb2a4.png"
        imageAlt="Upscale restaurant interior"
      >
        <div className="mb-8">
          <Button 
            onClick={openDialog}
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
              Pain Points
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((pain, index) => (
              <AnimatedSection key={pain} delay={index * 0.1}>
                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/30">
                  <HiX className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 dark:text-slate-300">{pain}</p>
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
              The TalkServe Advantage
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {advantages.map((advantage, index) => (
              <AnimatedSection key={advantage} delay={index * 0.1}>
                <div className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl p-6">
                  <HiCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 dark:text-slate-300">{advantage}</p>
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
              Example Calls
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {exampleCalls.map((call, index) => (
              <AnimatedSection key={call.type} delay={index * 0.1}>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-primary mb-2">{call.type}:</h3>
                  <p className="text-slate-600 dark:text-slate-400">{call.flow}</p>
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
              Measurable Impact
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {impacts.map((impact, index) => (
              <AnimatedSection key={impact} delay={index * 0.1}>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
                  <p className="text-2xl font-bold text-primary mb-2">
                    {impact.split(' ')[0]}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {impact.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-50 to-slate-50 dark:from-orange-900/20 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
              <blockquote className="text-2xl font-medium text-slate-900 dark:text-white mb-6">
                &ldquo;Friday nights used to be chaos. Now TalkServe handles every call and
                order perfectly. Sales up 30% without extra staff.&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Frank Benedetto
                </p>
                <p className="text-slate-600 dark:text-slate-400">Tony&apos;s Pizzeria</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Focus on food. Let AI handle the phone.
            </h2>
            <Button 
              onClick={openDialog}
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
