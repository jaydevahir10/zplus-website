import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Globe } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../constants';

const Hero: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'gu'>('en');
  // Track if user has manually interacted to potentially pause auto-rotation (optional enhancement, kept simple as requested)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLang(prev => prev === 'en' ? 'gu' : 'en');
    }, 4000); // Switch every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'gu' : 'en');
  };

  const taglines = {
    en: "Strong Concrete. Reliable Supply. Trusted Results — Every Time.",
    gu: "મજબૂત કોંક્રિટ. વિશ્વસનીય સપ્લાય. વિશ્વાસપાત્ર પરિણામ — હંમેશા."
  };

  return (
    <div id="hero" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-zinc-900 scroll-mt-20 transition-colors duration-500">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615880484791-cad4167e412c?q=80&w=2070&auto=format&fit=crop" 
          alt="Z Plus Concrete Plant" 
          className="w-full h-full object-cover opacity-20 dark:opacity-40 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent dark:from-zinc-900 dark:via-zinc-900/50 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 to-transparent dark:from-zinc-900/80 transition-colors duration-500" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Badge & Language Toggle */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-600/20 border border-primary-200 dark:border-primary-600/30 backdrop-blur-md">
               <span className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-500 animate-pulse"></span>
               <span className="text-primary-700 dark:text-primary-400 text-sm font-bold uppercase tracking-wider">6 Years of Trusted Excellence</span>
            </div>

            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-primary-600 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-500 transition-all flex items-center gap-2 active:scale-95"
            >
              <Globe size={14} />
              {lang === 'en' ? 'EN / GU' : 'GU / EN'}
            </button>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-[1.1]">
            Premium <span className="text-primary-600 dark:text-primary-500">Ready-Mix</span> <br />
            Concrete Supply
          </h1>

          {/* Rotating Tagline */}
          <div className="min-h-[80px] md:min-h-[60px] mb-10 max-w-2xl relative">
            <AnimatePresence mode="wait">
              <motion.h2
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed ${lang === 'gu' ? 'font-sans' : ''}`}
              >
                {taglines[lang]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${PHONE_NUMBER}`}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 text-lg transition-all"
            >
              <Phone size={20} /> Call Now
            </motion.a>

             <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 text-lg transition-all"
            >
              <MessageCircle size={20} /> WhatsApp Order
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 dark:text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;