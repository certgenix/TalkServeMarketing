import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';
import { HiGlobe, HiLightningBolt, HiPhone, HiChartBar, HiShieldCheck, HiClock } from 'react-icons/hi';

const features = [
  {
    icon: HiLightningBolt,
    title: 'Natural-sounding voice tuned to your brand',
  },
  {
    icon: HiPhone,
    title: 'Smart routing and escalation',
  },
  {
    icon: HiClock,
    title: 'Unlimited simultaneous calls',
  },
  {
    icon: HiChartBar,
    title: 'Real-time analytics dashboard',
  },
  {
    icon: HiGlobe,
    title: 'Multilingual support (English • French • Spanish • more)',
  },
  {
    icon: HiShieldCheck,
    title: 'HIPAA-ready and Canadian data-residency options',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Features at a Glance
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={index * 0.1} className="h-full">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <p className="text-lg text-slate-700 dark:text-slate-300">
                    {feature.title}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <Button href="/contact" variant="primary" size="lg" className="gap-2">
            <HiPhone className="h-5 w-5" />
            Talk to Us
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
