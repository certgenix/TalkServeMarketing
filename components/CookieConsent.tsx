'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  analytics: boolean;
  performance: boolean;
  essential: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
    performance: false,
    essential: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      ...preferences,
      essential: true,
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {!showCustomize ? (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Cookies on TalkServe
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              We use cookies to improve your experience and understand basic site usage. You can accept all, continue with only essential cookies, or customize your preferences. For more details, see our{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleEssentialOnly}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="px-5 py-2.5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Choose your cookie settings
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              You can enable or disable non-essential cookies. Essential cookies are always on so TalkServe works correctly.
            </p>

            <div className="space-y-4 mb-6">
              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Analytics cookies</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Help us understand how TalkServe is used</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 text-primary bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Performance cookies</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Help improve reliability and speed</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.performance}
                  onChange={(e) => setPreferences({ ...preferences, performance: e.target.checked })}
                  className="w-5 h-5 text-primary bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg opacity-75">
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Essential cookies</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Required for core site features, always on</p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5 text-primary bg-slate-200 dark:bg-slate-600 border-slate-300 dark:border-slate-600 rounded cursor-not-allowed"
                />
              </label>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              TalkServe does not use cookies for advertising.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
