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
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => {
            setIsDialogOpen(true);
            setError(null);
            setSuccess(false);
          }}
          disabled={!isVoiceflowReady}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center group transition-all duration-500 ${
            isVoiceflowReady 
              ? 'cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{
            background: isVoiceflowReady 
              ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)'
              : 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)',
            boxShadow: isVoiceflowReady
              ? '0 8px 16px -4px rgba(37, 99, 235, 0.4), 0 20px 40px -8px rgba(37, 99, 235, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.2)'
              : '0 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(0) scale(1)',
          }}
          onMouseEnter={(e) => {
            if (isVoiceflowReady) {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(37, 99, 235, 0.5), 0 28px 56px -12px rgba(37, 99, 235, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (isVoiceflowReady) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(37, 99, 235, 0.4), 0 20px 40px -8px rgba(37, 99, 235, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseDown={(e) => {
            if (isVoiceflowReady) {
              e.currentTarget.style.transform = 'translateY(2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 8px -2px rgba(37, 99, 235, 0.3), 0 10px 20px -4px rgba(37, 99, 235, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.3)';
            }
          }}
          onMouseUp={(e) => {
            if (isVoiceflowReady) {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(37, 99, 235, 0.5), 0 28px 56px -12px rgba(37, 99, 235, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.2)';
            }
          }}
          aria-label="Talk to AI Assistant"
          title={isVoiceflowReady ? 'Talk to AI Assistant' : 'Loading...'}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
          
          <div className="relative z-10 text-white">
            <HiPhone 
              className={`w-9 h-9 transition-all duration-500 ${
                isVoiceflowReady ? 'group-hover:rotate-12 group-hover:scale-110' : ''
              }`}
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
          
          {isVoiceflowReady && (
            <>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-3 border-white animate-pulse z-20"
                style={{
                  boxShadow: '0 2px 8px rgba(34, 197, 94, 0.6), 0 0 12px rgba(34, 197, 94, 0.4)'
                }}
              ></span>
              <span className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-400/30 rounded-full blur-md animate-pulse"></span>
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-400/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></span>
            </>
          )}
        </button>
      </div>

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
