/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';
import { mockProducts } from '../../data/mockProducts';
import { Star, Heart, ShoppingCart, Truck, Calendar, Sparkles, Check, ChevronRight, Home, Plus, Minus, ArrowLeft, Send } from 'lucide-react';

export const ProductDetailsView: React.FC = () => {
  const {
    currentProductId,
    setView,
    setProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast,
    currentUser
  } = useShop();

  // Find active product
  const product = useMemo(() => {
    return mockProducts.find((p) => p.id === currentProductId) || mockProducts[0];
  }, [currentProductId]);

  // Gallery Active Image
  const [activeImage, setActiveImage] = useState(product.images[0]);
  // Selected Quantity
  const [quantity, setQuantity] = useState(1);

  // New Review Form State
  const [reviewName, setReviewName] = useState(currentUser.name || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Update gallery main photo when current product changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setQuantity(1);
    setReviewComment('');
    setReviewRating(5);
  }, [product]);

  const discountPercent = product.discountPrice
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : 0;

  const isFav = isInWishlist(product.id);
  const outOfStock = product.stock <= 0;

  const handleIncreaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      showToast(`Cannot exceed maximum available stock of ${product.stock} items.`, 'error');
    }
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setView('checkout');
  };

  // Submit product review form
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newReview = {
      id: `${product.id}-rev-${Date.now()}`,
      userName: reviewName || 'Anonymous User',
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Dynamically append review to the local static product record in memory
    product.reviews = [newReview, ...product.reviews];
    product.reviewsCount += 1;
    
    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    product.rating = Number((totalRating / product.reviews.length).toFixed(1));

    showToast('Your review was successfully published! Thank you.', 'success');
    setReviewComment('');
  };

  // Curate related products (from same category, excluding active product)
  const relatedProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  return (
    <div id="product-details-wrapper" className="space-y-12 pb-16">
      
      {/* Navigation Breadcrumbs + Back to Shop btn */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <nav id="details-breadcrumbs" className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span onClick={() => setView('home')} className="hover:text-gray-600 cursor-pointer flex items-center gap-1">
            <Home className="h-3 w-3" /> Home
          </span>
          <ChevronRight className="h-3 w-3" />
          <span onClick={() => setView('shop')} className="hover:text-gray-600 cursor-pointer">Shop</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </nav>
        
        <button
          id="details-back-to-shop-btn"
          onClick={() => setView('shop')}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-950 transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Product Catalog</span>
        </button>
      </div>

      {/* Main product gallery + description row */}
      <section id="product-primary-section" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Images Gallery (md:col-span-6) */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-50 border border-gray-100">
            <img
              id="details-main-image"
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center transition-transform duration-300"
            />
            {discountPercent > 0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-rose-500 px-3 py-1 text-xs font-extrabold text-white uppercase tracking-wider shadow-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                id={`details-thumb-${idx}`}
                onClick={() => setActiveImage(img)}
                className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 bg-gray-50 transition-all focus:outline-none ${
                  activeImage === img ? 'border-blue-600 shadow-md scale-[1.02]' : 'border-gray-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Specifications Details (md:col-span-6) */}
        <div className="md:col-span-6 text-left space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight mt-2">
              {product.name}
            </h1>
            <div className="text-xs text-gray-400 font-medium">Brand: <span className="font-bold text-gray-800">{product.brand}</span></div>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-3 border-y border-gray-50 py-3">
            <div className="flex text-amber-400 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500 font-medium">{product.reviewsCount} customer reviews</span>
          </div>

          {/* Pricing Box */}
          <div className="space-y-1.5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-gray-950">
                Ksh {product.price.toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-gray-400 line-through">
                  Ksh {product.discountPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Stock Availability status tag */}
            <div>
              {outOfStock ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-100">
                  Sold Out / Out of Stock
                </span>
              ) : product.stock <= 8 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-100 animate-pulse">
                  Limited stock: Only {product.stock} units remaining!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-100">
                  <Check className="h-3 w-3 stroke-[3px]" /> In stock (Ships immediately)
                </span>
              )}
            </div>
          </div>

          {/* Description Text */}
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Shipping and Delivery estimates */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50/50 rounded-2xl p-4 border border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-2.5">
              <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <span className="block font-bold text-gray-800">Dispatch Speed</span>
                <span className="font-light">{product.deliveryEstimate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <span className="block font-bold text-gray-800">Warranty Support</span>
                <span className="font-light">12 Months Certified</span>
              </div>
            </div>
          </div>

          {/* Interactive controls: quantity + checkout buttons */}
          {!outOfStock && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select Qty:</span>
                
                <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden p-0.5 shadow-sm">
                  <button
                    id="details-dec-qty-btn"
                    onClick={handleDecreaseQty}
                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    id="details-inc-qty-btn"
                    onClick={handleIncreaseQty}
                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Add and Buy Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="details-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition-all active:scale-95 shadow-sm"
                >
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                  <span>Add to Shopping Cart</span>
                </button>
                
                <button
                  id="details-buy-now-btn"
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700 focus:outline-none transition-all active:scale-95"
                >
                  <span>Buy Now (M-Pesa Paybill)</span>
                </button>

                <button
                  id="details-wishlist-toggle-btn"
                  onClick={() => toggleWishlist(product)}
                  className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl border transition-all focus:outline-none ${
                    isFav
                      ? 'bg-rose-50 border-rose-100 text-rose-500 shadow-inner'
                      : 'bg-white border-gray-200 text-gray-400 hover:text-rose-500 hover:bg-rose-50/20'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Specifications & Features Section Tab Grid */}
      <section id="product-meta-details" className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-10">
        
        {/* Core Features */}
        <div className="text-left space-y-4">
          <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-blue-600" />
            <span>Product Highlights & Features</span>
          </h3>
          <ul className="space-y-3">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-600 items-start">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-3 w-3 stroke-[3px]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical specifications */}
        <div className="text-left space-y-4">
          <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest">
            Technical Specifications
          </h3>
          <div className="overflow-hidden border border-gray-100 rounded-2xl">
            <table className="w-full text-left text-xs divide-y divide-gray-100">
              <tbody>
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                    <td className="py-3 px-4 font-bold text-gray-900 w-1/3">{key}</td>
                    <td className="py-3 px-4 text-gray-600 font-light">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* Customer Reviews Section with Live Mock Submit form */}
      <section id="product-reviews-section" className="border-t border-gray-100 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Submit review Form (lg:col-span-5) */}
        <div className="lg:col-span-5 text-left space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-gray-950 tracking-tight">Share Your Experience</h3>
            <p className="text-xs text-gray-500">Have you purchased this item? Leave a review to help others!</p>
          </div>

          <form id="details-review-form" onSubmit={handleReviewSubmit} className="space-y-4 bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
            <div className="space-y-1.5">
              <label htmlFor="review-name" className="text-xs font-bold text-gray-900">Your Full Name</label>
              <input
                id="review-name"
                type="text"
                required
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2 px-3 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-900 block">Rating Stars</span>
              <div className="flex gap-1.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReviewRating(i + 1)}
                    className="focus:outline-none transition-transform active:scale-110"
                  >
                    <Star className={`h-6 w-6 ${i < reviewRating ? 'fill-current' : 'text-gray-200'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="review-comment" className="text-xs font-bold text-gray-900">Your Comment</label>
              <textarea
                id="review-comment"
                required
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2 px-3 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none"
                placeholder="Write your genuine thoughts about the item quality, shipment speed, or support..."
              />
            </div>

            <button
              id="submit-review-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Verified Review</span>
            </button>
          </form>
        </div>

        {/* Right Side: Published Reviews List (lg:col-span-7) */}
        <div className="lg:col-span-7 text-left space-y-6">
          <h3 className="text-lg font-extrabold text-gray-950 tracking-tight">Verified Reviews ({product.reviews.length})</h3>
          
          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-5 border border-gray-100 rounded-2xl space-y-2.5 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-[10px]">
                      {rev.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-950">{rev.userName}</h4>
                      <div className="flex text-amber-400 gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-2.5 w-2.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-light pl-9">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Recommended Related products Row */}
      {relatedProducts.length > 0 && (
        <section id="details-related-products" className="border-t border-gray-100 pt-10 space-y-6">
          <div className="text-left">
            <h2 className="text-xl font-extrabold text-gray-950 tracking-tight">Related Premium Recommendations</h2>
            <p className="text-xs text-gray-500 mt-1">Slick additions curated from the same collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p.id} onClick={() => setProductId(p.id)} className="cursor-pointer">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
