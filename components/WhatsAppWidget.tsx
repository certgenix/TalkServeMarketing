'use client';

import { IoLogoWhatsapp } from 'react-icons/io';

export default function WhatsAppWidget() {
  const phoneNumber = '+18575243646';
  const message = 'hello';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-36 right-8 z-40">
      <button
        onClick={handleClick}
        className="relative w-16 h-16 rounded-full flex items-center justify-center group transition-all duration-500 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)',
          boxShadow: '0 8px 16px -4px rgba(37, 211, 102, 0.4), 0 20px 40px -8px rgba(37, 211, 102, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(0) scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(37, 211, 102, 0.5), 0 28px 56px -12px rgba(37, 211, 102, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(37, 211, 102, 0.4), 0 20px 40px -8px rgba(37, 211, 102, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.2)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 4px 8px -2px rgba(37, 211, 102, 0.3), 0 10px 20px -4px rgba(37, 211, 102, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.3)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(37, 211, 102, 0.5), 0 28px 56px -12px rgba(37, 211, 102, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.2)';
        }}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 flex items-center justify-center">
          <IoLogoWhatsapp 
            className="w-9 h-9 text-white transition-all duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        
        <span className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-400/30 rounded-full blur-lg animate-pulse"></span>
        <span className="absolute -top-2 -right-2 w-8 h-8 bg-green-400/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></span>
      </button>
    </div>
  );
}
