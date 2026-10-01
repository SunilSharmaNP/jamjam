import React, { useState } from 'react';
import { Search, Flame, ShoppingBag, MessageSquare, Plus, Check, LayoutGrid, Rows } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types';

export const MenuSection: React.FC = () => {
  const { menuItems, addToCart, getSingleItemWhatsAppUrl } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [portionSelections, setPortionSelections] = useState<Record<string, 'full' | 'half'>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  
  // Mobile View Mode: 'grid3' (3-columns per row) vs 'cards' (1 column detailed card)
  const [viewMode, setViewMode] = useState<'grid3' | 'cards'>('grid3');
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'biryani', label: '🍗 Biryani' },
    { id: 'fry', label: '🍗 Fry' },
    { id: 'rice', label: '🍚 Rice' },
    { id: 'kebab', label: '🍢 Kebabs' },
    { id: 'tandoori', label: '🔥 Tandoori' },
  ];

  const handlePortionChange = (itemId: string, portion: 'full' | 'half') => {
    setPortionSelections(prev => ({ ...prev, [itemId]: portion }));
  };

  const handleAddToCart = (item: MenuItem, portionOverride?: 'full' | 'half') => {
    const selectedPortion = portionOverride || portionSelections[item.id] || (item.halfPrice ? 'half' : 'full');
    addToCart(item, selectedPortion, 1);
    setAddedItemNotice(item.id);
    setModalItem(null);
    setTimeout(() => setAddedItemNotice(null), 1400);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-12 sm:py-20 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Taste the Authenticity</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-black text-white font-heading">
            Our Signature Menu
          </h2>
          <p className="text-stone-400 text-xs sm:text-base mt-2 leading-relaxed">
            Freshly prepared chicken delicacies cooked to order. Generous quantities and rich traditional taste.
          </p>
        </div>

        {/* Filter Bar, Search & View Switcher */}
        <div className="space-y-3 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-stone-800">
          
          {/* Category Tabs & View Switcher Row */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Category Scroll */}
            <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-900/90 rounded-2xl border border-stone-800 scrollbar-none flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile View Switcher (3-Col Grid vs Detailed Cards) */}
            <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 shrink-0">
              <button
                onClick={() => setViewMode('grid3')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'grid3' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
                title="3 Columns Grid (Mobile Optimized)"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">3 Col</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'cards' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
                title="Detailed Cards"
              >
                <Rows className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">Cards</span>
              </button>
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Biryani, Chicken Fry, Kebabs, Tandoori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 text-white rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-500"
            />
          </div>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-stone-900/40 rounded-3xl border border-stone-800/80">
            <p className="text-stone-400 text-sm">No items found matching your filter.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-2 text-xs text-amber-400 hover:underline cursor-pointer"
            >
              Reset filters to view all delicacies
            </button>
          </div>
        ) : viewMode === 'grid3' ? (
          /* =========================================================================
             MOBILE PRIORITY: 3-COLUMNS PER ROW (grid-cols-3)
             ========================================================================= */
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3.5">
            {filteredItems.map((item) => {
              const isJustAdded = addedItemNotice === item.id;
              const minPrice = item.halfPrice ? item.halfPrice : item.price;

              return (
                <div
                  key={item.id}
                  className={`group rounded-2xl bg-stone-900/80 border ${
                    item.isAvailable ? 'border-stone-800 hover:border-amber-500/50' : 'border-stone-800/40 opacity-60'
                  } p-2 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200`}
                >
                  <div>
                    {/* Square Food Photo */}
                    <div
                      onClick={() => setModalItem(item)}
                      className="relative aspect-square rounded-xl overflow-hidden bg-stone-950 mb-1.5 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                      {/* Small price badge in corner */}
                      <div className="absolute top-1 left-1 bg-stone-950/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md text-[9px] font-black text-amber-400">
                        ₹{item.price}
                      </div>

                      {item.isPopular && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 shadow">
                          <Flame className="w-2.5 h-2.5 fill-stone-950" />
                        </div>
                      )}

                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-stone-950/80 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-red-400 uppercase">Sold Out</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setModalItem(item)}
                      className="text-[11px] sm:text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 leading-tight mb-0.5 cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    {/* Prices */}
                    <div className="flex items-baseline justify-between text-[10px] text-stone-400 mb-2">
                      <span className="text-[11px] text-amber-400 font-extrabold">
                        ₹{item.price}
                      </span>
                      {item.halfPrice && (
                        <span className="text-[9px] text-stone-500">
                          Half ₹{item.halfPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions for 3-col card */}
                  <div className="pt-1">
                    {item.halfPrice ? (
                      <button
                        type="button"
                        disabled={!item.isAvailable}
                        onClick={() => setModalItem(item)}
                        className="w-full py-1.5 rounded-xl bg-stone-800 hover:bg-amber-500 text-stone-200 hover:text-stone-950 text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Options</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!item.isAvailable}
                        onClick={() => handleAddToCart(item, 'full')}
                        className={`w-full py-1.5 rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95 ${
                          !item.isAvailable
                            ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                            : isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                        }`}
                      >
                        {isJustAdded ? (
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

                </div>
              );
            })}
          </div>
        ) : (
          /* =========================================================================
             DETAILED CARD VIEW (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
             ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const currentPortion = portionSelections[item.id] || (item.halfPrice ? 'half' : 'full');
              const currentPrice = currentPortion === 'half' && item.halfPrice ? item.halfPrice : item.price;
              const isJustAdded = addedItemNotice === item.id;

              return (
                <div
                  key={item.id}
                  className={`group rounded-3xl bg-stone-900/60 border ${
                    item.isAvailable ? 'border-stone-800 hover:border-amber-500/40' : 'border-stone-800/40 opacity-70'
                  } transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg`}
                >
                  <div>
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                      <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-stone-800 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">Fresh Halal</span>
                      </div>

                      {item.isPopular && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-stone-950" />
                          <span>Popular</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-xl font-black text-amber-400 shrink-0">
                          ₹{currentPrice}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed min-h-[2.5rem]">
                        {item.description}
                      </p>

                      {item.halfPrice && (
                        <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                          <span className="text-[11px] text-stone-400 font-medium">Select Portion:</span>
                          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
                            <button
                              type="button"
                              onClick={() => handlePortionChange(item.id, 'half')}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                                currentPortion === 'half'
                                  ? 'bg-amber-500 text-stone-950 font-bold'
                                  : 'text-stone-400 hover:text-white'
                              }`}
                            >
                              Half (₹{item.halfPrice})
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePortionChange(item.id, 'full')}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                                currentPortion === 'full'
                                  ? 'bg-amber-500 text-stone-950 font-bold'
                                  : 'text-stone-400 hover:text-white'
                              }`}
                            >
                              Full (₹{item.price})
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={!item.isAvailable}
                      onClick={() => handleAddToCart(item)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        !item.isAvailable
                          ? 'bg-stone-800 text-stone-500'
                          : isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getSingleItemWhatsAppUrl(item, currentPortion)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 hover:border-emerald-500/40"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Quick Order Modal (when tapping a 3-col item) */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-md p-5 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <img
                src={modalItem.image}
                alt={modalItem.name}
                className="w-20 h-20 rounded-2xl object-cover border border-stone-800 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">{modalItem.category}</span>
                <h3 className="text-base font-bold text-white leading-snug">{modalItem.name}</h3>
                <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">{modalItem.description}</p>
              </div>
            </div>

            <div className="p-3 bg-stone-900/70 rounded-2xl border border-stone-800 space-y-2">
              <span className="text-xs text-stone-300 font-semibold block">Select Portion:</span>
              <div className="grid grid-cols-2 gap-2">
                {modalItem.halfPrice && (
                  <button
                    onClick={() => handleAddToCart(modalItem, 'half')}
                    className="p-3 rounded-xl bg-stone-950 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-800 hover:border-amber-500 transition-colors text-left cursor-pointer"
                  >
                    <span className="block text-xs font-semibold">Half Plate</span>
                    <span className="block text-amber-400 group-hover:text-stone-950 font-black text-sm">
                      ₹{modalItem.halfPrice}
                    </span>
                  </button>
                )}
                <button
                  onClick={() => handleAddToCart(modalItem, 'full')}
                  className="p-3 rounded-xl bg-stone-950 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-800 hover:border-amber-500 transition-colors text-left cursor-pointer"
                >
                  <span className="block text-xs font-semibold">Full Plate</span>
                  <span className="block text-amber-400 group-hover:text-stone-950 font-black text-sm">
                    ₹{modalItem.price}
                  </span>
                </button>
              </div>
            </div>

            <a
              href={getSingleItemWhatsAppUrl(modalItem, 'full')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Order</span>
            </a>
          </div>
        </div>
      )}

    </section>
  );
};
