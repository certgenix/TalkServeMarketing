import AnimatedSection from '@/components/AnimatedSection';
import { HiUserGroup, HiSpeakerphone, HiCheckCircle, HiLockClosed, HiCog } from 'react-icons/hi';

const reasons = [
  {
    icon: HiUserGroup,
    title: 'Live human transfer anytime',
    description: 'From phone, SMS, or WhatsApp conversations.',
  },
  {
    icon: HiSpeakerphone,
    title: 'Handles noise and accents gracefully',
    description: 'Clear understanding across voice and text channels.',
  },
  {
    icon: HiCheckCircle,
    title: 'English & French ready for Canada',
    description: 'Plus optional multilingual expansion.',
  },
  {
    icon: HiLockClosed,
    title: 'Recording consent built in',
    description: 'Secure, compliant call + message handling.',
  },
  {
    icon: HiCog,
    title: 'Works with your existing tools',
    description: 'Calendar, POS, CRM, and messaging integrations.',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Why Businesses Choose TalkServe
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <AnimatedSection key={reason.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {reason.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
