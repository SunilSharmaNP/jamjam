import React from 'react';
import { Sparkles, Flame, Clock, Award, CheckCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Hero: React.FC = () => {
  const { hotelInfo } = useRestaurant();

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-8 sm:py-12 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-center">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-6">
        
        {/* Top Tagline Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Kaliganj’s Favorite Chicken Destination</span>
        </div>

        {/* Main Brand Title & Headings */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-stone-400 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            Welcome to Kaliganj's Own
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading">
            zȧm zȧm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">HOTEL</span>
          </h1>
          <p className="text-lg sm:text-2xl font-bold text-amber-400 font-heading">
            {hotelInfo.tagline}
          </p>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience authentic, steaming-hot Dum Biryani, mouth-watering Crispy Chicken Fry, 
            rich Chicken Rice, Charcoal Kebabs, and fresh Tandoori delicacies prepared daily with premium ingredients and unmatched spice blends.
          </p>
        </div>

        {/* Sub-tagline quote */}
        <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 text-xs sm:text-sm italic inline-block">
          "{hotelInfo.subTagline}"
        </div>

        {/* Key trust bullets & Timings */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs text-stone-300">
          <div className="flex items-center gap-1.5 bg-stone-900/70 border border-stone-800/80 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Fresh Halal Chicken</span>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-900/70 border border-stone-800/80 px-3 py-1.5 rounded-full">
            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Hot Batches Cooked Daily</span>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-900/70 border border-stone-800/80 px-3 py-1.5 rounded-full">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Generous Plate Quantity</span>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-900/70 border border-stone-800/80 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-emerald-400 font-semibold">Open:</span>
            <span>{hotelInfo.openingTime} – {hotelInfo.closingTime}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
