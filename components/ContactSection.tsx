import React from 'react';
import { MapPin, Phone, Mail, Navigation, MessageCircle } from 'lucide-react';
import { PLANT_ADDRESS, PHONE_NUMBER, GOOGLE_MAPS_LINK, EMAIL_ADDRESS, WHATSAPP_LINK } from '../constants';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Contact & <span className="text-primary-600">Location</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visit our plant or get in touch for inquiries. We proudly serve Gandhidham, Mundra, and the Kutch region with 6 years of expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            {/* Main Address Card */}
            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 rounded-bl-full transition-transform group-hover:scale-150 duration-500" />
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <MapPin className="text-primary-600" /> Plant Location
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {PLANT_ADDRESS}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white dark:bg-zinc-800 px-6 py-3.5 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg"
                >
                  <Navigation size={20} /> Get Directions
                </a>
              </div>
            </div>

            {/* Grid for Phone/Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:border-primary-600 hover:shadow-lg transition-all block group"
              >
                <Phone className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Call Dispatch</h4>
                <span className="text-gray-600 dark:text-gray-300 font-medium">+91 {PHONE_NUMBER}</span>
              </a>
              
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:border-[#25D366] hover:shadow-lg transition-all block group"
              >
                <MessageCircle className="text-[#25D366] mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">WhatsApp</h4>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Quick Order</span>
              </a>

              <a 
                href={`mailto:${EMAIL_ADDRESS}`}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:border-primary-600 hover:shadow-lg transition-all block group sm:col-span-2"
              >
                <Mail className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Email Inquiry</h4>
                <span className="text-gray-600 dark:text-gray-300 font-medium">{EMAIL_ADDRESS}</span>
              </a>
            </div>
          </div>

          {/* Map Area */}
          <div className="h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 relative bg-zinc-100 dark:bg-zinc-800">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.96826720516!2d70.0039!3d23.0125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950b91010101011%3A0x1010101010101010!2sGandhidham%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               className="grayscale contrast-125 dark:invert dark:brightness-75 transition-all duration-500"
               title="Service Area Map"
             ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;