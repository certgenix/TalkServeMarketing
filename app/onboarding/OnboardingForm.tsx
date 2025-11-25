'use client';

import { useState } from 'react';
import { HiCheckCircle, HiUpload } from 'react-icons/hi';

export default function OnboardingForm() {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    businessName: '',
    businessDescription: '',
    services: '',
    industryType: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (file) {
        formDataToSend.append('businessContext', file);
      }

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          ownerName: '',
          ownerEmail: '',
          businessName: '',
          businessDescription: '',
          services: '',
          industryType: '',
        });
        setFile(null);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl p-12 text-center">
        <HiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Onboarding submitted successfully!
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Your WhatsApp integration will be fully activated and ready to use within the next 24 hours – we&apos;ll notify you the moment it goes live. Thank you for your patience!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary font-semibold hover:underline"
        >
          Submit another form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Owner Name *
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            required
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="ownerEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Owner Email *
          </label>
          <input
            type="email"
            id="ownerEmail"
            name="ownerEmail"
            required
            value={formData.ownerEmail}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            required
            value={formData.businessName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="industryType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Industry or Business Type *
          </label>
          <select
            id="industryType"
            name="industryType"
            required
            value={formData.industryType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select an industry</option>
            <option value="dental">Dental Clinic</option>
            <option value="restaurant">Restaurant</option>
            <option value="healthcare">Healthcare</option>
            <option value="retail">Retail</option>
            <option value="professional-services">Professional Services</option>
            <option value="home-services">Home Services</option>
            <option value="automotive">Automotive</option>
            <option value="hospitality">Hospitality</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="businessDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Business Short Description *
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          required
          rows={4}
          value={formData.businessDescription}
          onChange={handleChange}
          placeholder="Briefly describe your business and what you do..."
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="services" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Services *
        </label>
        <textarea
          id="services"
          name="services"
          required
          rows={4}
          value={formData.services}
          onChange={handleChange}
          placeholder="List the services you offer (e.g., consultations, repairs, appointments, etc.)..."
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="businessContext" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Business Context Document
        </label>
        <div className="mt-2">
          <label
            htmlFor="businessContext"
            className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-slate-800"
          >
            <div className="text-center">
              <HiUpload className="mx-auto h-12 w-12 text-slate-400" />
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {file ? (
                  <span className="font-medium text-primary">{file.name}</span>
                ) : (
                  <>
                    <span className="font-medium text-primary">Click to upload</span>
                    <span> or drag and drop</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                PDF, Word, or Text files up to 10MB
              </p>
            </div>
            <input
              id="businessContext"
              name="businessContext"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Something went wrong. Please try again or contact us at hello@talkserve.ai
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Onboarding'}
      </button>
    </form>
  );
}
