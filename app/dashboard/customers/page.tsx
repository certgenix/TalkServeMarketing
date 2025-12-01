'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiSearch, FiLoader, FiAlertCircle, FiUsers, FiPhone, FiMessageCircle, FiChevronRight, FiFilter } from 'react-icons/fi';

interface Customer {
  id: string;
  waId: number;
  name: string;
  experience: string;
}

interface ApiResponse {
  success: boolean;
  data: Customer[];
  pagination: {
    totalReturned: number;
    hasMore: boolean;
    nextStartAfter: string;
  };
}

type FilterType = 'all' | 'positive' | 'negative' | 'neutral';

export default function CustomersPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [fetchingCustomers, setFetchingCustomers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceFilter, setExperienceFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      if (!user?.uid) return;
      
      try {
        const response = await fetch(`/api/customers?uid=${user.uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data: ApiResponse = await response.json();
        if (data.success) {
          setCustomers(data.data);
          setFilteredCustomers(data.data);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again later.');
      } finally {
        setFetchingCustomers(false);
      }
    }

    fetchCustomers();
  }, [user]);

  useEffect(() => {
    let filtered = customers;

    if (searchQuery) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(customer.waId).includes(searchQuery)
      );
    }

    if (experienceFilter !== 'all') {
      filtered = filtered.filter(
        (customer) => customer.experience.toLowerCase() === experienceFilter
      );
    }

    setFilteredCustomers(filtered);
  }, [searchQuery, experienceFilter, customers]);

  const getExperienceBadgeColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case 'positive':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'negative':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
      case 'neutral':
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

  const stats = {
    total: customers.length,
    positive: customers.filter(c => c.experience.toLowerCase() === 'positive').length,
    negative: customers.filter(c => c.experience.toLowerCase() === 'negative').length,
    neutral: customers.filter(c => c.experience.toLowerCase() === 'neutral').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and view your customer interactions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => setExperienceFilter('all')}
            className={`p-4 rounded-xl transition-all ${
              experienceFilter === 'all' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-white dark:bg-slate-800 hover:shadow-md'
            }`}
          >
            <div className={`text-2xl font-bold ${experienceFilter === 'all' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {stats.total}
            </div>
            <div className={`text-xs ${experienceFilter === 'all' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              All Customers
            </div>
          </button>
          <button
            onClick={() => setExperienceFilter('positive')}
            className={`p-4 rounded-xl transition-all ${
              experienceFilter === 'positive' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25' 
                : 'bg-white dark:bg-slate-800 hover:shadow-md'
            }`}
          >
            <div className={`text-2xl font-bold ${experienceFilter === 'positive' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {stats.positive}
            </div>
            <div className={`text-xs ${experienceFilter === 'positive' ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'}`}>
              Positive
            </div>
          </button>
          <button
            onClick={() => setExperienceFilter('neutral')}
            className={`p-4 rounded-xl transition-all ${
              experienceFilter === 'neutral' 
                ? 'bg-slate-600 text-white shadow-lg shadow-slate-600/25' 
                : 'bg-white dark:bg-slate-800 hover:shadow-md'
            }`}
          >
            <div className={`text-2xl font-bold ${experienceFilter === 'neutral' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>
              {stats.neutral}
            </div>
            <div className={`text-xs ${experienceFilter === 'neutral' ? 'text-slate-200' : 'text-gray-500 dark:text-gray-400'}`}>
              Neutral
            </div>
          </button>
          <button
            onClick={() => setExperienceFilter('negative')}
            className={`p-4 rounded-xl transition-all ${
              experienceFilter === 'negative' 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' 
                : 'bg-white dark:bg-slate-800 hover:shadow-md'
            }`}
          >
            <div className={`text-2xl font-bold ${experienceFilter === 'negative' ? 'text-white' : 'text-red-600 dark:text-red-400'}`}>
              {stats.negative}
            </div>
            <div className={`text-xs ${experienceFilter === 'negative' ? 'text-red-100' : 'text-gray-500 dark:text-gray-400'}`}>
              Negative
            </div>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone number..."
              className="pl-12 pr-4 py-3 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        {fetchingCustomers ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading customers...</p>
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
        ) : filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <FiUsers className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {searchQuery || experienceFilter !== 'all' ? 'No customers found matching your filters.' : 'No customers yet.'}
            </p>
            {(searchQuery || experienceFilter !== 'all') && (
              <button 
                onClick={() => { setSearchQuery(''); setExperienceFilter('all'); }}
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
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FiPhone className="w-4 h-4" />
                          <span>+{customer.waId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${getExperienceBadgeColor(customer.experience)}`}>
                          <span>{getExperienceIcon(customer.experience)}</span>
                          {customer.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/dashboard/customers/${customer.id}/chats`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 group-hover:scale-105"
                        >
                          <FiMessageCircle className="w-4 h-4" />
                          View Chat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden divide-y divide-gray-100 dark:divide-slate-700">
              {filteredCustomers.map((customer) => (
                <Link
                  key={customer.id}
                  href={`/dashboard/customers/${customer.id}/chats`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors active:bg-gray-100 dark:active:bg-slate-700/50"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{customer.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${getExperienceBadgeColor(customer.experience)}`}>
                        {getExperienceIcon(customer.experience)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FiPhone className="w-3 h-3" />
                      +{customer.waId}
                    </p>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {!fetchingCustomers && !error && filteredCustomers.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      )}
    </div>
  );
}
