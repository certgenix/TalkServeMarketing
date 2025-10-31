'use client';

import { HiX, HiMicrophone, HiVolumeUp } from 'react-icons/hi';

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceChat({ isOpen, onClose }: VoiceChatProps) {

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

        <div className="p-6 h-[600px] flex flex-col">
          <div className="flex-1 relative">
            <iframe
              src={`https://creator.voiceflow.com/prototype/69041b5a9a34d4e2b6a200b2?voiceEnabled=true&modal=false`}
              className="w-full h-full border-0 rounded-lg"
              allow="microphone; clipboard-write"
              title="TalkServe Voice Assistant"
            />
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
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
      </div>
    </div>
  );
}

