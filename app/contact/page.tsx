'use client';

import HeroSection from '@/components/HeroSection';
import { HiPhone } from 'react-icons/hi';
import { useVoiceAgent } from '@/components/VoiceAgentContext';

export default function ContactPage() {
  const { openDialog } = useVoiceAgent();
  
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
          <button 
            onClick={openDialog}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-all duration-250 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
          >
            <HiPhone className="h-5 w-5" />
            Talk to Us
          </button>
        </div>
      </HeroSection>

    </>
  );
}
