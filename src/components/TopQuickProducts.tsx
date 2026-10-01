import React, { useState } from 'react';
import { Flame, Plus, Check, ShoppingBag, MessageSquare, Sparkles } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types';

export const TopQuickProducts: React.FC = () => {
  const { menuItems, addToCart, getSingleItemWhatsAppUrl } = useRestaurant();
  const [selectedItemForPortion, setSelectedItemForPortion] = useState<MenuItem | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Pick top signature items for the top 3-column showcase
  // Biryani, Fry, Rice, Kebab, Tandoori, Special
  const topDishes = menuItems.filter(item => item.isAvailable).slice(0, 6);

  const handleQuickAdd = (item: MenuItem, portion: 'half' | 'full' = 'full') => {
    addToCart(item, portion, 1);
    setAddedNotice(item.id);
    setSelectedItemForPortion(null);
    setTimeout(() => setAddedNotice(null), 1400);
  };

  return (
    <section className="py-4 sm:py-6 bg-stone-900/90 border-y border-amber-500/20 relative z-20">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-1">
              <span>Top Delicacies</span>
              <span className="text-[10px] bg-amber-500 text-stone-950 font-black px-1.5 py-0.2 rounded-md">HOT</span>
            </h3>
          </div>
          <a
            href="#menu"
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Full Menu &gt;
          </a>
        </div>

        {/* 1 Row 3 Columns on Mobile (grid-cols-3) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {topDishes.map((item) => {
            const isAdded = addedNotice === item.id;
            const minPrice = item.halfPrice ? item.halfPrice : item.price;

            return (
              <div
                key={`quick-${item.id}`}
                className="group rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-1.5 sm:p-2.5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Square Food Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-900 mb-1.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    {/* Tiny category / spicy pill */}
                    <div className="absolute top-1 left-1 bg-stone-950/85 backdrop-blur-xs px-1.5 py-0.5 rounded-md text-[9px] font-bold text-amber-400">
                      ₹{minPrice}
                    </div>

                    {item.isPopular && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 shadow">
                        <Flame className="w-2.5 h-2.5 fill-stone-950" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-[11px] sm:text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 leading-tight mb-0.5">
                    {item.name}
                  </h4>

                  <div className="flex items-baseline justify-between text-[10px] text-stone-400 mb-1.5">
                    <span className="text-[10px] text-amber-400 font-extrabold">
                      ₹{item.price}
                    </span>
                    {item.halfPrice && (
                      <span className="text-[9px] text-stone-500">
                        Half ₹{item.halfPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Action Button in 3-column cell */}
                {item.halfPrice ? (
                  <button
                    onClick={() => setSelectedItemForPortion(item)}
                    className="w-full py-1 sm:py-1.5 rounded-lg bg-stone-900 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-800 hover:border-amber-500 text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Select</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleQuickAdd(item, 'full')}
                    className={`w-full py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Portion Selection Modal for 3-col quick items */}
      {selectedItemForPortion && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-sm p-4 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <img
                src={selectedItemForPortion.image}
                alt={selectedItemForPortion.name}
                className="w-14 h-14 rounded-2xl object-cover border border-stone-800"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{selectedItemForPortion.name}</h4>
                <p className="text-[11px] text-stone-400">Choose portion size to order:</p>
              </div>
              <button
                onClick={() => setSelectedItemForPortion(null)}
                className="text-stone-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {selectedItemForPortion.halfPrice && (
                <button
                  onClick={() => handleQuickAdd(selectedItemForPortion, 'half')}
                  className="p-3 rounded-2xl bg-stone-900 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-800 hover:border-amber-500 text-left transition-all cursor-pointer"
                >
                  <span className="block font-bold text-xs">Half Plate</span>
                  <span className="block text-amber-400 group-hover:text-stone-950 font-black text-sm mt-1">
                    ₹{selectedItemForPortion.halfPrice}
                  </span>
                </button>
              )}

              <button
                onClick={() => handleQuickAdd(selectedItemForPortion, 'full')}
                className="p-3 rounded-2xl bg-stone-900 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-800 hover:border-amber-500 text-left transition-all cursor-pointer"
              >
                <span className="block font-bold text-xs">Full Plate</span>
                <span className="block text-amber-400 group-hover:text-stone-950 font-black text-sm mt-1">
                  ₹{selectedItemForPortion.price}
                </span>
              </button>
            </div>

            <a
              href={getSingleItemWhatsAppUrl(selectedItemForPortion, 'full')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Order</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
