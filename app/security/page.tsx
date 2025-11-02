'use client';

import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import { HiShieldCheck, HiLockClosed, HiServer, HiDocumentText, HiKey, HiGlobe } from 'react-icons/hi';
import { useVoiceAgent } from '@/components/VoiceAgentContext';

const securityFeatures = [
  {
    icon: HiLockClosed,
    title: 'Encryption & Data Protection',
    features: [
      '256-bit end-to-end encryption',
      'Encrypted data at rest and in transit',
      'Secure API endpoints with authentication',
      'Regular security audits and penetration testing',
    ],
  },
  {
    icon: HiShieldCheck,
    title: 'Compliance & Regulations',
    features: [
      'HIPAA-ready with Business Associate Agreement (US)',
      'PIPEDA/PHIPA-aligned (Canada)',
      'SOC 2 Type II certified',
      'GDPR compliant',
    ],
  },
  {
    icon: HiServer,
    title: 'Infrastructure Security',
    features: [
      'Multi-region data centers with 99.9% uptime SLA',
      'Automatic failover and disaster recovery',
      'DDoS protection and rate limiting',
      'Regular automated backups',
    ],
  },
  {
    icon: HiKey,
    title: 'Access Control',
    features: [
      'Role-based access control (RBAC)',
      'Single Sign-On (SSO) support',
      'Multi-factor authentication (MFA)',
      'Comprehensive audit logging',
    ],
  },
  {
    icon: HiDocumentText,
    title: 'Data Governance',
    features: [
      'Configurable data retention policies',
      'Automated data purging',
      'Data export and portability',
      'Right to deletion compliance',
    ],
  },
  {
    icon: HiGlobe,
    title: 'Regional Compliance',
    features: [
      'Canadian data residency options',
      'US data center availability',
      'EU data hosting (coming soon)',
      'Built-in call-recording consent compliance',
    ],
  },
];

export default function SecurityPage() {
  const { openDialog } = useVoiceAgent();
  
  return (
    <>
      <HeroSection
        title="Enterprise-grade"
        highlightedText="security & compliance"
        description="Your data is protected with industry-leading security standards and comprehensive compliance certifications."
        imagePath="/images/heroes/Enterprise_security_and_compliance_3a6037bc.png"
        imageAlt="Enterprise security and compliance"
        badge={
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">
            <HiShieldCheck className="h-10 w-10 text-primary" />
          </div>
        }
      />

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((category, index) => {
              const Icon = category.icon;
              return (
                <AnimatedSection key={category.title} delay={index * 0.1}>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                        {category.title}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {category.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                        >
                          <HiShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Commitment to Privacy
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              We take your privacy seriously. Your data is never sold, shared, or used for any
              purpose other than providing our service to you.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Security Questions?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Our security team is available to answer any questions about our security
                practices, compliance certifications, or data handling procedures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:security@talkserve.ai"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Security Team
                </a>
                <button
                  onClick={openDialog}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Request Security Documentation
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Trust & Transparency
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              We believe in complete transparency about our security practices. Review our full
              documentation or speak with our team.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/status" className="hover:text-primary transition-colors">
                System Status
              </a>
              <a href="/api-docs" className="hover:text-primary transition-colors">
                API Documentation
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
