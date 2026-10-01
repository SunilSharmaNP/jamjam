import { HotelInfo, MenuItem, SpecialOffer, GalleryItem, CustomerReview } from '../types';

export const DEFAULT_HOTEL_INFO: HotelInfo = {
  name: 'zȧm zȧm HOTEL',
  tagline: 'Hot & Fresh • Delicious • Generous Quantity',
  subTagline: 'Visit once, love the taste, return always ❤️',
  director: 'Mohammad Waseem',
  phone: '9631343645',
  whatsapp: '9631343645',
  email: 'zamzamhotelkaliganj@gmail.com',
  addressVillage: 'Kaliganj',
  addressPO: 'Mahuar',
  addressPS: 'Manihari',
  addressDistrict: 'Katihar',
  addressState: 'Bihar',
  addressPincode: '854116',
  fullAddress: 'Village – Kaliganj, P.O. – Mahuar, P.S. – Manihari, District – Katihar, Bihar – 854116',
  openingTime: '10:00 AM',
  closingTime: '11:00 PM',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kaliganj+Manihari+Katihar+Bihar+854116',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115160.20392348332!2d87.5258522614534!3d25.337194680213197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0494cf6f0cf23%3A0x47cb2321473cf4c7!2sManihari%2C%20Bihar!5e0!3m2!1sen!2sin!4v1711800000000!5m2!1sen!2sin',
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/919631343645'
  }
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'biryani-01',
    name: 'Special Chicken Biryani',
    category: 'biryani',
    price: 140,
    halfPrice: 80,
    description: 'Fragrant long-grain basmati rice dum-cooked to perfection with tender chicken, royal spices, caramelized onions, and saffron. Served with fresh salad and spicy raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    isPopular: true,
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 'medium',
    portionInfo: 'Generous single plate / Family portion available'
  },
  {
    id: 'fry-01',
    name: 'Crispy Chicken Fry',
    category: 'fry',
    price: 130,
    halfPrice: 70,
    description: 'Ultra-crispy on the exterior, tender and juicy within. Marinated with signature Kaliganj spices, fresh garlic-ginger, and flash-fried to golden crunch.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop',
    isPopular: true,
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 'hot',
    portionInfo: 'Served with sliced onions & mint chutney'
  },
  {
    id: 'rice-01',
    name: 'Chicken Rice Meal',
    category: 'rice',
    price: 110,
    halfPrice: 65,
    description: 'Steaming fluffy rice paired with homestyle rich chicken curry gravy, tender chicken pieces, fresh sliced cucumbers, and house-made pickle.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop',
    isPopular: false,
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 'medium',
    portionInfo: 'Complete satisfying daily meal'
  },
  {
    id: 'kebab-01',
    name: 'Chicken Charcoal Kebab',
    category: 'kebab',
    price: 150,
    halfPrice: 85,
    description: 'Melt-in-mouth chicken chunks marinated in spiced yogurt, fresh herbs, and crushed pepper, skewered and grilled over natural wood charcoal.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop',
    isPopular: true,
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 'medium',
    portionInfo: 'Charcoal grilled skewers with lemon wedges'
  },
  {
    id: 'tandoori-01',
    name: 'Smoky Tandoori Chicken',
    category: 'tandoori',
    price: 220,
    halfPrice: 120,
    description: 'Directly from the blazing clay tandoor. Whole leg quarters marinated in red chili, roasted coriander, curd, and smoked to charred perfection.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1000&auto=format&fit=crop',
    isPopular: true,
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 'hot',
    portionInfo: 'Full (4 pcs) / Half (2 pcs) with tandoori spices'
  },
  {
    id: 'biryani-02',
    name: 'Chicken Dum Biryani (Leg Piece)',
    category: 'biryani',
    price: 160,
    halfPrice: 90,
    description: 'Special edition biryani featuring a juicy whole chicken leg piece infused with slow-simmered dum aroma and royal biryani masala.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop',
    isPopular: true,
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 'medium',
    portionInfo: 'Includes whole chicken leg piece & boiled egg'
  },
  {
    id: 'kebab-02',
    name: 'Chicken Seekh Kebab',
    category: 'kebab',
    price: 140,
    halfPrice: 80,
    description: 'Minced chicken blended with fresh coriander, green chilies, mint, and secret garam masala, grilled on skewers to juicy perfection.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    isPopular: false,
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 'medium',
    portionInfo: '4 succulent seekh pieces with spicy chutney'
  },
  {
    id: 'fry-02',
    name: 'Spicy Masala Chicken Fry',
    category: 'fry',
    price: 140,
    halfPrice: 75,
    description: 'Semi-dry spicy roast chicken tossed with curry leaves, cracked black pepper, crushed dry red chilies, and sauteed onions.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop',
    isPopular: false,
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 'hot',
    portionInfo: 'Rich roasted spice coating'
  }
];

export const DEFAULT_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'Super Family Biryani Feast',
    tag: 'BEST VALUE COMBO',
    discount: 'SAVE ₹60',
    description: 'Get 2 Full Chicken Biryani + 1 Half Crispy Chicken Fry + 2 Cold Drinks at a special discounted deal.',
    originalPrice: 420,
    offerPrice: 360,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    validity: 'Valid Daily • Dine-In & Takeaway',
    isActive: true
  },
  {
    id: 'offer-2',
    title: 'Tandoori & Kebab Night Platter',
    tag: 'CHEF SPECIAL',
    discount: '15% OFF',
    description: 'Order 1 Half Tandoori Chicken + 1 Plate Chicken Kebab and get an extra kebab skewer + fresh roomali / paratha.',
    originalPrice: 270,
    offerPrice: 230,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1000&auto=format&fit=crop',
    validity: 'Evening Special (5:00 PM – 11:00 PM)',
    isActive: true
  },
  {
    id: 'offer-3',
    title: 'Crispy Fry + Chicken Rice Duo',
    tag: 'LUNCH SPECIAL',
    discount: 'COMBO ₹160',
    description: 'Hearty Chicken Rice plate paired with crispy hot fried chicken piece and mint salad for a complete fulfilling lunch.',
    originalPrice: 180,
    offerPrice: 160,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop',
    validity: 'Lunch Hours (11:00 AM – 4:00 PM)',
    isActive: true
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Royal Chicken Dum Biryani',
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    description: 'Long-grain fragrant basmati rice dum cooked with juicy marinated chicken pieces'
  },
  {
    id: 'gal-2',
    title: 'Golden Crispy Chicken Fry',
    category: 'fry',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop',
    description: 'Freshly fried hot chicken seasoned with secret Kaliganj spice rub'
  },
  {
    id: 'gal-3',
    title: 'Charcoal Grilled Chicken Kebab',
    category: 'kebab',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop',
    description: 'Skewered chicken grilled over natural coals for authentic smoky flavor'
  },
  {
    id: 'gal-4',
    title: 'Clay Oven Smoky Tandoori',
    category: 'tandoori',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1000&auto=format&fit=crop',
    description: 'Fresh out of the tandoor with charred aroma and authentic yogurt spices'
  },
  {
    id: 'gal-5',
    title: 'Satisfying Chicken Rice Meal',
    category: 'rice',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop',
    description: 'Hot rice served with rich chicken curry gravy and crisp cucumber salad'
  },
  {
    id: 'gal-6',
    title: 'Clean Dining Hall & Seating',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    description: 'Comfortable, hygienic family dining hall with prompt table service'
  },
  {
    id: 'gal-7',
    title: 'zȧm zȧm Front Counter & Kitchen',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    description: 'Spotless live cooking counter and takeaway parcel packaging area'
  },
  {
    id: 'gal-8',
    title: 'Live Dum Biryani Pot Opening',
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop',
    description: 'Steaming hot handi freshly opened right before lunch service'
  }
];

export const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Suresh Kumar Yadav',
    location: 'Kaliganj Bazaar',
    rating: 5,
    comment: 'The best Chicken Biryani in Kaliganj! The rice was deeply aromatic and the chicken piece was so tender. Also tried the Chicken Fry which was super crispy. Quantity is very generous.',
    date: '2 days ago',
    favoriteDish: 'Chicken Biryani & Fry',
    isVerified: true
  },
  {
    id: 'rev-2',
    name: 'Arif Ansari',
    location: 'Manihari',
    rating: 5,
    comment: 'Whenever we travel through Manihari or Kaliganj, stopping at zȧm zȧm HOTEL is compulsory. Mohammad Wasim Bhai ensures fresh hot food and top hygiene. 10/10 recommendation!',
    date: '1 week ago',
    favoriteDish: 'Tandoori Chicken',
    isVerified: true
  },
  {
    id: 'rev-3',
    name: 'Rakesh Ranjan',
    location: 'Mahuar',
    rating: 5,
    comment: 'Chicken Rice meal is pure homestyle satisfaction. The chicken gravy is thick and delicious. Quick takeaway service via WhatsApp ordering.',
    date: '2 weeks ago',
    favoriteDish: 'Chicken Rice',
    isVerified: true
  },
  {
    id: 'rev-4',
    name: 'Imran Hashmi',
    location: 'Katihar',
    rating: 5,
    comment: 'Their Chicken Kebab grilled over charcoal is unbeatable. Smoky, juicy, and packed with flavor. Great prices and very polite staff.',
    date: '3 weeks ago',
    favoriteDish: 'Chicken Charcoal Kebab',
    isVerified: true
  }
];
