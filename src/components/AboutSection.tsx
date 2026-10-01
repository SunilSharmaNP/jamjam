import React from 'react';
import { User, Phone, MapPin, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const AboutSection: React.FC = () => {
  const { hotelInfo } = useRestaurant();

  return (
    <section id="about" className="py-20 bg-stone-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: About Text & Story */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kaliganj’s Very Own Hotel</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight">
              About <span className="text-amber-400 font-brand">zȧm zȧm HOTEL</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              zȧm zȧm HOTEL is proud to be Kaliganj's trusted culinary landmark. We set out with a simple promise: to serve honest, flavorful, and freshly prepared chicken delicacies made with generous portions and warm hospitality.
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Whether you are savoring our aromatic Dum Chicken Biryani, crunching into our golden spiced Chicken Fry, enjoying a hearty Chicken Rice meal, or relishing our charcoal-grilled Kebabs and hot clay oven Tandoori chicken, every recipe is made from scratch every day.
            </p>

            {/* Core Mission Quote */}
            <div className="p-5 rounded-2xl bg-stone-900 border-l-4 border-amber-500 border-y border-r border-stone-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Heart className="w-4 h-4 fill-amber-400" />
                <span>Our Sacred Motto</span>
              </div>
              <p className="text-lg font-bold text-white font-heading italic">
                "Your taste, our responsibility."
              </p>
              <p className="text-xs text-stone-400">
                We make sure every guest leaves with a full stomach and a happy smile.
              </p>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Locally sourced fresh Halal chicken</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Authentic traditional Dum cooking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean & spacious family seating</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prompt takeaway packaging</span>
              </div>
            </div>

          </div>

          {/* Right: Leadership & Director Profile Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 p-6 sm:p-8 shadow-2xl relative">
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                    Leadership & Management
                  </span>
                  <h3 className="text-2xl font-black text-white font-heading">
                    {hotelInfo.director}
                  </h3>
                  <p className="text-xs text-stone-400">Director, zȧm zȧm HOTEL</p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-stone-300 italic border-l-2 border-amber-500/50 pl-4 py-1 mb-6 leading-relaxed">
                "We welcome everyone from Kaliganj, Mahuar, Manihari, Katihar, and travelers on this route. Our promise is simple: pure taste, fresh meat, and generous quantities that you can trust every single day."
              </blockquote>

              <div className="space-y-3 pt-4 border-t border-stone-800 text-xs">
                <div className="flex items-center gap-3 text-stone-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Village Kaliganj, P.O. Mahuar, P.S. Manihari, Katihar (854116)</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Contact: +91 {hotelInfo.phone}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400">Owner & Kitchen Overseer</span>
                <a
                  href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Contact Director
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
