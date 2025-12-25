import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Lightbulb, Target, History, CheckCircle2 } from 'lucide-react';

const AboutQuality: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white relative overflow-hidden scroll-mt-20 transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none transition-all duration-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main About Story */}
          <div className="lg:col-span-7">
            <motion.div
              id="about-profile"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 scroll-mt-28"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                  Welcome to <span className="text-primary-600">Z Plus RMC</span>
                </h2>
                <div className="w-20 h-1.5 bg-primary-600 mb-8" />
              </div>

              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                <p>
                  Welcome to RMC Readymix (“Z Plus RMC”), your trusted partner in constructing a solid foundation for the
                  future. Established in 2020, Z Plus RMC has emerged as one of Kachchh’s leading ready-mixed concrete
                  manufacturers. With a network spanning 04 cities and towns across the Gujarat state, operating 04 state-
                  of-the-art ready-mixed concrete plants.
                </p>
                <p>
                  As one of the top 5 players in the ready-mixed concrete in Kachchh region, our commitment to quality and
                  innovation is unmatched. Our plants, strategically located across various towns and cities, ensure
                  convenient access to top-notch concrete solutions. Whether you’re searching for “ready-mixed concrete
                  near me” or reliable “concrete delivery,” Z Plus RMC is your answer.
                </p>
                <p>
                  At Z Plus RMC, quality is not just a standard; it’s a promise. We have our own technical labs setup that help
                  ensure strict adherence to quality control measures at every step of the production process. Our
                  computerized batching mixers and cutting-edge technology guarantee superior quality concrete that
                  surpasses site-mixed alternatives.
                </p>
                <p>
                  With an installed capacity of around 1,00,000 cubic meters, Z Plus RMC is poised to shape the future of
                  construction with innovation, integrity and unwavering dedication. With 6 years of deep-rooted company experience, we understand every detail of the Kutch construction landscape.
                </p>
              </div>

              <div id="about-stats" className="grid grid-cols-2 gap-4 pt-4 scroll-mt-28">
                <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 transition-colors">
                   <div className="text-primary-600 font-display text-4xl font-bold mb-1">6+</div>
                   <div className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 transition-colors">
                   <div className="text-primary-600 font-display text-4xl font-bold mb-1">04</div>
                   <div className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Strategic Plants</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Intro & Scope Cards */}
          <div id="about-scope" className="lg:col-span-5 space-y-8 scroll-mt-28">
            {/* Introduction Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 relative group transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-600/20 text-primary-600 rounded-xl">
                  <Lightbulb size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">INTRODUCTION</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Ready-mix concrete (RMC) is a ready-to-use material with a predetermined mixture of cement, sand, aggregates and water.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <CheckCircle2 size={14} className="text-primary-600 mt-0.5" />
                  <span>Precise mixture for specialty projects</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <CheckCircle2 size={14} className="text-primary-600 mt-0.5" />
                  <span>Transit mixers ensure en-route consistency</span>
                </li>
              </ul>
            </motion.div>

            {/* Scope Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-600/20 text-primary-600 rounded-xl">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold uppercase text-gray-900 dark:text-white">Scope of RMC Plant</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                In the 21st century, Reinforced Cement Concrete (RCC) is vital. RMC saves time and reduces labor costs for:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Dams, roads, bridges, tunnels, and canals",
                  "Congested areas where storage is unfeasible",
                  "Sites with heavy traffic challenges",
                  "Shortage of supervisors and labor staff",
                  "Industrial and Residential large-scale projects"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-800/50 p-3 rounded-lg border border-gray-200 dark:border-zinc-700/50">
                    <CheckCircle2 size={14} className="text-primary-600" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutQuality;