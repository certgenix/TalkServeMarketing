import AnimatedSection from '@/components/AnimatedSection';
import { HiArrowTrendingDown, HiUserGroup, HiClock } from 'react-icons/hi2';

const problems = [
  {
    title: 'Lost revenue',
    description: 'Customers hang up after three rings and call your competitor next.',
    icon: HiArrowTrendingDown,
  },
  {
    title: 'Overwhelmed staff',
    description: "Front-desk and floor teams can't do two things at once.",
    icon: HiUserGroup,
  },
  {
    title: 'After-hours gap',
    description: "70% of business calls happen when you're busy or closed.",
    icon: HiClock,
  },
];

export default function MissedCalls() {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
            The Hidden Leak in Your Business
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Every Missed Call Is a Missed Opportunity.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <AnimatedSection key={problem.title} delay={index * 0.1}>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/30">
                  <Icon className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {problem.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center">
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              TalkServe ends that loss—automatically.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
