'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  from: string;
  to: string;
  message: string;
  created_at: string;
  direction: 'incoming' | 'outgoing';
}

interface ConversationResponse {
  success: boolean;
  phone: string;
  totalReturned: number;
  hasMore: boolean;
  nextStartAfter: string;
  messages: Message[];
}

export default function ContactDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const response = await fetch(`/api/conversations?phone=${contactId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data: ConversationResponse = await response.json();
        if (data.success) {
          setMessages(data.messages);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setFetchingMessages(false);
      }
    }

    if (user && contactId) {
      fetchConversations();
    }
  }, [user, contactId]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Conversation</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">+{contactId}</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
          </div>
          
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {fetchingMessages ? (
              <div className="text-center py-8">
                <div className="text-gray-500 dark:text-gray-400">Loading messages...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-500 dark:text-red-400">{error}</div>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">No messages yet</p>
            ) : (
              [...messages].reverse().map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.direction === 'outgoing'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.direction === 'outgoing' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {formatTime(message.created_at)}
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
