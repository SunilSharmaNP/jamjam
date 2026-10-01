import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, MapPin, User, FileText, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartCount,
    getWhatsAppOrderUrl,
    recordOrder,
    hotelInfo
  } = useRestaurant();

  const [orderType, setOrderType] = useState<string>('Takeaway (Parcel)');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Record order in system
    const placed = recordOrder({
      name: customerName,
      address: customerAddress,
      orderType,
      notes: orderNotes
    });

    setConfirmedOrderId(placed.id);

    const url = getWhatsAppOrderUrl({
      name: customerName,
      address: customerAddress,
      orderType,
      notes: orderNotes
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Background click to close */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-in Drawer Container */}
      <div className="w-full max-w-md bg-stone-950 border-l border-stone-800 h-full flex flex-col justify-between shadow-2xl relative z-10 animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Your Food Order</h3>
              <p className="text-[11px] text-stone-400">{cartCount} item{cartCount !== 1 ? 's' : ''} in cart</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">Your cart is empty</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Add Chicken Biryani, Crispy Fry, or Kebabs from our menu to place an instant WhatsApp order.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item cards */}
              <div className="space-y-3">
                {cart.map((ci) => (
                  <div
                    key={`${ci.item.id}-${ci.portion}`}
                    className="p-3.5 rounded-2xl bg-stone-900/70 border border-stone-800/80 flex items-center gap-3"
                  >
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                          {ci.item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(ci.item.id, ci.portion)}
                          className="text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] font-semibold text-amber-400 block mb-2">
                        {ci.portion.toUpperCase()} · ₹{ci.selectedPrice} each
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateCartQuantity(ci.item.id, ci.portion, ci.quantity - 1)}
                            className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(ci.item.id, ci.portion, ci.quantity + 1)}
                            className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-white">
                          ₹{ci.selectedPrice * ci.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-stone-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear Cart
                </button>
              </div>

              {/* Order Options Form */}
              <form onSubmit={handleCheckout} id="cart-order-form" className="space-y-3.5 pt-4 border-t border-stone-800 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Dining / Delivery Type</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Takeaway (Parcel)', 'Dine-In (Table)', 'Home Delivery'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`py-2 px-1 text-center rounded-xl font-medium transition-colors cursor-pointer text-[11px] border ${
                          orderType === type
                            ? 'bg-amber-500 text-stone-950 font-bold border-amber-500'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Address / Table Number</label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4 / Near Kaliganj High School"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Instructions / Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra raita, mild spice, pack separately"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-800 bg-stone-900/95 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Total Bill Amount</span>
                <span className="text-2xl font-black text-amber-400">₹{cartTotal}</span>
              </div>
              <div className="text-right text-[11px] text-stone-400">
                <span>Direct WhatsApp Order to</span>
                <span className="text-white block font-bold">+91 {hotelInfo.phone}</span>
              </div>
            </div>

            <button
              type="submit"
              form="cart-order-form"
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xl shadow-emerald-950/60 cursor-pointer transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              <span>Send Order to zȧm zȧm on WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
