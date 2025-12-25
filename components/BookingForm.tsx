import React, { useState, FormEvent } from 'react';
import { CONCRETE_GRADES, PHONE_NUMBER, GOOGLE_SHEETS_SCRIPT_URL } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    grade: 'm25', // Default to common grade
    quantity: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Prepare Data for WhatsApp
    const message = `*New Order Request - Z+ Concrete*%0A%0A` +
      `👤 *Name:* ${formData.name}%0A` +
      `📞 *Phone:* ${formData.phone}%0A` +
      `📍 *Location:* ${formData.location}%0A` +
      `🏗 *Grade:* ${CONCRETE_GRADES.find(g => g.id === formData.grade)?.grade || formData.grade}%0A` +
      `🚛 *Quantity:* ${formData.quantity} m³%0A` +
      `📅 *Date:* ${new Date(formData.date).toLocaleString()}`;

    const whatsappUrl = `https://wa.me/91${PHONE_NUMBER}?text=${message}`;

    try {
      // 2. Send to Google Sheets (Fire and Forget or Await)
      // We use FormData object for easy handling by Google Apps Script
      const sheetData = new FormData();
      sheetData.append('name', formData.name);
      sheetData.append('phone', formData.phone);
      sheetData.append('location', formData.location);
      sheetData.append('grade', formData.grade);
      sheetData.append('quantity', formData.quantity);
      sheetData.append('date', formData.date);
      sheetData.append('created_at', new Date().toISOString());

      // If the URL is still the placeholder, we skip the fetch to prevent errors
      if (GOOGLE_SHEETS_SCRIPT_URL.includes("PLACEHOLDER")) {
        console.warn("Google Sheet Script URL is not configured.");
      } else {
         await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          body: sheetData,
          mode: 'no-cors' // Important for Google Apps Script interaction
        });
      }

      // 3. Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // 4. UI Success State
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        location: '',
        grade: 'm25',
        quantity: '',
        date: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Error submitting form", error);
      setIsSubmitting(false);
      // Even if sheet fails, we still open WhatsApp as backup
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section id="booking" className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Info Side */}
          <div className="space-y-8 pt-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Truck size={14} /> Easy Online Ordering
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                Get a Free <br />
                <span className="text-primary-600">Concrete Quote</span>
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Fill out the form to request your ready-mix delivery. The details will be sent directly to our dispatch team via WhatsApp for immediate confirmation.
            </p>

            <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl border-l-4 border-primary-600 shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Volume Estimator Help</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Not sure how much concrete you need? <br/>
                <span className="font-semibold text-primary-600">1 Cubic Meter (m³) ≈ 35.3 Cubic Feet</span>
              </p>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/20 w-fit px-3 py-1 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Dispatch Active Now
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-zinc-800 relative">
            <AnimatePresence>
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-zinc-950/90 rounded-3xl z-20 text-center p-8 backdrop-blur-sm"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-500"
                  >
                    <CheckCircle size={40} strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-gray-600 dark:text-gray-400">WhatsApp has been opened with your order details. Please hit "Send" to finalize.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-primary-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-white font-medium" 
                    placeholder="Your Name" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mobile</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-primary-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-white font-medium" 
                    placeholder="10-digit number" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Site Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-primary-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-white font-medium" 
                  placeholder="Project Address / Area" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Grade</label>
                  <div className="relative">
                    <select 
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-primary-600 outline-none transition-all dark:text-white appearance-none font-medium cursor-pointer"
                    >
                      {CONCRETE_GRADES.map(g => (
                        <option key={g.id} value={g.id}>{g.grade}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Quantity (m³)</label>
                  <input 
                    type="number" 
                    min="1" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-primary-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-white font-medium" 
                    placeholder="Ex: 15" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Preferred Date</label>
                <input 
                  type="datetime-local" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-primary-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-white font-medium text-gray-600 dark:text-gray-300" 
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Opening WhatsApp...</span>
                ) : (
                  <>Send Request <Send size={20} /></>
                )}
              </motion.button>
              
              <div className="flex items-start gap-2 justify-center text-xs text-gray-400 mt-4">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                <p>This will open WhatsApp with your details pre-filled. You must hit "Send" in WhatsApp.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;