import Link from 'next/link';

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
      { name: 'Contact', href: '/contact' },
      { name: 'Security', href: '/security' },
    ],
  },
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-display font-bold text-primary">
                TalkServe AI
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your AI receptionist that never sleeps.
              </p>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2025 TalkServe AI — All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
