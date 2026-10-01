import React from 'react';
import { Tag, Sparkles, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const SpecialOffers: React.FC = () => {
  const { specialOffers, hotelInfo, setIsAdminOpen } = useRestaurant();
  const activeOffers = specialOffers.filter(o => o.isActive);

  if (activeOffers.length === 0) {
    return null;
  }

  const handleClaimOffer = (offer: typeof activeOffers[0]) => {
    const rawPhone = hotelInfo.whatsapp.replace(/\D/g, '') || '9631343645';
    const formattedPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const msg = `Hello zȧm zȧm HOTEL Kaliganj!\nI want to claim the special offer:\n*${offer.title}*\n${offer.offerPrice ? `Offer Price: ₹${offer.offerPrice}` : ''}\n\nPlease confirm if this deal is available now. Thank you!`;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="offers" className="py-16 bg-stone-900/60 border-y border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Limited Time Specials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Exclusive Offers & Combos
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              Freshly cooked combo platters and discounts specially curated for food lovers in Kaliganj and nearby areas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1 transition-colors underline cursor-pointer"
            >
              Update Offers in Admin
            </button>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="group rounded-3xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl shadow-black/40 hover:-translate-y-1"
            >
              <div>
                {/* Offer Image Header */}
                <div className="relative h-48 overflow-hidden bg-stone-900">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{offer.discount}</span>
                  </div>

                  {offer.tag && (
                    <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-200 text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {offer.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {offer.title}
                  </h3>
                  
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Pricing info if available */}
                  {(offer.offerPrice || offer.originalPrice) && (
                    <div className="flex items-baseline gap-2.5 pt-1">
                      {offer.offerPrice && (
                        <span className="text-2xl font-black text-amber-400">
                          ₹{offer.offerPrice}
                        </span>
                      )}
                      {offer.originalPrice && (
                        <span className="text-sm text-stone-500 line-through">
                          ₹{offer.originalPrice}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Validity */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-2 border-t border-stone-900">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{offer.validity}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleClaimOffer(offer)}
                  className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-emerald-600 text-stone-200 hover:text-white border border-stone-800 hover:border-emerald-500 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md group/btn"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover/btn:text-white" />
                  <span>Order Deal via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
