import AnimatedSection from '@/components/AnimatedSection';

const results = [
  {
    company: 'Maple Dental',
    subtitle: '6 chairs',
    before: '22 missed calls a week',
    after: '0 missed calls, +41% bookings',
    stack: 'Open Dental + Google Calendar',
  },
  {
    company: "Tony's Pizzeria",
    subtitle: '',
    before: 'Chaos during rush hour',
    after: '+30% takeout orders, 95% accuracy',
    stack: 'Toast POS',
  },
  {
    company: 'Green Clean Services',
    subtitle: '',
    before: 'Lost leads after hours',
    after: '+45% conversion, −60% no-shows',
    stack: 'HubSpot + Google Calendar',
  },
];

export default function Results() {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Real Results
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <AnimatedSection key={result.company} delay={index * 0.15}>
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                  {result.company}
                  {result.subtitle && (
                    <span className="text-slate-500 dark:text-slate-400 text-base font-normal">
                      {' '}({result.subtitle})
                    </span>
                  )}
                </h3>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Before:</p>
                    <p className="text-slate-700 dark:text-slate-300">{result.before}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">After:</p>
                    <p className="text-primary font-semibold">{result.after}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Stack:</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{result.stack}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
