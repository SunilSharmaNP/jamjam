import React from 'react';
import { MapPin, Navigation, Clock, Phone, MessageSquare, Compass, Shield } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LocationSection: React.FC = () => {
  const { hotelInfo } = useRestaurant();

  // Coordinates or embed URL configured via Admin Panel
  const defaultEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115160.20392348332!2d87.5258522614534!3d25.337194680213197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0494cf6f0cf23%3A0x47cb2321473cf4c7!2sManihari%2C%20Bihar!5e0!3m2!1sen!2sin!4v1711800000000!5m2!1sen!2sin";
  const mapEmbedUrl = hotelInfo.googleMapsEmbedUrl || defaultEmbed;

  return (
    <section id="location" className="py-20 bg-stone-900/60 border-y border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Visit Our Hotel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
            Google Map & Location
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2">
            Easily navigate to <span className="text-white font-bold">{hotelInfo.name}</span> in {hotelInfo.addressVillage}, {hotelInfo.addressDistrict}. Direct route assistance is just a tap away.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address Details Card */}
          <div className="lg:col-span-5 rounded-3xl bg-stone-950 border border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-brand">
                    {hotelInfo.name}
                  </h3>
                  <span className="text-xs text-stone-400">{hotelInfo.addressVillage}, {hotelInfo.addressDistrict}, {hotelInfo.addressState}</span>
                </div>
              </div>

              {/* Exact structured address as specified in requirements */}
              <div className="space-y-2 p-4 rounded-2xl bg-stone-900/80 border border-stone-800/80 text-xs sm:text-sm">
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-800">
                  <span className="text-stone-500 font-medium">Village:</span>
                  <span className="text-white font-bold col-span-2">{hotelInfo.addressVillage}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-800">
                  <span className="text-stone-500 font-medium">P.O. (Post):</span>
                  <span className="text-white font-semibold col-span-2">{hotelInfo.addressPO}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-800">
                  <span className="text-stone-500 font-medium">P.S. (Police):</span>
                  <span className="text-white font-semibold col-span-2">{hotelInfo.addressPS}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-stone-800">
                  <span className="text-stone-500 font-medium">District:</span>
                  <span className="text-white font-semibold col-span-2">{hotelInfo.addressDistrict}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1">
                  <span className="text-stone-500 font-medium">State & PIN:</span>
                  <span className="text-amber-400 font-bold col-span-2">{hotelInfo.addressState} – {hotelInfo.addressPincode}</span>
                </div>
              </div>

              {/* Timings & Director info */}
              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Serving Daily: <strong className="text-white">{hotelInfo.openingTime} – {hotelInfo.closingTime}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Director: <strong className="text-white">{hotelInfo.director}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Call / WhatsApp: <strong className="text-white">+91 {hotelInfo.phone}</strong></span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-stone-800 space-y-3">
              {/* Prominent GET DIRECTIONS BUTTON */}
              <a
                href={hotelInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-black py-3.5 px-6 rounded-2xl text-sm transition-all duration-200 shadow-xl shadow-amber-500/20"
              >
                <Navigation className="w-5 h-5 fill-stone-950" />
                <span>📍 GET DIRECTIONS</span>
              </a>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 py-2.5 rounded-xl border border-stone-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Hotel</span>
                </a>
                <a
                  href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello zȧm zȧm HOTEL! Please share location assistance.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 py-2.5 rounded-xl border border-emerald-500/30 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Google Map Iframe */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative min-h-[380px] lg:min-h-full bg-stone-950">
            <iframe
              src={mapEmbedUrl}
              title="zȧm zȧm HOTEL Kaliganj Google Map"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
            />
            
            {/* Overlay map floating card */}
            <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-stone-800 px-4 py-2.5 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <div>
                <span className="font-bold text-white block">zȧm zȧm HOTEL Kaliganj</span>
                <span className="text-[11px] text-stone-400">P.S. Manihari, Katihar</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
