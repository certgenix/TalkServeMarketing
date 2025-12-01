'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiPhone, FiLoader, FiAlertCircle, FiMessageCircle, FiClock, FiUser, FiCheck, FiCheckCircle } from 'react-icons/fi';

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
  const { user } = useAuth();
  const params = useParams();
  const contactId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>('Customer');

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    const sortedMessages = [...messages].reverse();
    
    sortedMessages.forEach((message) => {
      const date = new Date(message.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)]">
      <div className="bg-white dark:bg-slate-800 rounded-t-2xl shadow-lg border-b border-gray-100 dark:border-slate-700">
        <div className="px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href="/dashboard/customers"
            className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
              <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-gray-900 dark:text-white truncate">
                Conversation
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiPhone className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">+{contactId}</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
            <FiMessageCircle className="w-4 h-4" />
            <span>{messages.length} messages</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 sm:px-6 py-4">
        {fetchingMessages ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <FiMessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">No messages yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Conversations will appear here
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {Object.entries(messageGroups).map(([date, dateMessages]) => (
              <div key={date}>
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full shadow-sm">
                    {formatDate(dateMessages[0].created_at)}
                  </span>
                </div>
                <div className="space-y-3">
                  {dateMessages.map((message, index) => {
                    const isOutgoing = message.direction === 'outgoing';
                    const showTail = index === dateMessages.length - 1 || 
                      dateMessages[index + 1]?.direction !== message.direction;

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`
                            relative max-w-[85%] sm:max-w-[70%] px-4 py-2.5 
                            ${isOutgoing
                              ? `bg-blue-600 text-white ${showTail ? 'rounded-2xl rounded-br-md' : 'rounded-2xl'}`
                              : `bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm ${showTail ? 'rounded-2xl rounded-bl-md' : 'rounded-2xl'}`
                            }
                          `}
                        >
                          <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
                            {message.message}
                          </p>
                          <div className={`flex items-center justify-end gap-1.5 mt-1 ${
                            isOutgoing ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            <span className="text-xs">
                              {formatTime(message.created_at)}
                            </span>
                            {isOutgoing && (
                              <FiCheck className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg border-t border-gray-100 dark:border-slate-700 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="w-4 h-4" />
            <span>This is a read-only conversation view</span>
          </div>
        </div>
      </div>
    </div>
  );
}
