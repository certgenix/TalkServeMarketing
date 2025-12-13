'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';

export default function WelcomePage() {
  const { user } = useAuth();
  const userName = user?.displayName || 'there';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <HiCheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to TalkServe, {userName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your account has been created successfully.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Complete Your Setup
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To get started with your AI-powered agents, please complete the onboarding process. This will help us customize your experience.
            </p>
            <Link
              href="/dashboard/onboarding"
              className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Start Onboarding
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can also access onboarding later from your{' '}
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
              dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
