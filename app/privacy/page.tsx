'use client';

import AnimatedSection from '@/components/AnimatedSection';

export default function PrivacyPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Last updated: December, 2024
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                TalkServe (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to handling your information responsibly. This Privacy Policy explains, in simple terms, what information we collect and how we use it when you interact with our website, services, or AI-powered communication tools.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-12">
                If you have any questions, you can contact us anytime at{' '}
                <a href="mailto:support@talkserve.ai" className="text-primary hover:underline">
                  support@talkserve.ai
                </a>
              </p>

              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    1. Information We Collect
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    We collect only the information needed to provide and improve our services.
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Information you provide
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                    <li>Contact details (such as name, email, phone number) when you reach out or sign up.</li>
                    <li>Business information you choose to share so we can configure your TalkServe agent.</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Information generated through use
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                    <li>Call, text, or message logs created when your AI agent interacts with customers.</li>
                    <li>Technical data such as IP address, browser type, and device information.</li>
                    <li>Usage metrics that help us understand performance and reliability.</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Customer conversation content
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    Conversations handled by your TalkServe agent (voice, SMS, WhatsApp) may be processed so the system can respond accurately.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    We do not use your customer conversations to train public models.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    2. How We Use Information
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    We use collected information to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                    <li>Provide and maintain TalkServe services</li>
                    <li>Set up and customize your AI agent</li>
                    <li>Improve accuracy, reliability, and performance</li>
                    <li>Communicate with you about updates or support</li>
                    <li>Maintain security and prevent misuse</li>
                  </ul>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    We do not sell your personal information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    3. How We Share Information
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    We share information only when necessary to operate our service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                    <li>With trusted service providers (e.g., cloud hosting, telecommunications, AI infrastructure)</li>
                    <li>If required by law or to protect the safety of our users and platform</li>
                  </ul>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    We do not share information with marketers or unrelated third parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    4. Data Storage & Retention
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>Data is stored securely using reputable third-party cloud providers.</li>
                    <li>We retain information only for as long as needed to provide services or meet legal requirements.</li>
                    <li>You may contact us if you would like to request deletion of certain information.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    5. Security
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    We take reasonable measures—technical and administrative—to protect information from unauthorized access or misuse.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    No system is perfectly secure, but we continuously work to maintain a safe environment.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    6. Your Choices
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    You can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                    <li>Request corrections to your account information</li>
                    <li>Request deletion of account data where applicable</li>
                    <li>Opt out of non-essential communications</li>
                  </ul>
                  <p className="text-slate-600 dark:text-slate-300">
                    For any request, email{' '}
                    <a href="mailto:support@talkserve.ai" className="text-primary hover:underline">
                      support@talkserve.ai
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    7. Changes to This Policy
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    We may update this Privacy Policy from time to time.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    If changes are significant, we will post an updated version on this page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    8. Contact Us
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    If you have questions or concerns about this Privacy Policy, please contact:
                  </p>
                  <div className="text-slate-600 dark:text-slate-300">
                    <p className="font-semibold">TalkServe</p>
                    <p>
                      Email:{' '}
                      <a href="mailto:support@talkserve.ai" className="text-primary hover:underline">
                        support@talkserve.ai
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
