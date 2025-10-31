'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import HeroSection from '@/components/HeroSection';
import VoiceChat from '@/components/VoiceChat';
import { HiPhone, HiPlay } from 'react-icons/hi';

export default function Hero() {
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

  return (
    <>
      <HeroSection
        title="Never Miss Another"
        highlightedText="Customer Again"
        description="TalkServe's AI receptionist answers in under two seconds, books appointments or orders, and follows up—24/7. Trusted by dental clinics, restaurants, and service businesses across North America."
        imagePath="/images/heroes/Modern_AI_reception_workspace_d599f705.png"
        imageAlt="Modern AI-powered reception workspace"
      >
        <div className="mb-8">
          <Button 
            onClick={() => setIsVoiceChatOpen(true)} 
            size="lg" 
            className="gap-2"
          >
            <HiPhone className="h-5 w-5" />
            Talk to us
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            24/7 coverage
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Works with your systems
          </div>
        </div>
      </HeroSection>

      <VoiceChat 
        isOpen={isVoiceChatOpen} 
        onClose={() => setIsVoiceChatOpen(false)} 
      />
    </>
  );
}
