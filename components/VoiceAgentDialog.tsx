'use client';

import { useState, useEffect } from 'react';
import { HiX, HiPhone, HiChevronDown } from 'react-icons/hi';

interface VoiceAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
  formData: ContactFormData;
  onFormChange: (data: ContactFormData) => void;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  consent: boolean;
}

const COUNTRIES = [
  { code: '+1', flag: '🇺🇸', country: 'US' },
  { code: '+1', flag: '🇨🇦', country: 'CA' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
];

export default function VoiceAgentDialog({ isOpen, onClose, onStartCall, isLoading = false, error = null, success = false, formData, onFormChange }: VoiceAgentDialogProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  useEffect(() => {
    if (success) {
      setErrors({});
    }
  }, [success]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must consent to receive AI automated calls';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onStartCall(formData);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    onFormChange({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  // Success state - show minimal dialog
  if (success) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Call Initiated Successfully!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You should receive a call shortly.
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-agent-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HiX className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
              <HiPhone className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 id="voice-agent-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                Talk to Our AI Assistant
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Our AI agent will call you back on the number provided
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.firstName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
                  } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-4 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.lastName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
                  } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-4 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
                } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-4 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="flex gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 ${
                      errors.phone 
                        ? 'border-red-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 hover:border-primary transition-all min-w-[120px] outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary`}
                  >
                    <span className="text-2xl">{COUNTRIES.find(c => c.code === formData.countryCode)?.flag || '🇨🇦'}</span>
                    <span className="text-sm font-semibold">{formData.countryCode || '+1'}</span>
                    <HiChevronDown className={`w-4 h-4 ml-auto transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showCountryDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowCountryDropdown(false)}
                      />
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-20 overflow-hidden">
                        {COUNTRIES.map((country, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              handleChange('countryCode', country.code);
                              setShowCountryDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-0"
                          >
                            <span className="text-2xl">{country.flag}</span>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">{country.country}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{country.code}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
                  } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-4 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none`}
                  placeholder="780 200 6604"
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone}</p>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleChange('consent', e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-600 text-primary focus:ring-4 focus:ring-primary/20 transition-all cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  I consent to receive AI automated calls from TalkServe for the purpose of assistance and support. 
                  I understand that I can opt out at any time.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-xs text-red-500 font-medium">{errors.consent}</p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-primary to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Initiating Call...
                </>
              ) : (
                <>
                  <HiPhone className="w-5 h-5" />
                  Start Voice Call
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
