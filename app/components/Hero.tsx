'use client';

import Button from '@/components/Button';
import HeroSection from '@/components/HeroSection';
import { HiPhone, HiPlay } from 'react-icons/hi';

export default function Hero() {
  return (
    <HeroSection
      title="Never Miss Another"
      highlightedText="Customer Again"
      description="TalkServe's AI receptionist answers in under two seconds, books appointments or orders, and follows up—24/7. Trusted by dental clinics, restaurants, and service businesses across North America."
      imagePath="/images/heroes/Modern_AI_reception_workspace_d599f705.png"
      imageAlt="Modern AI-powered reception workspace"
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button href="/contact" size="lg" className="gap-2">
          <HiPhone className="h-5 w-5" />
          Call the Live Demo
        </Button>
        <Button href="/contact" variant="outline" size="lg" className="gap-2">
          <HiPlay className="h-5 w-5" />
          Start Free Trial
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
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          Setup in 15 minutes
        </div>
      </div>
    </HeroSection>
  );
}
