import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ThumbsUp, Quote } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useRestaurant();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 5,
    favoriteDish: 'Chicken Biryani',
    comment: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    addReview({
      name: newReview.name,
      location: newReview.location || 'Kaliganj Area',
      rating: Number(newReview.rating),
      favoriteDish: newReview.favoriteDish,
      comment: newReview.comment,
      isVerified: true
    });
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsFormOpen(false);
      setNewReview({
        name: '',
        location: '',
        rating: 5,
        favoriteDish: 'Chicken Biryani',
        comment: ''
      });
    }, 1500);
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <section id="reviews" className="py-20 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Customer Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
              Loved by Foodies in Kaliganj
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-xl">
              Real feedback from local residents, daily patrons, and travelers who enjoy our authentic chicken specialties.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-900 rounded-2xl border border-stone-800 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-xl">
                <span>{averageRating}</span>
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Over 250+ Happy Patrons</span>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-black/50 group"
            >
              <div className="space-y-4">
                {/* Rating stars and quote mark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-700 group-hover:text-amber-500/50 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.favoriteDish && (
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-[11px] text-amber-400 font-medium">
                    Favorite: {rev.favoriteDish}
                  </div>
                )}
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 mt-6 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{rev.name}</span>
                    {rev.isVerified && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                  </h4>
                  <span className="text-[11px] text-stone-400">{rev.location}</span>
                </div>
                <span className="text-[10px] text-stone-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Write a review */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Share Your Dining Experience</h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-stone-400 hover:text-white text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>

              {submittedMessage ? (
                <div className="text-center py-8 space-y-2">
                  <ThumbsUp className="w-10 h-10 text-emerald-400 mx-auto" />
                  <p className="font-bold text-white text-base">Thank you for your review!</p>
                  <p className="text-xs text-stone-400">Your feedback helps zȧm zȧm HOTEL serve Kaliganj better.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Your Area / Village</label>
                    <input
                      type="text"
                      placeholder="e.g. Kaliganj / Manihari / Katihar"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Rating (1 to 5 Stars)</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Dish You Ordered</label>
                    <select
                      value={newReview.favoriteDish}
                      onChange={(e) => setNewReview({ ...newReview, favoriteDish: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Chicken Biryani">Chicken Biryani</option>
                      <option value="Chicken Fry">Chicken Fry</option>
                      <option value="Chicken Rice">Chicken Rice</option>
                      <option value="Chicken Kebab">Chicken Kebab</option>
                      <option value="Tandoori Chicken">Tandoori Chicken</option>
                      <option value="Other Dishes">Other Dishes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Your Review / Comment *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us how you liked the taste, quantity, and service..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2 rounded-xl cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
