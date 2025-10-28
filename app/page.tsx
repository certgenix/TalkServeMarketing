import { Metadata } from 'next';
import Hero from './components/Hero';
import MissedCalls from './components/MissedCalls';
import MeetTalkServe from './components/MeetTalkServe';
import IndustryCards from './components/IndustryCards';
import HowItWorks from './components/HowItWorks';
import Results from './components/Results';
import Features from './components/Features';
import WhyChoose from './components/WhyChoose';
import FinalCTA from './components/FinalCTA';

export const metadata: Metadata = {
  title: 'TalkServe AI - Answer Every Call. Book More Customers.',
  description: "TalkServe's AI receptionist answers in under two seconds, books appointments or orders, and follows up—24/7. Trusted by dental clinics, restaurants, and service businesses across North America.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <MissedCalls />
      <MeetTalkServe />
      <IndustryCards />
      <HowItWorks />
      <Results />
      <Features />
      <WhyChoose />
      <FinalCTA />
    </>
  );
}
