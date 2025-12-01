'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FiArrowLeft, 
  FiPhone, 
  FiAlertCircle, 
  FiMessageCircle, 
  FiClock, 
  FiUser, 
  FiCheck, 
  FiCheckCircle,
  FiMoreVertical,
  FiInfo,
  FiRefreshCw
} from 'react-icons/fi';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchConversations = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const response = await fetch(`/api/conversations?phone=${contactId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      const data: ConversationResponse = await response.json();
      if (data.success) {
        setMessages(data.messages);
        setError(null);
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setFetchingMessages(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
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
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return `+${phone}`;
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

  const getLastMessageTime = () => {
    if (messages.length === 0) return null;
    const sortedMessages = [...messages].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return formatDate(sortedMessages[0].created_at);
  };

  return (
    <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-1rem)] bg-gray-50 dark:bg-slate-950">
      <header className="flex-shrink-0 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800 safe-area-top">
        <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link
              href="/dashboard/customers"
              className="p-2 -ml-1 sm:-ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
              aria-label="Back to customers"
            >
              <FiArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                  <FiUser className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h1 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg truncate">
                  Customer Chat
                </h1>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <FiPhone className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate font-medium">{formatPhoneNumber(contactId)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => fetchConversations(true)}
                disabled={isRefreshing}
                className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50"
                aria-label="Refresh messages"
              >
                <FiRefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="hidden sm:flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 px-2.5 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium">
                <FiMessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
                <span>{messages.length}</span>
                <span className="hidden md:inline">messages</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        }}
      >
        <div className="dark:hidden absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        }} />
        <div className="hidden dark:block absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        }} />
        
        <div className="relative min-h-full px-3 sm:px-4 md:px-6 py-4 md:py-6">
          {fetchingMessages ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 border-4 border-blue-100 dark:border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">Loading conversation...</p>
              <p className="mt-1 text-gray-400 dark:text-gray-500 text-xs md:text-sm">Please wait</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <FiAlertCircle className="w-8 h-8 md:w-10 md:h-10 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-base md:text-lg mb-2">Unable to load messages</h3>
              <p className="text-red-600 dark:text-red-400 text-center text-sm md:text-base mb-6 max-w-sm">{error}</p>
              <button 
                onClick={() => {
                  setFetchingMessages(true);
                  fetchConversations();
                }}
                className="px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-medium text-sm md:text-base shadow-lg shadow-blue-500/25 active:scale-95"
              >
                Try Again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-inner">
                <FiMessageCircle className="w-10 h-10 md:w-12 md:h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-base md:text-lg mb-2">No messages yet</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm md:text-base max-w-xs">
                When this customer sends a message, it will appear here
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
              {Object.entries(messageGroups).map(([date, dateMessages]) => (
                <div key={date} className="space-y-3 md:space-y-4">
                  <div className="flex justify-center sticky top-0 z-10 py-2">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-xs md:text-sm font-semibold rounded-full shadow-sm border border-gray-200/50 dark:border-slate-700/50">
                      {formatDate(dateMessages[0].created_at)}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    {dateMessages.map((message, index) => {
                      const isOutgoing = message.direction === 'outgoing';
                      const isFirstInGroup = index === 0 || dateMessages[index - 1]?.direction !== message.direction;
                      const isLastInGroup = index === dateMessages.length - 1 || dateMessages[index + 1]?.direction !== message.direction;

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? 'mt-3 md:mt-4' : ''}`}
                        >
                          <div
                            className={`
                              relative max-w-[85%] sm:max-w-[75%] md:max-w-[70%] px-3.5 py-2.5 sm:px-4 sm:py-3
                              ${isOutgoing
                                ? `bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20
                                   ${isFirstInGroup && isLastInGroup ? 'rounded-2xl rounded-br-lg' : ''}
                                   ${isFirstInGroup && !isLastInGroup ? 'rounded-2xl rounded-br-md' : ''}
                                   ${!isFirstInGroup && isLastInGroup ? 'rounded-2xl rounded-tr-md rounded-br-lg' : ''}
                                   ${!isFirstInGroup && !isLastInGroup ? 'rounded-2xl rounded-r-md' : ''}`
                                : `bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-md border border-gray-100 dark:border-slate-700
                                   ${isFirstInGroup && isLastInGroup ? 'rounded-2xl rounded-bl-lg' : ''}
                                   ${isFirstInGroup && !isLastInGroup ? 'rounded-2xl rounded-bl-md' : ''}
                                   ${!isFirstInGroup && isLastInGroup ? 'rounded-2xl rounded-tl-md rounded-bl-lg' : ''}
                                   ${!isFirstInGroup && !isLastInGroup ? 'rounded-2xl rounded-l-md' : ''}`
                              }
                              transition-all duration-200 hover:scale-[1.01]
                            `}
                          >
                            <p className="text-sm sm:text-[15px] md:text-base whitespace-pre-wrap break-words leading-relaxed">
                              {message.message}
                            </p>
                            <div className={`flex items-center justify-end gap-1 mt-1.5 ${
                              isOutgoing ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'
                            }`}>
                              <span className="text-[10px] sm:text-xs font-medium">
                                {formatTime(message.created_at)}
                              </span>
                              {isOutgoing && (
                                <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </main>

      <footer className="flex-shrink-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 safe-area-bottom">
        <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 md:gap-3 py-2 md:py-3 px-4 md:px-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl md:rounded-2xl border border-gray-200 dark:border-slate-700">
              <FiInfo className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium text-center">
                This is a read-only view of your conversation history
              </p>
            </div>
            
            {messages.length > 0 && (
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-3 md:mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <FiMessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{messages.length} total messages</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <FiClock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>Last activity: {getLastMessageTime()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
