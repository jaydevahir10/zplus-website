import React from 'react';
import { CONCRETE_GRADES } from '../constants';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-zinc-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Our Concrete <span className="text-primary-600">Grades</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Engineered for strength and durability. Providing consistent quality for your residential or industrial project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONCRETE_GRADES.map((item, index) => (
            <motion.div
              key={item.id}
              id={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-zinc-800 group scroll-mt-24"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary-600 shadow-sm border border-gray-100 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">{item.grade}</span>
                </div>
                <span className="text-gray-300 dark:text-zinc-700 group-hover:text-primary-600 transition-colors">
                  <ArrowUpRight size={24} />
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.grade} Concrete</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed h-12">{item.description}</p>

              <ul className="space-y-3 mb-2">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={18} className="text-primary-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;