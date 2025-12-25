import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../constants';

const StickyBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2 h-16">
        <a 
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 active:bg-gray-100 dark:active:bg-zinc-800 transition-colors border-r border-gray-100 dark:border-zinc-800"
        >
          <Phone size={24} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Call Now</span>
        </a>
        
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-[#25D366] active:bg-green-50 dark:active:bg-green-900/10 transition-colors"
        >
          <MessageCircle size={28} className="mb-1 fill-current/20" />
          <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default StickyBar;