'use client';

import Link from 'next/link';
import { HiHome, HiArrowLeft } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Page not found
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            <HiHome className="h-5 w-5" />
            Go to homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
