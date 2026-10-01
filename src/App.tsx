import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TopQuickProducts } from './components/TopQuickProducts';
import { SpecialOffers } from './components/SpecialOffers';
import { MenuSection } from './components/MenuSection';
import { SpecialitySection } from './components/SpecialitySection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';

function AppContent() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <TopQuickProducts />
        <SpecialOffers />
        <MenuSection />
        <SpecialitySection />
        <AboutSection />
        <GallerySection />
        <ReviewsSection />
        <LocationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Modals and Drawers */}
      <CartDrawer />
      <AdminModal />

      {/* Sticky Call Now & WhatsApp bar for Mobile */}
      <MobileStickyBar />

    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}
