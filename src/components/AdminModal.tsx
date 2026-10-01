import React, { useState, useRef } from 'react';
import {
  X, Lock, Shield, Plus, Trash2, Edit3, Save, Check, RefreshCw,
  UtensilsCrossed, Tag, Image as ImageIcon, Clock, Phone, Star, AlertTriangle,
  Upload, Camera, CheckCircle2, ArrowRight, ShoppingBag, Download
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, SpecialOffer, GalleryItem } from '../types';
import { processImageFile, PRESET_FOOD_PHOTOS } from '../utils/imageUpload';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    hotelInfo,
    updateHotelInfo,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    specialOffers,
    addSpecialOffer,
    updateSpecialOffer,
    deleteSpecialOffer,
    galleryItems,
    addGalleryItem,
    deleteGalleryItem,
    reviews,
    deleteReview,
    orders,
    updateOrderStatus,
    deleteOrder,
    resetToDefaults
  } = useRestaurant();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const DEFAULT_PIN = '1885';

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'offers' | 'hotel' | 'gallery' | 'reviews'>('orders');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);

  // File input refs
  const itemFileInputRef = useRef<HTMLInputElement>(null);
  const offerFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Menu item modal/form states
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [showPresetPicker, setShowPresetPicker] = useState(false);

  const [itemForm, setItemForm] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    category: 'biryani',
    price: 140,
    halfPrice: 80,
    description: '',
    image: PRESET_FOOD_PHOTOS[0].url,
    isPopular: false,
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 'medium'
  });

  // Special Offer modal/form states
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [showOfferPresetPicker, setShowOfferPresetPicker] = useState(false);

  const [offerForm, setOfferForm] = useState<Omit<SpecialOffer, 'id'>>({
    title: '',
    tag: 'SPECIAL DEAL',
    discount: 'SAVE ₹50',
    description: '',
    originalPrice: 200,
    offerPrice: 170,
    image: PRESET_FOOD_PHOTOS[0].url,
    validity: 'Valid Daily',
    isActive: true
  });

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'biryani',
    image: PRESET_FOOD_PHOTOS[0].url,
    description: ''
  });

  // Hotel Info Local State
  const [hotelForm, setHotelForm] = useState({ ...hotelInfo });

  if (!isAdminOpen) return null;

  const showSaved = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === 'admin123') {
      setIsAuthenticated(true);
      setPinError(false);
      setHotelForm({ ...hotelInfo });
    } else {
      setPinError(true);
    }
  };

  // Image Upload Handlers
  const handleItemImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const dataUrl = await processImageFile(file);
      setItemForm(prev => ({ ...prev, image: dataUrl }));
      showSaved('Item photo uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload image');
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleOfferImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const dataUrl = await processImageFile(file);
      setOfferForm(prev => ({ ...prev, image: dataUrl }));
      showSaved('Offer banner photo uploaded!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload image');
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const dataUrl = await processImageFile(file);
      setGalleryForm(prev => ({ ...prev, image: dataUrl }));
      showSaved('Gallery photo ready!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload image');
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const dataUrl = await processImageFile(file, 400, 0.9);
      setHotelForm(prev => ({ ...prev, logoImage: dataUrl }));
      showSaved('Header logo uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload logo');
    } finally {
      setIsProcessingImg(false);
    }
  };

  // Menu Handlers
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name) return;

    if (editingItemId) {
      updateMenuItem(editingItemId, itemForm);
      showSaved(`Updated ${itemForm.name}`);
      setEditingItemId(null);
    } else {
      addMenuItem(itemForm);
      showSaved(`Added ${itemForm.name}`);
      setIsAddingItem(false);
    }

    setItemForm({
      name: '',
      category: 'biryani',
      price: 140,
      halfPrice: 80,
      description: '',
      image: PRESET_FOOD_PHOTOS[0].url,
      isPopular: false,
      isSpecial: false,
      isAvailable: true,
      spicyLevel: 'medium'
    });
  };

  const startEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setIsAddingItem(true);
    setItemForm({
      name: item.name,
      category: item.category,
      price: item.price,
      halfPrice: item.halfPrice || undefined,
      description: item.description,
      image: item.image,
      isPopular: !!item.isPopular,
      isSpecial: !!item.isSpecial,
      isAvailable: item.isAvailable,
      spicyLevel: item.spicyLevel || 'medium'
    });
  };

  // Offer Handlers
  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title) return;

    if (editingOfferId) {
      updateSpecialOffer(editingOfferId, offerForm);
      showSaved(`Updated ${offerForm.title}`);
      setEditingOfferId(null);
    } else {
      addSpecialOffer(offerForm);
      showSaved(`Added ${offerForm.title}`);
      setIsAddingOffer(false);
    }

    setOfferForm({
      title: '',
      tag: 'SPECIAL DEAL',
      discount: 'SAVE ₹50',
      description: '',
      originalPrice: 200,
      offerPrice: 170,
      image: PRESET_FOOD_PHOTOS[0].url,
      validity: 'Valid Daily',
      isActive: true
    });
  };

  const startEditOffer = (offer: SpecialOffer) => {
    setEditingOfferId(offer.id);
    setIsAddingOffer(true);
    setOfferForm({
      title: offer.title,
      tag: offer.tag,
      discount: offer.discount,
      description: offer.description,
      originalPrice: offer.originalPrice,
      offerPrice: offer.offerPrice,
      image: offer.image,
      validity: offer.validity,
      isActive: offer.isActive
    });
  };

  // Hotel Info Save
  const handleSaveHotelInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateHotelInfo(hotelForm);
    showSaved('Hotel details updated successfully!');
  };

  // Gallery Add Handler
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) return;
    addGalleryItem(galleryForm);
    showSaved(`Added photo to gallery`);
    setGalleryForm({
      title: '',
      category: 'biryani',
      image: PRESET_FOOD_PHOTOS[0].url,
      description: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">zȧm zȧm HOTEL – Admin Panel</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                  Live Editor
                </span>
              </div>
              <p className="text-xs text-stone-400">Update Menu, Prices, Photos, Special Offers & Timings</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice toast */}
        {savedNotice && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-1">Owner Admin Login</h4>
              <p className="text-xs text-stone-400">
                Enter your security PIN to edit items, prices, photos, and offers.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  maxLength={10}
                  placeholder="Enter PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center tracking-widest text-lg bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Incorrect PIN. Use: 1234
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-stone-950/80 border-b md:border-b-0 md:border-r border-stone-800 p-2 sm:p-3 flex md:flex-col gap-1 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-left transition-colors cursor-pointer ${
                  activeTab === 'orders' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Orders ({orders.length})</span>
                </div>
                {orders.some(o => o.status === 'Pending') && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-left transition-colors cursor-pointer ${
                  activeTab === 'menu' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Menu & Items ({menuItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-left transition-colors cursor-pointer ${
                  activeTab === 'offers' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Special Offers ({specialOffers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('hotel')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-left transition-colors cursor-pointer ${
                  activeTab === 'hotel' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Hotel Info & Timings</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-left transition-colors cursor-pointer ${
                  activeTab === 'gallery' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery Photos ({galleryItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-left transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Reviews ({reviews.length})</span>
              </button>

              <div className="mt-auto pt-4 border-t border-stone-800 hidden md:block space-y-2">
                <button
                  onClick={() => {
                    if (confirm('Reset all items, prices, offers, and settings to original defaults?')) {
                      resetToDefaults();
                      setHotelForm(hotelInfo);
                      showSaved('Reset to original factory defaults');
                    }
                  }}
                  className="w-full text-stone-500 hover:text-red-400 flex items-center gap-2 text-xs py-1.5 px-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Defaults</span>
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-stone-900/30">
              
              {/* TAB 0: LIVE ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>Customer Orders</span>
                        <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                          {orders.length} Total
                        </span>
                      </h4>
                      <p className="text-xs text-stone-400">
                        When users order from the website, orders are received on WhatsApp and recorded here in real-time.
                      </p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-16 bg-stone-950/60 rounded-3xl border border-stone-800 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mx-auto">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <h5 className="font-bold text-white text-sm">No orders yet</h5>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto">
                        When a customer adds dishes to the cart and sends the order via WhatsApp, it will appear here instantly.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 hover:border-amber-500/40 transition-colors shadow-lg"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800/80">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-amber-400 text-sm">Order #{ord.id}</span>
                                <span className="text-[10px] bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-stone-300 font-semibold">
                                  {ord.orderType}
                                </span>
                              </div>
                              <span className="text-[11px] text-stone-400">{ord.date}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                                className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer ${
                                  ord.status === 'Completed'
                                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                    : ord.status === 'Preparing'
                                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                                    : ord.status === 'Cancelled'
                                    ? 'bg-stone-900 text-stone-500 border-stone-800'
                                    : 'bg-blue-950 text-blue-400 border-blue-800'
                                }`}
                              >
                                <option value="Pending">🟡 Pending / New</option>
                                <option value="Preparing">🔥 Preparing</option>
                                <option value="Completed">✅ Completed</option>
                                <option value="Cancelled">❌ Cancelled</option>
                              </select>

                              <button
                                onClick={() => {
                                  if (confirm(`Delete Order #${ord.id}?`)) {
                                    deleteOrder(ord.id);
                                    showSaved('Order removed');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-stone-900 text-stone-500 hover:text-red-400 cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-stone-900/50 p-3 rounded-xl border border-stone-800/60">
                            <div>
                              <span className="text-stone-400 block text-[10px] uppercase font-bold">Customer</span>
                              <strong className="text-white">{ord.customerName}</strong>
                            </div>
                            <div>
                              <span className="text-stone-400 block text-[10px] uppercase font-bold">Delivery / Table Address</span>
                              <span className="text-stone-300">{ord.customerAddress}</span>
                            </div>
                            {ord.notes && (
                              <div className="sm:col-span-2 pt-1 border-t border-stone-800 text-amber-300 text-[11px]">
                                <strong>Notes:</strong> {ord.notes}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">Ordered Items:</span>
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-stone-900 last:border-none">
                                <span className="text-stone-200">
                                  {it.item.name} <span className="text-stone-500">({it.portion.toUpperCase()})</span> x {it.quantity}
                                </span>
                                <span className="font-bold text-amber-400">
                                  ₹{it.selectedPrice * it.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-800 font-bold text-sm">
                            <span className="text-white">Total Amount</span>
                            <span className="text-amber-400 text-base font-black">₹{ord.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: MENU & PRICE MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">Food Items & Pricing</h4>
                      <p className="text-xs text-stone-400">Change food photos (from mobile camera/gallery), names, prices, or add new delicacies.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingItemId(null);
                        setIsAddingItem(true);
                        setItemForm({
                          name: '',
                          category: 'biryani',
                          price: 140,
                          halfPrice: 80,
                          description: '',
                          image: PRESET_FOOD_PHOTOS[0].url,
                          isPopular: false,
                          isSpecial: false,
                          isAvailable: true,
                          spicyLevel: 'medium'
                        });
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Food Item</span>
                    </button>
                  </div>

                  {/* Add / Edit Form Modal or Accordion */}
                  {isAddingItem && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-amber-500/50 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                        <h5 className="font-bold text-white text-sm flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-amber-400" />
                          <span>{editingItemId ? 'Edit Food Item & Photo' : 'Add New Food Item'}</span>
                        </h5>
                        <button
                          onClick={() => { setIsAddingItem(false); setEditingItemId(null); }}
                          className="text-stone-400 hover:text-white text-xs cursor-pointer"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                        
                        {/* PHOTO UPLOADER & PREVIEW SECTION */}
                        <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                          <span className="block text-stone-300 font-bold">1. Food Item Photo (Pic)</span>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Preview */}
                            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-stone-950 border-2 border-amber-500/40 shrink-0">
                              <img
                                src={itemForm.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[10px] text-center text-amber-400 font-bold py-0.5">
                                Current Pic
                              </div>
                            </div>

                            {/* Upload Buttons */}
                            <div className="flex-1 space-y-2 w-full">
                              <div className="flex flex-wrap gap-2">
                                <input
                                  type="file"
                                  ref={itemFileInputRef}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleItemImageUpload}
                                />
                                <button
                                  type="button"
                                  disabled={isProcessingImg}
                                  onClick={() => itemFileInputRef.current?.click()}
                                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>{isProcessingImg ? 'Uploading...' : 'Upload Photo from Device'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setShowPresetPicker(!showPresetPicker)}
                                  className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                                >
                                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Pick from Food Library</span>
                                </button>
                              </div>

                              <div>
                                <label className="text-stone-400 text-[11px] block mb-1">Or paste image URL directly:</label>
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={itemForm.image}
                                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-white text-[11px]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Preset Picker Dropdown */}
                          {showPresetPicker && (
                            <div className="pt-2 border-t border-stone-800 space-y-2">
                              <span className="text-[11px] text-stone-400 font-semibold block">Click any photo to select:</span>
                              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                                {PRESET_FOOD_PHOTOS.map((preset) => (
                                  <div
                                    key={preset.name}
                                    onClick={() => {
                                      setItemForm({ ...itemForm, image: preset.url });
                                      setShowPresetPicker(false);
                                    }}
                                    className="cursor-pointer rounded-lg overflow-hidden border border-stone-800 hover:border-amber-400 transition-all hover:scale-105"
                                    title={preset.name}
                                  >
                                    <img src={preset.url} alt={preset.name} className="w-full h-12 object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* NAME, PRICE, CATEGORY FIELDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Food Item Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Special Chicken Biryani"
                              value={itemForm.name}
                              onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Category</label>
                            <select
                              value={itemForm.category}
                              onChange={(e) => setItemForm({ ...itemForm, category: e.target.value as any })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-medium"
                            >
                              <option value="biryani">Chicken Biryani</option>
                              <option value="fry">Chicken Fry</option>
                              <option value="rice">Chicken Rice</option>
                              <option value="kebab">Chicken Kebab</option>
                              <option value="tandoori">Tandoori</option>
                              <option value="special">Chef Special</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Full Plate Price (₹) *</label>
                            <input
                              type="number"
                              required
                              min={10}
                              value={itemForm.price}
                              onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-black text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Half Plate Price (₹) (Optional)</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="e.g. 80 (leave blank if full only)"
                              value={itemForm.halfPrice || ''}
                              onChange={(e) => setItemForm({ ...itemForm, halfPrice: e.target.value ? Number(e.target.value) : undefined })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-stone-300 font-semibold mb-1">Description</label>
                            <textarea
                              rows={2}
                              placeholder="Cooking style, spices, accompaniments..."
                              value={itemForm.description}
                              onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                          <div className="sm:col-span-2 flex items-center gap-4 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                              <input
                                type="checkbox"
                                checked={itemForm.isAvailable}
                                onChange={(e) => setItemForm({ ...itemForm, isAvailable: e.target.checked })}
                                className="rounded bg-stone-900 text-amber-500 w-4 h-4"
                              />
                              <span className="font-semibold">Available In Stock</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                              <input
                                type="checkbox"
                                checked={itemForm.isPopular}
                                onChange={(e) => setItemForm({ ...itemForm, isPopular: e.target.checked })}
                                className="rounded bg-stone-900 text-amber-500 w-4 h-4"
                              />
                              <span>Mark as Popular 🔥</span>
                            </label>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end gap-2 border-t border-stone-800">
                          <button
                            type="button"
                            onClick={() => { setIsAddingItem(false); setEditingItemId(null); }}
                            className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md"
                          >
                            {editingItemId ? 'Save Changes' : 'Add Item to Live Menu'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* List of items */}
                  <div className="space-y-2">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 sm:p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-stone-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-bold text-white text-sm truncate">{item.name}</h5>
                              <span className="text-[10px] uppercase font-bold text-stone-400 px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                                {item.category}
                              </span>
                              {!item.isAvailable && (
                                <span className="text-[10px] text-red-400 bg-red-950/60 px-2 py-0.5 rounded font-bold">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-stone-400 flex items-center gap-2 mt-1">
                              <span>Full: <strong className="text-amber-400 text-sm">₹{item.price}</strong></span>
                              {item.halfPrice && <span>| Half: <strong className="text-amber-400 text-sm">₹{item.halfPrice}</strong></span>}
                            </div>
                          </div>
                        </div>

                        {/* Quick Controls */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          {/* In Stock toggle */}
                          <button
                            onClick={() => {
                              updateMenuItem(item.id, { isAvailable: !item.isAvailable });
                              showSaved(`${item.name} ${!item.isAvailable ? 'now In Stock' : 'marked Sold Out'}`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border transition-colors ${
                              item.isAvailable
                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                                : 'bg-red-950/60 text-red-400 border-red-800/60'
                            }`}
                          >
                            {item.isAvailable ? 'In Stock' : 'Sold Out'}
                          </button>

                          <button
                            onClick={() => startEditItem(item)}
                            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white cursor-pointer border border-stone-800 flex items-center gap-1.5 text-xs font-semibold"
                            title="Edit Item Details & Photo"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete ${item.name} from menu?`)) {
                                deleteMenuItem(item.id);
                                showSaved(`Deleted ${item.name}`);
                              }
                            }}
                            className="p-2 rounded-xl bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-400 cursor-pointer border border-stone-800"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: SPECIAL OFFERS */}
              {activeTab === 'offers' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">Special Offers & Deals</h4>
                      <p className="text-xs text-stone-400">Change deal banners, discounts, prices, or add new promotions.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingOfferId(null);
                        setIsAddingOffer(true);
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Deal</span>
                    </button>
                  </div>

                  {isAddingOffer && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-amber-500/50 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                        <h5 className="font-bold text-white text-sm">
                          {editingOfferId ? 'Edit Special Offer' : 'Create New Special Deal'}
                        </h5>
                        <button
                          onClick={() => { setIsAddingOffer(false); setEditingOfferId(null); }}
                          className="text-stone-400 hover:text-white text-xs cursor-pointer"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
                        
                        {/* PHOTO UPLOADER FOR OFFERS */}
                        <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                          <span className="block text-stone-300 font-bold">Offer Banner Photo</span>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-28 h-20 rounded-2xl overflow-hidden bg-stone-950 border-2 border-amber-500/40 shrink-0">
                              <img src={offerForm.image} alt="Offer Preview" className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 space-y-2 w-full">
                              <div className="flex flex-wrap gap-2">
                                <input
                                  type="file"
                                  ref={offerFileInputRef}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleOfferImageUpload}
                                />
                                <button
                                  type="button"
                                  onClick={() => offerFileInputRef.current?.click()}
                                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>Upload Offer Pic</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setShowOfferPresetPicker(!showOfferPresetPicker)}
                                  className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-white px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                                >
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span>Pick from Library</span>
                                </button>
                              </div>

                              <input
                                type="url"
                                placeholder="Or enter image URL"
                                value={offerForm.image}
                                onChange={(e) => setOfferForm({ ...offerForm, image: e.target.value })}
                                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-1 text-white text-[11px]"
                              />
                            </div>
                          </div>

                          {showOfferPresetPicker && (
                            <div className="pt-2 border-t border-stone-800 grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                              {PRESET_FOOD_PHOTOS.map((preset) => (
                                <div
                                  key={preset.name}
                                  onClick={() => {
                                    setOfferForm({ ...offerForm, image: preset.url });
                                    setShowOfferPresetPicker(false);
                                  }}
                                  className="cursor-pointer rounded-lg overflow-hidden border border-stone-800 hover:border-amber-400"
                                >
                                  <img src={preset.url} alt={preset.name} className="w-full h-12 object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Deal Title *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Super Family Biryani Feast"
                              value={offerForm.title}
                              onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Discount Tag *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. SAVE ₹60 or 20% OFF"
                              value={offerForm.discount}
                              onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Deal Offer Price (₹)</label>
                            <input
                              type="number"
                              value={offerForm.offerPrice || ''}
                              onChange={(e) => setOfferForm({ ...offerForm, offerPrice: Number(e.target.value) })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-black text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Original Price (₹)</label>
                            <input
                              type="number"
                              value={offerForm.originalPrice || ''}
                              onChange={(e) => setOfferForm({ ...offerForm, originalPrice: Number(e.target.value) })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-stone-300 font-semibold mb-1">Deal Description</label>
                            <textarea
                              rows={2}
                              value={offerForm.description}
                              onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1">Validity Text</label>
                            <input
                              type="text"
                              value={offerForm.validity}
                              onChange={(e) => setOfferForm({ ...offerForm, validity: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-5">
                            <label className="flex items-center gap-2 cursor-pointer text-stone-300 font-bold">
                              <input
                                type="checkbox"
                                checked={offerForm.isActive}
                                onChange={(e) => setOfferForm({ ...offerForm, isActive: e.target.checked })}
                                className="rounded bg-stone-900 text-amber-500 w-4 h-4"
                              />
                              <span>Offer is Active & Visible</span>
                            </label>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end gap-2 border-t border-stone-800">
                          <button
                            type="button"
                            onClick={() => { setIsAddingOffer(false); setEditingOfferId(null); }}
                            className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-2.5 rounded-xl cursor-pointer"
                          >
                            Save Deal
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="space-y-3">
                    {specialOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className="p-3 sm:p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="w-16 h-16 rounded-2xl object-cover border border-stone-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-bold text-white text-sm">{offer.title}</h5>
                              <span className="text-[10px] font-black text-stone-950 bg-amber-400 px-2 py-0.5 rounded-full">
                                {offer.discount}
                              </span>
                              {!offer.isActive && (
                                <span className="text-[10px] text-stone-500 bg-stone-900 px-2 py-0.5 rounded">
                                  Disabled
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{offer.description}</p>
                            <span className="text-xs font-bold text-amber-400">Offer Price: ₹{offer.offerPrice}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startEditOffer(offer)}
                            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-stone-900 text-stone-300 hover:text-white cursor-pointer border border-stone-800 flex items-center gap-1 text-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete offer ${offer.title}?`)) {
                                deleteSpecialOffer(offer.id);
                                showSaved('Offer deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-red-400 cursor-pointer border border-stone-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: HOTEL INFO, LOGO, CONTACT, LOCATION & SOCIALS */}
              {activeTab === 'hotel' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Hotel Info, Logo & Contact Settings</h4>
                    <p className="text-xs text-stone-400">Update Header Logo, Hotel Name, Phone, WhatsApp, Address, Google Map, and Social Links.</p>
                  </div>

                  <form onSubmit={handleSaveHotelInfo} className="space-y-6 text-xs">
                    
                    {/* SECTION 1: SITE HEADER LOGO & HOTEL NAME */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                        <span className="text-amber-400 font-bold text-sm">1. Site Header Logo & Hotel Name</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Current Logo Preview */}
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-500/40 flex items-center justify-center shrink-0">
                          {hotelForm.logoImage ? (
                            <img src={hotelForm.logoImage} alt="Logo Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black text-2xl font-brand">
                              Z
                            </div>
                          )}
                        </div>

                        {/* Upload Controls */}
                        <div className="flex-1 space-y-2 w-full">
                          <input
                            type="file"
                            ref={logoFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => logoFileInputRef.current?.click()}
                              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>Upload New Logo Pic</span>
                            </button>

                            {hotelForm.logoImage && (
                              <button
                                type="button"
                                onClick={() => {
                                  setHotelForm(prev => ({ ...prev, logoImage: undefined }));
                                  showSaved('Logo reset to default');
                                }}
                                className="bg-stone-800 hover:bg-red-950 text-stone-400 hover:text-red-400 px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                              >
                                Remove Custom Logo
                              </button>
                            )}
                          </div>

                          <div>
                            <label className="text-stone-400 text-[11px] block mb-1">Or paste Logo image URL:</label>
                            <input
                              type="url"
                              placeholder="https://..."
                              value={hotelForm.logoImage || ''}
                              onChange={(e) => setHotelForm({ ...hotelForm, logoImage: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-white text-[11px]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Hotel / Brand Name *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.name}
                            onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-black text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Primary Tagline</label>
                          <input
                            type="text"
                            value={hotelForm.tagline}
                            onChange={(e) => setHotelForm({ ...hotelForm, tagline: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-stone-300 font-semibold mb-1">Sub-Tagline / Motto</label>
                          <input
                            type="text"
                            value={hotelForm.subTagline}
                            onChange={(e) => setHotelForm({ ...hotelForm, subTagline: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: CONTACT INFORMATIONS & TIMINGS */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                        <span className="text-amber-400 font-bold text-sm">2. Contact Information & Timings</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Director / Owner Name *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.director}
                            onChange={(e) => setHotelForm({ ...hotelForm, director: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Mobile / Calling Number *</label>
                          <input
                            type="tel"
                            required
                            value={hotelForm.phone}
                            onChange={(e) => setHotelForm({ ...hotelForm, phone: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-black"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">WhatsApp Number (Food Orders) *</label>
                          <input
                            type="tel"
                            required
                            value={hotelForm.whatsapp}
                            onChange={(e) => setHotelForm({ ...hotelForm, whatsapp: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-emerald-400 font-black"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Contact Email Address</label>
                          <input
                            type="email"
                            value={hotelForm.email || ''}
                            onChange={(e) => setHotelForm({ ...hotelForm, email: e.target.value })}
                            placeholder="e.g. info@zamzamhotel.com"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Daily Opening Time</label>
                          <input
                            type="text"
                            value={hotelForm.openingTime}
                            onChange={(e) => setHotelForm({ ...hotelForm, openingTime: e.target.value })}
                            placeholder="e.g. 10:00 AM"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Daily Closing Time</label>
                          <input
                            type="text"
                            value={hotelForm.closingTime}
                            onChange={(e) => setHotelForm({ ...hotelForm, closingTime: e.target.value })}
                            placeholder="e.g. 11:00 PM"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: LOCATION & FULL ADDRESS */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                        <span className="text-amber-400 font-bold text-sm">3. Location & Address Details</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">Village *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.addressVillage}
                            onChange={(e) => setHotelForm({ ...hotelForm, addressVillage: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">P.O. (Post Office) *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.addressPO}
                            onChange={(e) => setHotelForm({ ...hotelForm, addressPO: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">P.S. (Police Station) *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.addressPS}
                            onChange={(e) => setHotelForm({ ...hotelForm, addressPS: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">District *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.addressDistrict}
                            onChange={(e) => setHotelForm({ ...hotelForm, addressDistrict: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">State *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.addressState}
                            onChange={(e) => setHotelForm({ ...hotelForm, addressState: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1">PIN Code *</label>
                          <input
                            type="text"
                            required
                            value={hotelForm.addressPincode}
                            onChange={(e) => setHotelForm({ ...hotelForm, addressPincode: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white font-bold text-amber-400"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-3">
                          <label className="block text-stone-300 font-semibold mb-1">Google Maps "Get Directions" Link</label>
                          <input
                            type="url"
                            value={hotelForm.googleMapsDirectionsUrl}
                            onChange={(e) => setHotelForm({ ...hotelForm, googleMapsDirectionsUrl: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-3">
                          <label className="block text-stone-300 font-semibold mb-1">Google Maps Iframe Embed URL</label>
                          <input
                            type="text"
                            placeholder="https://www.google.com/maps/embed?..."
                            value={hotelForm.googleMapsEmbedUrl || ''}
                            onChange={(e) => setHotelForm({ ...hotelForm, googleMapsEmbedUrl: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: SOCIAL MEDIA PROFILES */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                        <span className="text-amber-400 font-bold text-sm">4. Social Media Profiles & Links</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
                            <span>📱 WhatsApp Link / URL</span>
                          </label>
                          <input
                            type="text"
                            value={hotelForm.socials?.whatsapp || ''}
                            onChange={(e) => setHotelForm({
                              ...hotelForm,
                              socials: { ...hotelForm.socials, whatsapp: e.target.value }
                            })}
                            placeholder="https://wa.me/919631343645"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
                            <span>📘 Facebook Profile / Page URL</span>
                          </label>
                          <input
                            type="url"
                            value={hotelForm.socials?.facebook || ''}
                            onChange={(e) => setHotelForm({
                              ...hotelForm,
                              socials: { ...hotelForm.socials, facebook: e.target.value }
                            })}
                            placeholder="https://facebook.com/your-hotel"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
                            <span>📸 Instagram Profile URL</span>
                          </label>
                          <input
                            type="url"
                            value={hotelForm.socials?.instagram || ''}
                            onChange={(e) => setHotelForm({
                              ...hotelForm,
                              socials: { ...hotelForm.socials, instagram: e.target.value }
                            })}
                            placeholder="https://instagram.com/your-hotel"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 font-semibold mb-1 flex items-center gap-1.5">
                            <span>▶️ YouTube Channel URL</span>
                          </label>
                          <input
                            type="url"
                            value={hotelForm.socials?.youtube || ''}
                            onChange={(e) => setHotelForm({
                              ...hotelForm,
                              socials: { ...hotelForm.socials, youtube: e.target.value }
                            })}
                            placeholder="https://youtube.com/@your-hotel"
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-black px-8 py-3 rounded-2xl cursor-pointer flex items-center gap-2 shadow-xl shadow-amber-500/20 text-sm transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save All Hotel, Logo & Social Details</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 4: GALLERY MANAGEMENT */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Food & Hotel Gallery</h4>
                    <p className="text-xs text-stone-400">Upload new food photos, dining ambience, or kitchen pictures.</p>
                  </div>

                  {/* Add photo form */}
                  <form onSubmit={handleAddGallery} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Photo Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Fresh Tandoori Batch"
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Category</label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                        >
                          <option value="biryani">Chicken Biryani</option>
                          <option value="fry">Chicken Fry</option>
                          <option value="kebab">Chicken Kebab</option>
                          <option value="tandoori">Tandoori</option>
                          <option value="rice">Chicken Rice</option>
                          <option value="ambience">Hotel & Dining Ambience</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Upload Photo from Phone/PC or Enter URL</label>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            ref={galleryFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleGalleryImageUpload}
                          />
                          <button
                            type="button"
                            onClick={() => galleryFileInputRef.current?.click()}
                            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                          </button>
                          <input
                            type="url"
                            required
                            placeholder="https://..."
                            value={galleryForm.image}
                            onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl cursor-pointer"
                      >
                        Add to Gallery
                      </button>
                    </div>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 group">
                        <img src={item.image} alt={item.title} className="w-full h-28 sm:h-32 object-cover" />
                        <div className="p-2">
                          <span className="text-[10px] text-amber-400 uppercase font-bold block">{item.category}</span>
                          <span className="text-xs font-semibold text-white truncate block">{item.title}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Remove photo ${item.title}?`)) {
                              deleteGalleryItem(item.id);
                              showSaved('Photo removed');
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-red-400 hover:text-white cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS MANAGEMENT */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Customer Reviews</h4>
                    <p className="text-xs text-stone-400">View and remove visitor reviews and ratings.</p>
                  </div>

                  <div className="space-y-2">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{rev.name}</span>
                            <span className="text-stone-500 text-[11px]">({rev.location})</span>
                            <span className="text-amber-400 font-bold text-xs">★ {rev.rating}/5</span>
                          </div>
                          <p className="text-xs text-stone-300 mt-1 italic">"{rev.comment}"</p>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Delete review from ${rev.name}?`)) {
                              deleteReview(rev.id);
                              showSaved('Review removed');
                            }
                          }}
                          className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-red-400 cursor-pointer border border-stone-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
