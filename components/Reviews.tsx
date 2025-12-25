import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 text-gray-900 dark:text-white">
          Client <span className="text-primary-600">Testimonials</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 w-full md:w-[350px] flex flex-col relative"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-4 right-4 text-primary-600/10 dark:text-primary-500/10">
                <Quote size={64} className="transform rotate-180 fill-current" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-zinc-700"} 
                  />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed min-h-[80px]">
                "{review.text}"
              </p>

              <div className="mt-auto flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-500 font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{review.name}</h4>
                  <p className="text-xs text-primary-600 dark:text-primary-500 font-bold uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
