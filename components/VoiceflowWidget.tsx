'use client';

import { useEffect, useState } from 'react';
import { HiPhone } from 'react-icons/hi';
import VoiceAgentDialog, { ContactFormData } from './VoiceAgentDialog';

export default function VoiceflowWidget() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVoiceflowReady, setIsVoiceflowReady] = useState(false);
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

  useEffect(() => {
    // Check if VoiceFlow is already loaded
    if (window.voiceflow) {
      setIsVoiceflowReady(true);
      if (window.voiceflow.chat) {
        window.voiceflow.chat.hide();
      }
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget/bundle.mjs"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    
    script.onload = function() {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: '68fefba0d1616ac2a90e5bb4' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant: {
            title: "TalkServe AI Assistant",
            description: "How can I help you today?",
            color: "#2563EB",
            persistence: 'localStorage'
          },
          render: {
            mode: 'overlay'
          }
        }).then(() => {
          console.log('VoiceFlow voice agent loaded successfully');
          setIsVoiceflowReady(true);
          
          if (window.voiceflow?.chat) {
            window.voiceflow.chat.hide();
          }
        }).catch((error) => {
          console.error('Error loading VoiceFlow widget:', error);
        });
      }
    };
    
    document.head.appendChild(script);
  }, []);

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

  return (
    <>
      <button
        onClick={() => {
          setIsDialogOpen(true);
          setError(null);
          setSuccess(false);
        }}
        disabled={!isVoiceflowReady}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-primary to-primary-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group ${
          isVoiceflowReady 
            ? 'hover:from-primary-600 hover:to-primary-800 hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        aria-label="Talk to AI Assistant"
        title={isVoiceflowReady ? 'Talk to AI Assistant' : 'Loading...'}
      >
        <HiPhone className={`w-7 h-7 transition-transform duration-300 ${isVoiceflowReady ? 'group-hover:rotate-12' : ''}`} />
        {isVoiceflowReady && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

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
    </>
  );
}

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => Promise<void>;
        open: () => void;
        close: () => void;
        hide: () => void;
        show: () => void;
        interact: (action: any) => void;
        proactive: {
          clear: () => void;
          push: (message: any) => void;
        };
      };
    };
  }
}
