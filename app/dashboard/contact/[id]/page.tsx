'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const dummyContacts: Record<string, { name: string; number: string }> = {
  '1': { name: 'John Smith', number: '+1 234 567 8901' },
  '2': { name: 'Sarah Johnson', number: '+1 345 678 9012' },
  '3': { name: 'Mike Williams', number: '+1 456 789 0123' },
  '4': { name: 'Emily Brown', number: '+1 567 890 1234' },
  '5': { name: 'David Miller', number: '+1 678 901 2345' },
};

const dummyMessages: Record<string, Array<{ id: string; text: string; time: string; sender: 'user' | 'contact' }>> = {
  '1': [
    { id: '1', text: 'Hi, how are you?', time: '10:30 AM', sender: 'contact' },
    { id: '2', text: 'I am doing great, thanks!', time: '10:32 AM', sender: 'user' },
    { id: '3', text: 'Would you like to schedule a meeting?', time: '10:35 AM', sender: 'contact' },
    { id: '4', text: 'Sure, how about tomorrow at 2 PM?', time: '10:38 AM', sender: 'user' },
    { id: '5', text: 'Perfect, see you then!', time: '10:40 AM', sender: 'contact' },
  ],
  '2': [
    { id: '1', text: 'Hey Sarah!', time: '9:00 AM', sender: 'user' },
    { id: '2', text: 'Hello! How can I help you today?', time: '9:05 AM', sender: 'contact' },
    { id: '3', text: 'I need the project report by Friday.', time: '9:10 AM', sender: 'user' },
    { id: '4', text: 'No problem, I will send it over.', time: '9:12 AM', sender: 'contact' },
  ],
  '3': [
    { id: '1', text: 'Mike, are you available for a call?', time: '2:00 PM', sender: 'user' },
    { id: '2', text: 'Yes, give me 5 minutes.', time: '2:02 PM', sender: 'contact' },
    { id: '3', text: 'Sounds good!', time: '2:03 PM', sender: 'user' },
  ],
  '4': [
    { id: '1', text: 'Emily, did you receive my email?', time: '11:00 AM', sender: 'user' },
    { id: '2', text: 'Yes, I am reviewing it now.', time: '11:15 AM', sender: 'contact' },
    { id: '3', text: 'Let me know if you have questions.', time: '11:20 AM', sender: 'user' },
    { id: '4', text: 'Will do, thanks!', time: '11:22 AM', sender: 'contact' },
    { id: '5', text: 'Everything looks good to me.', time: '11:45 AM', sender: 'contact' },
    { id: '6', text: 'Great, let us proceed then.', time: '11:50 AM', sender: 'user' },
  ],
  '5': [
    { id: '1', text: 'David, quick question about the budget.', time: '3:30 PM', sender: 'user' },
    { id: '2', text: 'Sure, what do you need to know?', time: '3:35 PM', sender: 'contact' },
  ],
};

export default function ContactDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const contact = dummyContacts[contactId];
  const messages = dummyMessages[contactId] || [];

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact not found</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{contact.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.number}</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
          </div>
          
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No messages yet</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
