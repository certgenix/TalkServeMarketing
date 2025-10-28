import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import ContactForm from './ContactForm';
import { HiMail, HiPhone, HiUserGroup, HiGlobe } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Contact Us - Get Started with TalkServe AI',
  description: 'Contact TalkServe for sales, support, or partnerships. Call 1-800-TALK-NOW or email us at hello@talkserve.ai.',
};

const contactMethods = [
  {
    icon: HiUserGroup,
    title: 'Sales',
    description: 'Ready to get started? Talk to our sales team.',
    email: 'sales@talkserve.ai',
    phone: '1-800-TALK-NOW',
    action: 'Schedule a Demo',
    actionHref: '#contact-form',
  },
  {
    icon: HiMail,
    title: 'Support',
    description: 'Need help? Our support team is here for you.',
    email: 'support@talkserve.ai',
    website: 'help.talkserve.ai',
    action: 'Visit Help Center',
    actionHref: 'https://help.talkserve.ai',
  },
  {
    icon: HiGlobe,
    title: 'Partnerships',
    description: 'Interested in partnering with TalkServe?',
    email: 'partners@talkserve.ai',
    action: 'Learn More',
    actionHref: '#contact-form',
  },
  {
    icon: HiPhone,
    title: 'General Enquiries',
    description: 'Any other questions? We\'d love to hear from you.',
    email: 'hello@talkserve.ai',
    action: 'Send a Message',
    actionHref: '#contact-form',
  },
];

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Let's"
        highlightedText="get in touch"
        description="Have questions? Want to see a demo? We're here to help."
        imagePath="/images/heroes/Customer_service_communication_3a46d4c0.png"
        imageAlt="Customer service communication"
      />

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <AnimatedSection key={method.title} delay={index * 0.1}>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                        {method.title}
                      </h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {method.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {method.email && (
                        <p className="text-slate-700 dark:text-slate-400">
                          <a
                            href={`mailto:${method.email}`}
                            className="text-primary hover:underline"
                          >
                            {method.email}
                          </a>
                        </p>
                      )}
                      {method.phone && (
                        <p className="text-slate-700 dark:text-slate-400">
                          {method.phone}
                        </p>
                      )}
                      {method.website && (
                        <p className="text-slate-700 dark:text-slate-400">
                          <a
                            href={`https://${method.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {method.website}
                          </a>
                        </p>
                      )}
                    </div>
                    <a
                      href={method.actionHref}
                      className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
                    >
                      {method.action} →
                    </a>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <div id="contact-form">
            <AnimatedSection delay={0.4}>
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    Send us a message
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
