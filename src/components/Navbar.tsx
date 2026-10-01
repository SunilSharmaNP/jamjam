import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ShoppingBag, Menu, X, Shield, Clock, MapPin, Sparkles, FolderArchive, Download } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Navbar: React.FC = () => {
  const { hotelInfo, cartCount, setIsCartOpen, setIsAdminOpen, setIsDownloadModalOpen } = useRestaurant();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Special Offers', href: '#offers' },
    { name: 'Why Us', href: '#speciality' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro bar for quick announcement */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-stone-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Hot & Fresh Dum Biryani, Crispy Fry & Tandoori
            </span>
            <span className="text-stone-500">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" /> Kaliganj, Manihari, Katihar (854116)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {hotelInfo.openingTime} – {hotelInfo.closingTime}
            </span>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1 cursor-pointer bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-lg text-[10px]"
              title="Download Complete Source Code ZIP"
            >
              <Download className="w-3 h-3" /> Download Code (ZIP)
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Admin Panel Login"
            >
              <Shield className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-950/95 backdrop-blur-md shadow-xl shadow-black/50 border-b border-stone-800/80 py-2.5'
            : 'bg-stone-950/80 backdrop-blur-sm border-b border-stone-900 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo with exact lettering: zȧm zȧm HOTEL or Custom Uploaded Logo */}
            <a href="#home" className="group flex items-center gap-3">
              {hotelInfo.logoImage ? (
                <img
                  src={hotelInfo.logoImage}
                  alt={hotelInfo.name}
                  className="w-11 h-11 rounded-xl object-cover border border-amber-500/40 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-stone-950 font-black text-xl font-brand">Z</span>
                </div>
              )}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-brand font-black text-lg sm:text-2xl tracking-wider text-white group-hover:text-amber-400 transition-colors">
                    {hotelInfo.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                  <span>{hotelInfo.addressVillage || 'KALIGANJ'}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  <span className="text-amber-500/90">{hotelInfo.addressDistrict || 'KATIHAR'}</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-amber-400"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Call Now Button */}
              <a
                href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
                className="hidden sm:inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Now</span>
              </a>

              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello zȧm zȧm HOTEL Kaliganj! I would like to order delicious food.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-md shadow-emerald-950/40"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Order</span>
                {cartCount > 0 && (
                  <span className="bg-stone-950 text-amber-400 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin Direct Button */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
                title="Admin Panel (Edit Pics, Prices, Offers)"
                aria-label="Admin Panel"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="hidden xl:inline text-xs font-semibold">Admin</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-stone-950/98 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <a
                href={`tel:${hotelInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 bg-stone-900 border border-stone-800 text-stone-200 p-2.5 rounded-xl text-xs font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {hotelInfo.phone}</span>
              </a>
              <a
                href={`https://wa.me/91${hotelInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello zȧm zȧm HOTEL Kaliganj! I want to order food.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-2.5 rounded-xl text-xs font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="border-t border-stone-900 pt-2 grid grid-cols-2 gap-1 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-stone-300 hover:text-amber-400 hover:bg-stone-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="border-t border-stone-900 pt-3 flex flex-col gap-2 text-xs text-stone-400 px-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDownloadModalOpen(true);
                }}
                className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Source Code (.ZIP)</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <span>Director: {hotelInfo.director}</span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" /> Admin Panel
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
