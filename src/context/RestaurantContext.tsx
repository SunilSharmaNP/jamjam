import React, { createContext, useContext, useState, useEffect } from 'react';
import { HotelInfo, MenuItem, SpecialOffer, GalleryItem, CustomerReview, CartItem, PlacedOrder } from '../types';
import { DEFAULT_HOTEL_INFO, DEFAULT_MENU_ITEMS, DEFAULT_OFFERS, DEFAULT_GALLERY, DEFAULT_REVIEWS } from '../data/defaultData';

interface RestaurantContextType {
  hotelInfo: HotelInfo;
  updateHotelInfo: (info: Partial<HotelInfo>) => void;
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  specialOffers: SpecialOffer[];
  addSpecialOffer: (offer: Omit<SpecialOffer, 'id'>) => void;
  updateSpecialOffer: (id: string, updated: Partial<SpecialOffer>) => void;
  deleteSpecialOffer: (id: string) => void;
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;
  deleteReview: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, portion?: 'half' | 'full', quantity?: number) => void;
  removeFromCart: (itemId: string, portion: 'half' | 'full') => void;
  updateCartQuantity: (itemId: string, portion: 'half' | 'full', qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  orders: PlacedOrder[];
  recordOrder: (details: { name: string; address: string; orderType: string; notes?: string }) => PlacedOrder;
  updateOrderStatus: (id: string, status: PlacedOrder['status']) => void;
  deleteOrder: (id: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  resetToDefaults: () => void;
  getWhatsAppOrderUrl: (details?: { name?: string; address?: string; orderType?: string; notes?: string }) => string;
  getSingleItemWhatsAppUrl: (item: MenuItem, portion?: 'half' | 'full') => string;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hotelInfo, setHotelInfo] = useState<HotelInfo>(() => {
    const saved = localStorage.getItem('zamzam_hotel_info');
    return saved ? JSON.parse(saved) : DEFAULT_HOTEL_INFO;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('zamzam_menu_items');
    return saved ? JSON.parse(saved) : DEFAULT_MENU_ITEMS;
  });

  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() => {
    const saved = localStorage.getItem('zamzam_special_offers');
    return saved ? JSON.parse(saved) : DEFAULT_OFFERS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('zamzam_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('zamzam_reviews');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zamzam_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    const saved = localStorage.getItem('zamzam_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('zamzam_hotel_info', JSON.stringify(hotelInfo));
  }, [hotelInfo]);

  useEffect(() => {
    localStorage.setItem('zamzam_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('zamzam_special_offers', JSON.stringify(specialOffers));
  }, [specialOffers]);

  useEffect(() => {
    localStorage.setItem('zamzam_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('zamzam_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('zamzam_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zamzam_orders', JSON.stringify(orders));
  }, [orders]);

  const updateHotelInfo = (info: Partial<HotelInfo>) => {
    setHotelInfo(prev => ({ ...prev, ...info }));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const addSpecialOffer = (offer: Omit<SpecialOffer, 'id'>) => {
    const newOffer: SpecialOffer = {
      ...offer,
      id: `offer-${Date.now()}`
    };
    setSpecialOffers(prev => [newOffer, ...prev]);
  };

  const updateSpecialOffer = (id: string, updated: Partial<SpecialOffer>) => {
    setSpecialOffers(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteSpecialOffer = (id: string) => {
    setSpecialOffers(prev => prev.filter(item => item.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newGal: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGalleryItems(prev => [newGal, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  const addReview = (review: Omit<CustomerReview, 'id' | 'date'>) => {
    const newRev: CustomerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      isVerified: true
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (item: MenuItem, portion: 'half' | 'full' = 'full', quantity = 1) => {
    const price = portion === 'half' && item.halfPrice ? item.halfPrice : item.price;
    setCart(prev => {
      const existingIndex = prev.findIndex(ci => ci.item.id === item.id && ci.portion === portion);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { item, portion, quantity, selectedPrice: price }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string, portion: 'half' | 'full') => {
    setCart(prev => prev.filter(ci => !(ci.item.id === itemId && ci.portion === portion)));
  };

  const updateCartQuantity = (itemId: string, portion: 'half' | 'full', qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId, portion);
      return;
    }
    setCart(prev => prev.map(ci => {
      if (ci.item.id === itemId && ci.portion === portion) {
        return { ...ci, quantity: qty };
      }
      return ci;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const recordOrder = (details: { name: string; address: string; orderType: string; notes?: string }): PlacedOrder => {
    const newOrder: PlacedOrder = {
      id: `ZZ-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      total: cartTotal,
      customerName: details.name || 'Customer',
      customerAddress: details.address || 'Kaliganj Area',
      orderType: details.orderType,
      notes: details.notes,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: PlacedOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const resetToDefaults = () => {
    setHotelInfo(DEFAULT_HOTEL_INFO);
    setMenuItems(DEFAULT_MENU_ITEMS);
    setSpecialOffers(DEFAULT_OFFERS);
    setGalleryItems(DEFAULT_GALLERY);
    setReviews(DEFAULT_REVIEWS);
    setCart([]);
    localStorage.removeItem('zamzam_hotel_info');
    localStorage.removeItem('zamzam_menu_items');
    localStorage.removeItem('zamzam_special_offers');
    localStorage.removeItem('zamzam_gallery');
    localStorage.removeItem('zamzam_reviews');
    localStorage.removeItem('zamzam_cart');
  };

  const getWhatsAppOrderUrl = (details?: { name?: string; address?: string; orderType?: string; notes?: string }) => {
    const rawPhone = hotelInfo.whatsapp.replace(/\D/g, '') || '9631343645';
    const formattedPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    if (cart.length === 0) {
      const fallbackMsg = `Hello ZAM ZAM HOTEL Kaliganj! I would like to place a food order. Please share today's menu and availability.`;
      return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(fallbackMsg)}`;
    }

    const itemsText = cart.map((c, i) => {
      return `${i + 1}. ${c.item.name} (${c.portion.toUpperCase()}) x ${c.quantity} = ₹${c.selectedPrice * c.quantity}`;
    }).join('\n');

    let msg = `*NEW ORDER - zȧm zȧm HOTEL KALIGANJ*\n\n`;
    msg += `*Order Items:*\n${itemsText}\n\n`;
    msg += `*Total Amount:* ₹${cartTotal}\n`;
    msg += `*Order Type:* ${details?.orderType || 'Takeaway (Parcel)'}\n`;
    if (details?.name) msg += `*Customer Name:* ${details.name}\n`;
    if (details?.address) msg += `*Address / Table No:* ${details.address}\n`;
    if (details?.notes) msg += `*Special Instructions:* ${details.notes}\n`;
    msg += `\nPlease confirm my order. Thank you!`;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
  };

  const getSingleItemWhatsAppUrl = (item: MenuItem, portion: 'half' | 'full' = 'full') => {
    const rawPhone = hotelInfo.whatsapp.replace(/\D/g, '') || '9631343645';
    const formattedPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const price = portion === 'half' && item.halfPrice ? item.halfPrice : item.price;
    const msg = `Hello Zam Zam HOTEL Kaliganj!\nI want to order:\n- *${item.name}* (${portion.toUpperCase()})\n- Price: ₹${price}\n\nPlease confirm availability and preparation time. Thank you!`;
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <RestaurantContext.Provider
      value={{
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
        addReview,
        deleteReview,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        recordOrder,
        updateOrderStatus,
        deleteOrder,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        resetToDefaults,
        getWhatsAppOrderUrl,
        getSingleItemWhatsAppUrl
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
