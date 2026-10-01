import React from 'react';
import { Flame, ShieldCheck, Scale, Sparkles, HeartHandshake, PackageCheck, PhoneCall } from 'lucide-react';

export const SpecialitySection: React.FC = () => {
  const specialities = [
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: 'Fresh & Steaming Hot Food',
      desc: 'Cooked fresh throughout the day in small batches to preserve aroma, tenderness, and rich flavors.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: '100% Quality Chicken',
      desc: 'Hand-inspected, fresh Halal chicken procured every morning. No frozen compromise ever.'
    },
    {
      icon: <Scale className="w-6 h-6 text-amber-400" />,
      title: 'Generous Plate Quantity',
      desc: 'Hearty, satisfying meal portions designed to satisfy your appetite completely with great value.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      title: 'Authentic & Irresistible Taste',
      desc: 'Special aromatic house spice blends perfected over years for unforgettable flavor in every bite.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-cyan-400" />,
      title: 'Top Hygiene & Cleanliness',
      desc: 'Clean prep counters, sanitized kitchen, and clean dining hall for your family peace of mind.'
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-amber-400" />,
      title: 'Quick Takeaway & Parcel',
      desc: 'Leak-proof, thermal-friendly packaging that keeps your food hot and fresh all the way home.'
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-emerald-400" />,
      title: 'Instant Call & WhatsApp Order',
      desc: 'Direct contact with Mohammad Waseem and team for rapid orders without waiting.'
    }
  ];

  return (
    <section id="speciality" className="py-20 bg-stone-900/40 border-y border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
            Our Commitment To You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
            Why Choose zȧm zȧm HOTEL?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3">
            In Kaliganj, we have earned the love and trust of customers through consistent quality, honest service, and genuine taste.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialities.map((item, index) => (
            <div
              key={item.title}
              className={`p-6 rounded-3xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/50 group flex flex-col justify-between ${
                index === 0 ? 'lg:col-span-2 xl:col-span-1 bg-gradient-to-br from-stone-950 to-amber-950/20' : ''
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-900 flex items-center text-[11px] text-stone-400">
                <span>Verified Quality</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
