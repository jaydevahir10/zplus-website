import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import AboutQuality from './components/AboutQuality';
import Reviews from './components/Reviews';
import ContactSection from './components/ContactSection';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import StickyBar from './components/StickyBar';
import { SafeBoundary } from './SafeBoundary';
import { motion, AnimatePresence } from 'framer-motion';

const MouseSpotlight = ({ darkMode }: { darkMode: boolean }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-[40] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: darkMode 
          ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(220, 38, 38, 0.15), transparent 80%)` 
          : `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(0, 0, 0, 0.05), transparent 80%)`
      }}
    />
  );
};

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="fixed inset-0 z-[200] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center transition-colors duration-500"
  >
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center gap-1 mb-4">
        <h1 className="font-display text-8xl font-bold text-gray-900 dark:text-white tracking-tighter">
          Z
        </h1>
        <span className="font-display text-8xl font-bold text-primary-600 -ml-2">+</span>
      </div>
      <div className="h-1 w-32 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-full w-20 bg-primary-600"
        />
      </div>
    </motion.div>
  </motion.div>
);

const App: React.FC = () => {
  // Default to dark mode
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initial Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Trigger page transition animation
  const handlePageTransition = (callback: () => void) => {
    setLoading(true);
    
    // Wait for the loader to fade in before executing the navigation
    setTimeout(() => {
      callback();
      
      // Wait a bit more for the DOM to update/scroll before revealing
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 600);
  };

  return (
    <div className="font-sans antialiased overflow-x-hidden selection:bg-primary-500 selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <MouseSpotlight darkMode={darkMode} />

      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigate={handlePageTransition}
      />
      
      <main className="min-h-screen">
        {currentPage === 'home' ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <SafeBoundary fallbackTitle="Hero Section Error">
              <Hero />
            </SafeBoundary>
            
            <SafeBoundary fallbackTitle="Services Section Error">
              <Services />
            </SafeBoundary>

            <SafeBoundary fallbackTitle="Quality Features Error">
              <AboutQuality />
            </SafeBoundary>
            
            <SafeBoundary fallbackTitle="Reviews Error">
              <Reviews />
            </SafeBoundary>
            
            <SafeBoundary fallbackTitle="Booking Form Error">
              <BookingForm />
            </SafeBoundary>

            <SafeBoundary fallbackTitle="Contact Error">
              <ContactSection />
            </SafeBoundary>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="pt-20"
          >
            <SafeBoundary fallbackTitle="Gallery Section Error">
              <Gallery />
            </SafeBoundary>
          </motion.div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyBar />
    </div>
  );
};

export default App;