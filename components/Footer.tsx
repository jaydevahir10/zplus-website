import React from 'react';
import { Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-white pt-16 pb-8 border-t border-gray-200 dark:border-zinc-900 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="flex items-center gap-4">
            {/* Branded Logo */}
            <div className="relative w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                <div className="relative z-10 flex items-baseline gap-0.5 pt-1">
                  <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">Z</span>
                  <span className="font-display text-2xl font-bold text-primary-600">+</span>
                </div>
                 {/* Subtle loading bar for footer too */}
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-zinc-800">
                  <motion.div 
                    className="h-full w-1/2 bg-primary-600/50"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
            </div>
             <div>
               <h3 className="font-display font-bold text-2xl tracking-wide text-gray-900 dark:text-white">
                 Z PLUS <span className="text-primary-600">CONCRETE</span>
               </h3>
               <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Premium Quality Supply</p>
             </div>
          </div>

          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all shadow-sm"><Facebook size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all shadow-sm"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all shadow-sm"><Linkedin size={20} /></a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Z Plus Ready Mix Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={scrollToTop} className="flex items-center gap-1 hover:text-primary-600 transition-colors font-semibold">
              Back to Top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;