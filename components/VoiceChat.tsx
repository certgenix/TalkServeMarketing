'use client';

import { useEffect, useState } from 'react';
import { HiX, HiMicrophone, HiVolumeUp } from 'react-icons/hi';

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceChat({ isOpen, onClose }: VoiceChatProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVoiceflowReady, setIsVoiceflowReady] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget/bundle.mjs"]');
    
    if (window.voiceflowVoice) {
      setIsVoiceflowReady(true);
      setIsLoading(false);
      window.voiceflowVoice.chat.open();
      return;
    }

    if (existingScript) {
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    
    script.onload = () => {
      if (window.voiceflowVoice) {
        window.voiceflowVoice.chat.load({
          verify: { projectID: '69041b5a9a34d4e2b6a200b2' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: '69041b5a9a34d4e2b6a200b3',
          assistant: {
            title: 'TalkServe Voice Assistant',
            description: 'Start speaking to chat with our AI',
            color: '#2563EB',
            avatar: 'https://s3.amazonaws.com/com.voiceflow.studio/share/voiceflow-icon.png',
          },
          render: {
            mode: 'embedded',
          },
          autostart: true,
        }).then(() => {
          console.log('VoiceFlow voice chat loaded successfully');
          setIsVoiceflowReady(true);
          setIsLoading(false);
          
          if (window.voiceflowVoice?.chat) {
            window.voiceflowVoice.chat.open();
          }
        }).catch((error) => {
          console.error('Error loading VoiceFlow voice chat:', error);
          setIsLoading(false);
        });
      }
    };
    
    document.head.appendChild(script);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && window.voiceflowVoice?.chat) {
      window.voiceflowVoice.chat.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary to-primary-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <HiMicrophone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Voice Chat</h2>
              <p className="text-sm text-blue-100">Talk to our AI assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close voice chat"
          >
            <HiX className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 min-h-[500px] flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading voice assistant...</p>
            </div>
          ) : (
            <div className="w-full">
              <div id="voiceflow-voice-chat" className="w-full min-h-[400px]"></div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <HiVolumeUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <p className="font-medium mb-1">How to use:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>Click the microphone button to start speaking</li>
                      <li>Ask questions about our services</li>
                      <li>Book appointments or get information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    voiceflowVoice: {
      chat: {
        load: (config: any) => Promise<void>;
        open: () => void;
        close: () => void;
        hide: () => void;
        show: () => void;
      };
    };
  }
}
