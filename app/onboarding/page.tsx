import OnboardingForm from './OnboardingForm';

export const metadata = {
  title: 'Business Onboarding | TalkServe',
  description: 'Get started with TalkServe AI receptionist for your business',
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Business Onboarding
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Tell us about your business so we can customize TalkServe AI receptionist to meet your needs
          </p>
        </div>

        <OnboardingForm />
      </div>
    </main>
  );
}
