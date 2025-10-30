'use client';

import { useEffect } from 'react';

export default function VoiceflowWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    
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
        }).catch((error) => {
          console.error('Error loading VoiceFlow widget:', error);
        });
      }
    };
    
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
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
