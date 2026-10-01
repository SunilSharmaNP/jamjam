import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { galleryItems, setIsAdminOpen } = useRestaurant();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'biryani', label: 'Chicken Biryani' },
    { id: 'fry', label: 'Chicken Fry' },
    { id: 'kebab', label: 'Kebabs' },
    { id: 'tandoori', label: 'Tandoori' },
    { id: 'rice', label: 'Chicken Rice' },
    { id: 'ambience', label: 'Hotel & Dining' },
  ];

  const filteredGallery = galleryItems.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredGallery.findIndex(g => g.id === item.id);
    if (idx !== -1) setActiveLightboxIndex(idx);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-stone-900/30 border-y border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Camera className="w-4 h-4" />
              <span>Real Visual Glimpses</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
              Food & Hotel Gallery
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-xl">
              Authentic photos of our fresh chicken dishes, charcoal tandoor, welcoming dining hall, and hotel ambience.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs text-stone-400 hover:text-amber-400 transition-colors underline cursor-pointer"
            >
              Manage Gallery in Admin
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/50 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-800 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredGallery[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-white cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredGallery[activeLightboxIndex].image}
              alt={filteredGallery[activeLightboxIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-stone-800 shadow-2xl"
            />
            <div className="text-center mt-4 space-y-1">
              <h3 className="text-xl font-bold text-white">
                {filteredGallery[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-stone-400 max-w-lg">
                {filteredGallery[activeLightboxIndex].description}
              </p>
              <span className="text-[11px] text-stone-500 block pt-1">
                Photo {activeLightboxIndex + 1} of {filteredGallery.length}
              </span>
            </div>
          </div>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </section>
  );
};
