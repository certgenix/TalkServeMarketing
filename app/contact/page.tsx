import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import ContactForm from './ContactForm';
import Button from '@/components/Button';
import { HiPhone } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Contact Us - Get Started with TalkServe AI',
  description: 'Contact TalkServe for sales, support, or partnerships. Call 1-800-TALK-NOW or email us at hello@talkserve.ai.',
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Let's"
        highlightedText="get in touch"
        description="Have questions? Want to see a demo? We're here to help."
        imagePath="/images/heroes/Customer_service_communication_3a46d4c0.png"
        imageAlt="Customer service communication"
      >
        <div className="mb-8">
          <Button 
            href="#contact-form"
            size="lg" 
            className="gap-2"
          >
            <HiPhone className="h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </HeroSection>

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
