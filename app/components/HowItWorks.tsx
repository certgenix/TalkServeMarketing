import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';

const steps = [
  {
    number: '01',
    title: 'Connect your line',
    description: 'Forward your business number to TalkServe.',
  },
  {
    number: '02',
    title: 'Train your agent',
    description: 'We customize its voice, menu, and knowledge base.',
  },
  {
    number: '03',
    title: 'Go live',
    description: 'Start taking real calls within one business day.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center">
          <Button href="/contact" variant="primary" size="lg">
            Get Started Free
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
