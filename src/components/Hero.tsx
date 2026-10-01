import React from 'react';
import { Phone, MessageSquare, MapPin, Sparkles, Flame, Clock, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Hero: React.FC = () => {
  const { hotelInfo } = useRestaurant();

  const specialties = [
    { title: 'Chicken Biryani', subtitle: 'Dum Cooked Aromatic Rice' },
    { title: 'Chicken Fry', subtitle: 'Crispy & Spicy Golden Crunch' },
    { title: 'Chicken Rice', subtitle: 'Rich Homestyle Chicken Curry' },
    { title: 'Chicken Kebab', subtitle: 'Smoky Charcoal Skewers' },
    { title: 'Tandoori Chicken', subtitle: 'Fresh From Hot Clay Oven' }
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Tagline Badges */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Kaliganj’s Favorite Chicken Destination</span>
            </div>

            {/* Main Brand Title & Headings */}
            <div className="space-y-3">
              <h2 className="text-stone-400 text-sm sm:text-base uppercase tracking-widest font-semibold">
                Welcome to Kaliganj's Own
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading">
                zȧm zȧm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">HOTEL</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-amber-400 font-heading">
                {hotelInfo.tagline}
              </p>
              <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience authentic, steaming-hot Dum Biryani, mouth-watering Crispy Chicken Fry, 
                rich Chicken Rice, Charcoal Kebabs, and fresh Tandoori delicacies prepared daily with premium ingredients and unmatched spice blends.
              </p>
            </div>

            {/* Sub-tagline quote */}
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 text-sm italic inline-block">
              "{hotelInfo.subTagline}"
            </div>

            {/* Call-to-action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello zȧm zȧm HOTEL Kaliganj! I want to order food.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/60 transition-all duration-200 text-sm sm:text-base"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Order</span>
              </a>

              {/* Call Now Button */}
              <a
                href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white border border-stone-700 hover:border-amber-400 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-md"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call {hotelInfo.phone}</span>
              </a>

              {/* Directions Button */}
              <a
                href={hotelInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-stone-300 hover:text-amber-400 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 px-5 py-3.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Key trust bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800/80 text-left">
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Fresh Halal Chicken</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hot Batches Cooked Daily</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Generous Plate Quantity</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl shadow-black/80 bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop"
                  alt="zȧm zȧm HOTEL Special Chicken Biryani"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Overlaid badges */}
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md border border-stone-800/80 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-400 flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Chef's Signature Dum Biryani</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/90 backdrop-blur-md border border-stone-800 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base sm:text-lg">Special Chicken Dum Biryani</h3>
                      <p className="text-xs text-stone-400">Authentic Kaliganj Recipe • With Raita & Gravy</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 block">Starting at</span>
                      <span className="text-xl font-black text-amber-400">₹80</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating secondary badge: Timings & Status */}
              <div className="mt-4 bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Open Today</span>
                    </div>
                    <p className="text-xs text-stone-300">{hotelInfo.openingTime} – {hotelInfo.closingTime}</p>
                  </div>
                </div>

                <a
                  href="#menu"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
                >
                  <span>View Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Popular quick links pill grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {specialties.slice(0, 4).map((spec) => (
                  <a
                    key={spec.title}
                    href="#menu"
                    className="p-2.5 rounded-xl bg-stone-900/50 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 transition-colors block text-left"
                  >
                    <span className="font-semibold text-white block truncate">{spec.title}</span>
                    <span className="text-[11px] text-stone-400 block truncate">{spec.subtitle}</span>
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
