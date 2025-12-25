import React, { useState, useEffect } from 'react';
import { Truck, Moon, Sun, Menu, X, Phone, ChevronDown, Mail, MessageCircle, Info, Target, History } from 'lucide-react';
import { PHONE_NUMBER, EMAIL_ADDRESS, WHATSAPP_LINK } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: 'home' | 'gallery';
  setCurrentPage: (page: 'home' | 'gallery') => void;
  onNavigate: (callback: () => void) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, currentPage, setCurrentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handler for navigation with loading transition
  const handleNavClick = (view: 'home' | 'gallery', href?: string) => {
    onNavigate(() => {
      // 1. Switch View
      setCurrentPage(view);
      
      // 2. Handle Scroll if needed
      // Logic runs after loader covers screen, but before loader disappears
      if (href && href.startsWith('#')) {
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'auto' });
          } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        }, 100);
      } else if (view === 'home' && !href) {
         window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (view === 'gallery') {
         window.scrollTo({ top: 0, behavior: 'auto' });
      }
      
      closeMenu();
    });
  };

  const navLinks = [
    { name: 'Home', action: () => handleNavClick('home', '#hero') },
    { 
      name: 'Services', 
      dropdown: [
        { name: 'M20 Concrete', action: () => handleNavClick('home', '#m20') },
        { name: 'M25 Concrete', action: () => handleNavClick('home', '#m25') },
        { name: 'M30 Concrete', action: () => handleNavClick('home', '#m30') },
        { name: 'M35 Concrete', action: () => handleNavClick('home', '#m35') },
        { name: 'Custom Mix', action: () => handleNavClick('home', '#custom') },
      ]
    },
    { 
      name: 'About', 
      dropdown: [
        { name: 'Company Profile', action: () => handleNavClick('home', '#about-profile'), icon: <Info size={14}/> },
        { name: 'Our Experience', action: () => handleNavClick('home', '#about-stats'), icon: <History size={14}/> },
        { name: 'Scope of Work', action: () => handleNavClick('home', '#about-scope'), icon: <Target size={14}/> },
      ]
    },
    { name: 'Gallery', action: () => handleNavClick('gallery') },
    { 
      name: 'Contact', 
      dropdown: [
        { name: `Call: +91 ${PHONE_NUMBER}`, href: `tel:${PHONE_NUMBER}`, icon: <Phone size={14} /> },
        { name: 'WhatsApp Support', href: WHATSAPP_LINK, icon: <MessageCircle size={14} /> },
        { name: `Email: ${EMAIL_ADDRESS}`, href: `mailto:${EMAIL_ADDRESS}`, icon: <Mail size={14} /> },
      ]
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[110] transition-all duration-500 ${
          scrolled || isOpen || currentPage === 'gallery'
            ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xl border-b border-gray-200 dark:border-zinc-800 h-20' 
            : 'bg-transparent h-24 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Brand Logo - Animated Z+ Loader Style */}
            <button onClick={() => handleNavClick('home', '#hero')} className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-11 h-11 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden group-hover:border-primary-600 transition-colors">
                <div className="relative z-10 flex items-baseline gap-0.5 pt-0.5">
                  <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">Z</span>
                  <span className="font-display text-2xl font-bold text-primary-600">+</span>
                </div>
                
                {/* Loading Bar Animation */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-zinc-800">
                  <motion.div 
                    className="h-full w-1/2 bg-primary-600"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start justify-center text-left">
                <h1 className="font-display text-2xl font-bold leading-none tracking-wider text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  Z PLUS
                </h1>
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary-600 dark:text-primary-400 uppercase -mt-0.5 ml-0.5">
                  CONCRETE
                </span>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative group/parent">
                    {link.dropdown ? (
                      <div 
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(link.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all group">
                          {link.name}
                          <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute left-0 top-full pt-2 w-64 z-[120]"
                            >
                              <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-xl border border-gray-100 dark:border-zinc-800 py-2 overflow-hidden">
                                {link.dropdown.map((sub: any) => (
                                  sub.href ? (
                                    <a
                                      key={sub.name}
                                      href={sub.href}
                                      target={sub.href.startsWith('http') ? '_blank' : undefined}
                                      rel={sub.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                      className="flex items-center gap-3 px-5 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                                    >
                                      {sub.icon && <span className="text-primary-600">{sub.icon}</span>}
                                      {sub.name}
                                    </a>
                                  ) : (
                                    <button
                                      key={sub.name}
                                      onClick={sub.action}
                                      className="w-full text-left flex items-center gap-3 px-5 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                                    >
                                      {sub.icon && <span className="text-primary-600">{sub.icon}</span>}
                                      {sub.name}
                                    </button>
                                  )
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={link.action}
                        className={`px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all relative group/link ${
                          (link.name === 'Home' && currentPage === 'home') || (link.name === 'Gallery' && currentPage === 'gallery')
                            ? 'text-primary-600 dark:text-primary-500' 
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500'
                        }`}
                      >
                        {link.name}
                        <span className={`absolute bottom-1 left-4 h-0.5 bg-primary-600 transition-all duration-300 ${
                           (link.name === 'Home' && currentPage === 'home') || (link.name === 'Gallery' && currentPage === 'gallery')
                             ? 'w-[calc(100%-32px)]' 
                             : 'w-0 group-hover/link:w-[calc(100%-32px)]'
                        }`}></span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-gray-300"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary-600/30 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
              >
                <Phone size={16} /> Call Dispatch
              </a>
            </div>

            {/* Mobile UI Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-600 focus:outline-none transition-colors z-[120]"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[105] md:hidden bg-white dark:bg-zinc-950 flex flex-col pt-32 pb-10 px-6 overflow-y-auto"
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="space-y-2">
                {navLinks.map((link, idx) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div className="border-b border-gray-100 dark:border-zinc-900">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                          className="w-full flex items-center justify-between py-5"
                        >
                          <span className="text-4xl font-display font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                            {link.name}
                          </span>
                          <ChevronDown className={`text-gray-400 transform transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} size={28} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-gray-50 dark:bg-zinc-900/50 rounded-2xl mb-4"
                            >
                              {link.dropdown.map((sub: any) => (
                                sub.href ? (
                                  <a
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={closeMenu}
                                    className="flex items-center gap-4 px-6 py-4 text-lg font-bold text-gray-600 dark:text-gray-400 hover:text-primary-600"
                                  >
                                    {sub.icon && <span className="text-primary-600">{sub.icon}</span>}
                                    {sub.name}
                                  </a>
                                ) : (
                                  <button
                                    key={sub.name}
                                    onClick={() => {
                                      sub.action();
                                    }}
                                    className="w-full text-left flex items-center gap-4 px-6 py-4 text-lg font-bold text-gray-600 dark:text-gray-400 hover:text-primary-600"
                                  >
                                    {sub.icon && <span className="text-primary-600">{sub.icon}</span>}
                                    {sub.name}
                                  </button>
                                )
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <button
                          onClick={() => {
                            link.action();
                          }}
                          className="w-full group flex items-center justify-between py-5 border-b border-gray-100 dark:border-zinc-900"
                        >
                          <span className="text-4xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                            {link.name}
                          </span>
                          <Truck className="text-gray-200 dark:text-zinc-800 group-hover:text-primary-600" size={24} />
                        </button>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 mb-10"
              >
                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full bg-primary-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary-600/30 active:scale-95 transition-transform text-xl"
                >
                  <Phone size={24} /> Call Dispatch Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;