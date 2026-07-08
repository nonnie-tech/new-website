/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    setView,
    setProductId,
    toggleWishlist,
    addToCart,
    showToast
  } = useShop();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product); // remove from wishlist after moving
    showToast(`Moved "${product.name}" safely to your shopping cart!`);
  };

  return (
    <div id="wishlist-page-wrapper" className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div className="text-left border-b border-gray-100 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">Saved Favorites</h1>
          <p className="text-xs text-gray-500 mt-1">Review your premium bookmarked items catalog</p>
        </div>
        
        <button
          onClick={() => setView('shop')}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-950 focus:outline-none transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Catalog Shopping</span>
        </button>
      </div>

      {/* Wishlist Grid */}
      {wishlist.length > 0 ? (
        <div id="wishlist-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => {
            const discountPercent = product.discountPrice
              ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
              : 0;

            return (
              <div
                id={`wish-item-${product.id}`}
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-gray-250 hover:shadow-lg"
              >
                {/* Image and discount badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50">
                  <img
                    onClick={() => setProductId(product.id)}
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                  />
                  {discountPercent > 0 && (
                    <span className="absolute left-3 top-3 rounded-lg bg-rose-500 px-2.5 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider shadow">
                      {discountPercent}% OFF
                    </span>
                  )}
                  
                  {/* Delete button from favorites absolute */}
                  <button
                    id={`wish-delete-abs-${product.id}`}
                    onClick={() => {
                      toggleWishlist(product);
                      showToast(`Removed "${product.name}" from your saved favorites.`, 'info');
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-400 hover:text-rose-600 shadow transition-colors focus:outline-none"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="text-left py-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{product.category}</span>
                    <h3
                      onClick={() => setProductId(product.id)}
                      className="font-bold text-sm text-gray-950 truncate cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">Brand: {product.brand}</p>
                  </div>

                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-sm font-black text-gray-950">Ksh {product.price.toLocaleString()}</span>
                    {product.discountPrice && (
                      <span className="text-xs text-gray-400 line-through">Ksh {product.discountPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Bottom interactive action button */}
                <button
                  id={`wish-move-to-cart-${product.id}`}
                  onClick={() => handleMoveToCart(product)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-700 transition-colors focus:outline-none"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Move to Shopping Cart</span>
                </button>

              </div>
            );
          })}
        </div>
      ) : (
        
        // Blank saved favorites state
        <div id="wishlist-empty-state" className="border border-gray-100 rounded-3xl bg-white p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 border border-rose-100">
            <Heart className="h-7 w-7 fill-rose-500/10" />
          </div>
          <h3 className="text-lg font-bold text-gray-950">No saved favorites cataloged</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Looks like you haven't saved any items to your bookmark list yet. Click the heart icon on any product card to curate your custom collection here!
          </p>
          <button
            onClick={() => setView('shop')}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none"
          >
            Explore Hot Items
          </button>
        </div>
      )}

    </div>
  );
};
