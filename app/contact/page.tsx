import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
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
          <a 
            href="tel:1-800-TALK-NOW"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-all duration-250 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
          >
            <HiPhone className="h-5 w-5" />
            Contact Us
          </a>
        </div>
      </HeroSection>

    </>
  );
}
