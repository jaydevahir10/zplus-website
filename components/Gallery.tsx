import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES, FALLBACK_IMAGE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, ImageOff } from 'lucide-react';

const categories = ['All', 'Plant', 'Fleet', 'Projects'];

/**
 * Robust image component that handles load errors by swapping to a branded fallback
 */
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset state when src changes (critical for lightbox navigation)
  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-zinc-800 ${className}`}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={error ? FALLBACK_IMAGE : src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`h-full w-full object-cover transition-all duration-700 ${
          loading ? 'scale-110 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'
        } ${className}`}
        loading="lazy"
      />
      {error && (
        <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white/50 backdrop-blur-md">
          <ImageOff size={14} />
        </div>
      )}
    </div>
  );
};

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const filteredImages = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageId === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImageId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImageId(filteredImages[nextIndex].id);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageId === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImageId);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImageId(filteredImages[prevIndex].id);
  };

  const activeItem = selectedImageId !== null 
    ? (GALLERY_IMAGES.find(i => i.id === selectedImageId) || null)
    : null;

  return (
    <section id="gallery" className="py-24 bg-gray-50 dark:bg-zinc-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Project <span className="text-primary-600">Gallery</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Explore our state-of-the-art batching plants, transit mixers, and completed construction projects.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={String(cat)}
                onClick={() => setFilter(String(cat))}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                  filter === cat
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-transparent border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                {String(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={img.id}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-gray-200 dark:bg-zinc-800 shadow-sm hover:shadow-xl transition-all"
              onClick={() => setSelectedImageId(img.id)}
            >
              <ImageWithFallback 
                src={img.src} 
                alt={img.title} 
                className="h-full w-full group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                <Maximize2 className="text-white mb-2" size={28} />
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
                <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImageId(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImageId(null); }}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} />
            </button>

            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all hidden md:block"
              onClick={handleNext}
            >
              <ChevronRight size={40} />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-bold">
                  {activeItem.title}
                </h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                  {activeItem.category}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;