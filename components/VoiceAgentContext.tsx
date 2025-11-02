'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import VoiceAgentDialog, { ContactFormData } from './VoiceAgentDialog';

interface VoiceAgentContextType {
  openDialog: () => void;
}

const VoiceAgentContext = createContext<VoiceAgentContextType | undefined>(undefined);

export function useVoiceAgent() {
  const context = useContext(VoiceAgentContext);
  if (!context) {
    throw new Error('useVoiceAgent must be used within VoiceAgentProvider');
  }
  return context;
}

export function VoiceAgentProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    consent: false,
  });

  const handleStartCall = async (contactData: ContactFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setFormData(contactData);
    
    try {
      const response = await fetch('/api/outbound-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `${contactData.countryCode}${contactData.phone.replace(/[\s\-\(\)]/g, '')}`,
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Server error. Please try again later.');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        consent: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate call. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setError(null);
    setSuccess(false);
  };

  return (
    <VoiceAgentContext.Provider value={{ openDialog }}>
      {children}
      <VoiceAgentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onStartCall={handleStartCall}
        isLoading={isLoading}
        error={error}
        success={success}
        formData={formData}
        onFormChange={setFormData}
      />
    </VoiceAgentContext.Provider>
  );
}
