import React from 'react';
import { Phone, MessageSquare, ShoppingBag } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const MobileStickyBar: React.FC = () => {
  const { hotelInfo, cartCount, setIsCartOpen } = useRestaurant();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 p-2.5 px-3 shadow-2xl">
      <div className="grid grid-cols-12 gap-2 items-center">
        
        {/* CALL NOW BUTTON */}
        <a
          href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
          className="col-span-5 flex items-center justify-center gap-1.5 bg-stone-900 active:scale-95 text-stone-100 font-bold py-3 px-2 rounded-xl text-xs border border-stone-700 shadow-md"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>CALL NOW</span>
        </a>

        {/* WHATSAPP BUTTON */}
        <a
          href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello zȧm zȧm HOTEL Kaliganj! I want to order food.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-5 flex items-center justify-center gap-1.5 bg-emerald-600 active:scale-95 text-white font-bold py-3 px-2 rounded-xl text-xs shadow-md shadow-emerald-950/50"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WHATSAPP</span>
        </a>

        {/* CART BUTTON */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="col-span-2 flex items-center justify-center bg-amber-500 active:scale-95 text-stone-950 font-black py-3 rounded-xl relative shadow-md"
          aria-label="Open Order Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
};
