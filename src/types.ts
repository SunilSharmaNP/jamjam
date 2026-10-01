export interface MenuItem {
  id: string;
  name: string;
  category: 'biryani' | 'fry' | 'rice' | 'kebab' | 'tandoori' | 'special';
  price: number;
  halfPrice?: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  isAvailable: boolean;
  spicyLevel?: 'mild' | 'medium' | 'hot';
  portionInfo?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  tag: string;
  discount: string;
  description: string;
  originalPrice?: number;
  offerPrice?: number;
  image: string;
  validity: string;
  isActive: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'biryani' | 'fry' | 'rice' | 'kebab' | 'tandoori' | 'ambience';
  image: string;
  description: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  favoriteDish?: string;
  isVerified?: boolean;
}

export interface HotelInfo {
  name: string;
  logoImage?: string;
  tagline: string;
  subTagline: string;
  director: string;
  phone: string;
  whatsapp: string;
  email?: string;
  addressVillage: string;
  addressPO: string;
  addressPS: string;
  addressDistrict: string;
  addressState: string;
  addressPincode: string;
  fullAddress: string;
  openingTime: string;
  closingTime: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl?: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
}

export interface CartItem {
  item: MenuItem;
  portion: 'half' | 'full';
  quantity: number;
  selectedPrice: number;
}

export interface PlacedOrder {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerAddress: string;
  orderType: string;
  notes?: string;
  date: string;
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';
}
