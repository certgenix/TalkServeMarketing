import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Integrations', href: '/features#integrations' },
      { name: 'How It Works', href: '/#how-it-works' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { name: 'Dental', href: '/dental' },
      { name: 'Restaurants', href: '/restaurants' },
      { name: 'Service Businesses', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'API Docs', href: '/api-docs' },
      { name: 'Status', href: '/status' },
      { name: 'Security', href: '/security' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-display font-bold text-primary">
                TalkServe AI
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your AI receptionist that never sleeps.
              </p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 TalkServe AI — All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
