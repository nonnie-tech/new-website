/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setProductId } = useShop();

  const discountPercent = product.discountPrice
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : 0;

  const isFavorited = isInWishlist(product.id);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 8;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:border-gray-200"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Wishlist Button Overlay */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-500 shadow-sm transition-transform active:scale-95 hover:text-rose-500 hover:bg-white focus:outline-none"
          aria-label="Add to Wishlist"
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Promo / Discount Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isNew && (
            <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Hover quick action panel */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            id={`hover-view-details-${product.id}`}
            onClick={() => setProductId(product.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          {product.category}
        </span>
        
        <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          <button onClick={() => setProductId(product.id)} className="text-left focus:outline-none">
            {product.name}
          </button>
        </h3>

        {/* Rating row */}
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-gray-500">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>

        {/* Price Tag & Stock warning row */}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-gray-900">
                Ksh {product.price.toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-gray-400 line-through">
                  Ksh {product.discountPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Low stock indicators */}
            {lowStock && (
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Only {product.stock} left
              </span>
            )}
            {outOfStock && (
              <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                Out of stock
              </span>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-3 flex gap-2">
            <button
              id={`card-add-to-cart-${product.id}`}
              onClick={() => addToCart(product)}
              disabled={outOfStock}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-semibold shadow-sm transition-all focus:outline-none ${
                outOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-500/10'
              }`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>{outOfStock ? 'Sold Out' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
