'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiCalendar, FiMessageCircle, FiLoader, FiAlertCircle, FiExternalLink } from 'react-icons/fi';

interface ChatSession {
  id: string;
  date: string;
  customerName: string;
  experience: string;
  summary: string;
  messageCount: number;
}

interface Customer {
  id: string;
  waId: number;
  name: string;
  experience: string;
}

export default function CustomerChatsPage() {
  const { user } = useAuth();
  const params = useParams();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function fetchCustomerData() {
      if (!user?.uid) return;
      
      try {
        const response = await fetch(`/api/customers?uid=${user.uid}`);
        if (!response.ok) throw new Error('Failed to fetch customer');
        
        const data = await response.json();
        if (data.success) {
          const foundCustomer = data.data.find((c: Customer) => c.id === customerId);
          if (foundCustomer) {
            setCustomer(foundCustomer);
            await fetchChatSessions(foundCustomer);
          } else {
            setError('Customer not found');
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError('Failed to load customer data');
        setLoading(false);
      }
    }

    async function fetchChatSessions(customerData: Customer) {
      try {
        const response = await fetch(`/api/conversations?phone=${customerData.waId}`);
        if (!response.ok) throw new Error('Failed to fetch conversations');
        
        const data = await response.json();
        if (data.success && data.messages) {
          const sessions = groupMessagesIntoSessions(data.messages, customerData);
          setChatSessions(sessions);
          setFilteredSessions(sessions);
        }
      } catch (err) {
        console.error('Error fetching chat sessions:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, [user, customerId]);

  const groupMessagesIntoSessions = (messages: any[], customerData: Customer): ChatSession[] => {
    if (!messages || messages.length === 0) return [];

    const sessionMap: { [key: string]: any[] } = {};
    
    messages.forEach((msg) => {
      const date = new Date(msg.created_at).toDateString();
      if (!sessionMap[date]) {
        sessionMap[date] = [];
      }
      sessionMap[date].push(msg);
    });

    return Object.entries(sessionMap).map(([date, msgs], index) => {
      const firstMsg = msgs[msgs.length - 1];
      const lastMsg = msgs[0];
      
      const summaryText = msgs.slice(0, 3).map(m => m.message).join(' ').substring(0, 100);
      
      return {
        id: `session-${index}-${new Date(date).getTime()}`,
        date: firstMsg.created_at,
        customerName: customerData.name,
        experience: customerData.experience,
        summary: summaryText + (summaryText.length >= 100 ? '...' : ''),
        messageCount: msgs.length,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  useEffect(() => {
    let filtered = chatSessions;

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter(session => new Date(session.date) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(session => new Date(session.date) <= end);
    }

    setFilteredSessions(filtered);
  }, [startDate, endDate, chatSessions]);

  const getExperienceBadgeColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case 'positive':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'negative':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
    }
  };

  const getExperienceIcon = (experience: string) => {
    switch (experience.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/customers"
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {customer?.name || 'Customer'} - Chats
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View all chat sessions with this customer
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiCalendar className="w-5 h-5" />
              <span className="font-medium">Date Range Filter</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors self-end"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading chat sessions...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <FiMessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {startDate || endDate ? 'No chats found in the selected date range.' : 'No chat sessions yet.'}
            </p>
            {(startDate || endDate) && (
              <button 
                onClick={clearFilters}
                className="mt-4 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Summary
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{formatDate(session.date)}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {session.messageCount} messages
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                            {session.customerName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {session.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${getExperienceBadgeColor(session.experience)}`}>
                          <span>{getExperienceIcon(session.experience)}</span>
                          {session.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                          {session.summary}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/dashboard/contact/${customer?.waId}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 group-hover:scale-105"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Open Chat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden divide-y divide-gray-100 dark:divide-slate-700">
              {filteredSessions.map((session) => (
                <div key={session.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {session.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{session.customerName}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(session.date)}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getExperienceBadgeColor(session.experience)}`}>
                      {getExperienceIcon(session.experience)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {session.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {session.messageCount} messages
                    </span>
                    <Link
                      href={`/dashboard/contact/${customer?.waId}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Open Chat
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {!loading && !error && filteredSessions.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredSessions.length} of {chatSessions.length} chat sessions
        </div>
      )}
    </div>
  );
}
