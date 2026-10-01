import React from 'react';
import { Phone, MessageSquare, MapPin, Shield, Heart, Download } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const { hotelInfo, setIsAdminOpen, setIsDownloadModalOpen } = useRestaurant();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {hotelInfo.logoImage ? (
                <img
                  src={hotelInfo.logoImage}
                  alt={hotelInfo.name}
                  className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-stone-950 text-xl font-brand shadow-lg shadow-amber-500/20">
                  Z
                </div>
              )}
              <div>
                <h3 className="text-xl font-black text-white font-brand tracking-wider">
                  {hotelInfo.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-stone-400">
                  {hotelInfo.addressVillage || 'Kaliganj'} • {hotelInfo.addressDistrict || 'Katihar'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              {hotelInfo.tagline} • {hotelInfo.subTagline}
            </p>

            <div className="space-y-1.5 text-xs text-stone-400 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Village – {hotelInfo.addressVillage}, P.O. – {hotelInfo.addressPO}, P.S. – {hotelInfo.addressPS}, District – {hotelInfo.addressDistrict}, {hotelInfo.addressState} – {hotelInfo.addressPincode}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Direct Contact: +91 {hotelInfo.phone}</span>
              </p>
              <p className="text-stone-300 font-semibold pt-1">
                Director – {hotelInfo.director}
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Special Menu & Prices</a></li>
              <li><a href="#offers" className="hover:text-amber-400 transition-colors">Current Offers & Combos</a></li>
              <li><a href="#speciality" className="hover:text-amber-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Food & Hotel Gallery</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About zȧm zȧm HOTEL</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Google Maps Directions</a></li>
            </ul>
          </div>

          {/* Social Media & Working Hours Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect & Social Media</h4>
            <p className="text-xs text-stone-400">
              Follow our daily specials and latest announcements on official social channels.
            </p>

            {/* Social Media Buttons (WhatsApp, Facebook, Instagram, YouTube) */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-stone-900 hover:bg-emerald-600/20 text-stone-300 hover:text-emerald-400 p-2.5 rounded-xl border border-stone-800 transition-colors"
              >
                <span className="text-base">📱</span>
                <span className="font-semibold">WhatsApp</span>
              </a>

              <a
                href={hotelInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-stone-900 hover:bg-blue-600/20 text-stone-300 hover:text-blue-400 p-2.5 rounded-xl border border-stone-800 transition-colors"
              >
                <span className="text-base">📘</span>
                <span className="font-semibold">Facebook</span>
              </a>

              <a
                href={hotelInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-stone-900 hover:bg-pink-600/20 text-stone-300 hover:text-pink-400 p-2.5 rounded-xl border border-stone-800 transition-colors"
              >
                <span className="text-base">📸</span>
                <span className="font-semibold">Instagram</span>
              </a>

              <a
                href={hotelInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-stone-900 hover:bg-red-600/20 text-stone-300 hover:text-red-400 p-2.5 rounded-xl border border-stone-800 transition-colors"
              >
                <span className="text-base">▶️</span>
                <span className="font-semibold">YouTube</span>
              </a>
            </div>

            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-[11px] text-stone-400">
              <span>Operating Hours: </span>
              <strong className="text-amber-400">{hotelInfo.openingTime} – {hotelInfo.closingTime}</strong> (Open 7 Days a Week)
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-stone-300 font-brand">zȧm zȧm HOTEL</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-stone-400">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for Kaliganj Foodies
            </span>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download source code zip for Vercel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Code (.ZIP)</span>
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-stone-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
