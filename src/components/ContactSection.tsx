import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, Mail, User, Clock, CheckCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ContactSection: React.FC = () => {
  const { hotelInfo } = useRestaurant();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    inquiryType: 'Party / Bulk Order',
    message: ''
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawPhone = hotelInfo.whatsapp.replace(/\D/g, '') || '9631343645';
    const formattedPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    const text = `*NEW INQUIRY - zȧm zȧm HOTEL KALIGANJ*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Type:* ${formData.inquiryType}\n` +
      `*Message:* ${formData.message}\n\n` +
      `Please contact me regarding this request.`;

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFormData({ name: '', phone: '', inquiryType: 'Party / Bulk Order', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
            We Are Here To Serve You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
            Contact & Orders
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2">
            Get in touch with Director Mohammad Wasim and team for table reservations, parcel takeaway, and catering orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-6">
              
              <div>
                <h3 className="text-2xl font-black text-white font-brand mb-1">
                  zȧm zȧm HOTEL
                </h3>
                <p className="text-xs text-stone-400">Kaliganj, Katihar, Bihar</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Director</span>
                    <strong className="text-white text-base">{hotelInfo.director}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Mobile & WhatsApp</span>
                    <strong className="text-white text-base">+91 {hotelInfo.phone}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Hotel Address</span>
                    <p className="text-stone-200 leading-relaxed">
                      Village – Kaliganj<br />
                      P.O. – Mahuar, P.S. – Manihari<br />
                      District – Katihar, Bihar – 854116
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-400 text-xs block">Working Hours</span>
                    <p className="text-stone-200">
                      Everyday: <strong>{hotelInfo.openingTime} – {hotelInfo.closingTime}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Three Mandatory Quick Buttons */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
                    className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-4 rounded-xl border border-stone-700 text-xs sm:text-sm transition-colors shadow-md"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>CALL NOW</span>
                  </a>

                  <a
                    href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello zȧm zȧm HOTEL Kaliganj! I want to order food.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-md shadow-emerald-950/40"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WHATSAPP ORDER</span>
                  </a>
                </div>

                <a
                  href={hotelInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20"
                >
                  <MapPin className="w-4 h-4" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>

            </div>
          </div>

          {/* Direct WhatsApp Inquiry / Party Order Form */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-xl font-bold text-white mb-2">Send Instant Inquiry / Message</h3>
              <p className="text-xs text-stone-400 mb-6">
                Planning a family function, birthday party, or advance Biryani handi order? Send details straight to our WhatsApp.
              </p>

              {sentSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Opening WhatsApp...</h4>
                  <p className="text-xs text-stone-400">Your message is being sent to zȧm zȧm HOTEL.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9631343645"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Inquiry Topic</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Party / Bulk Biryani Order">Party / Bulk Biryani Order</option>
                      <option value="Table Booking / Dine-in Inquiry">Table Booking / Dine-in Inquiry</option>
                      <option value="Takeaway Parcel Order">Takeaway Parcel Order</option>
                      <option value="Special Catering Request">Special Catering Request</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Your Message / Order Details</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Mention your requirements, desired time, and number of guests/plates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-950/40"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
