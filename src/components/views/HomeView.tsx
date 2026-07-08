/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { BannerCarousel } from '../BannerCarousel';
import { ProductCard } from '../ProductCard';
import { mockProducts, categoriesList } from '../../data/mockProducts';
import { Sparkles, Trophy, ShoppingBag, ArrowRight, Star, HeartHandshake, ShieldCheck, Quote } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setView, setProductId, setSelectedCategory } = useShop();

  // Filter lists for homepage showcase
  const newArrivals = mockProducts.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = mockProducts.filter((p) => p.isBestSeller).slice(0, 4);

  const handleCategorySelect = (categoryId: string) => {
    // Map category list id to data category label
    const categoryMap: Record<string, string> = {
      'all': 'all',
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'home': 'Home & Kitchen',
      'fitness': 'Fitness & Sports',
      'beauty': 'Beauty & Care'
    };
    setSelectedCategory(categoryMap[categoryId] || 'all');
    setView('shop');
  };

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Jak Mbugua',
      role: 'Verified Buyer',
      text: 'ShopEase is hands down the best e-commerce platform in Kenya. The Paybill payment is instant, and their same-day delivery to my Kilimani office is extremely reliable. Highly recommended!',
      rating: 5,
      avatarInitials: 'JM'
    },
    {
      id: 2,
      name: 'Sophia Wanjiku',
      role: 'Fashion Designer',
      text: 'The quality of the genuine leather jackets and cotton streetwear tees is unmatched. Very premium materials, fits perfectly, and the digital receipt makes business accounting a breeze.',
      rating: 5,
      avatarInitials: 'SW'
    },
    {
      id: 3,
      name: 'Amina Abubakar',
      role: 'Home Maker',
      text: 'I ordered the Nordic Velvet sofa and BaristaPro espresso maker. They are stunning! Delivered to Nyali, Mombasa in 2 days. The tracking timeline kept me updated at every stage.',
      rating: 5,
      avatarInitials: 'AA'
    }
  ];

  return (
    <div id="home-view" className="space-y-16 pb-16">
      
      {/* Hero Showcase Area */}
      <section id="home-hero-section">
        <BannerCarousel />
      </section>

      {/* Category Grid Section */}
      <section id="home-categories-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-950 tracking-tight">Shop by Category Hub</h2>
            <p className="text-sm text-gray-500 mt-1">Explore our premium curated collection of genuine brands</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoriesList.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              id={`home-category-${cat.id}`}
              onClick={() => handleCategorySelect(cat.id)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 p-5 text-left h-44 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-blue-500/30 hover:shadow-lg focus:outline-none"
            >
              <div className="h-full w-full absolute inset-0 opacity-10 scale-100 group-hover:scale-105 transition-transform duration-500">
                <img src={cat.img} alt={cat.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/5 group-hover:from-white group-hover:via-white/95 transition-all" />
              
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-950 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{cat.count} Premium Items</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="home-new-arrivals" className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight">New Arrivals Showcase</h2>
              <p className="text-sm text-gray-500 mt-0.5">The latest drops curated for premium tastes</p>
            </div>
          </div>
          <button
            onClick={() => { setSelectedCategory('all'); setView('shop'); }}
            className="group flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors focus:outline-none"
          >
            <span>View All Products</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Banner Promo */}
      <section id="home-trust-banner" className="rounded-3xl border border-gray-100 bg-gray-50/50 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="max-w-xl text-left space-y-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800 border border-blue-100">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" /> Authorized Retailer
          </span>
          <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">100% Genuine Brands Guaranteed</h3>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            We partner directly with leading tech, fitness, and lifestyle brands to supply authentic items backed by manufacturer warranty. Secure your checkouts using M-Pesa Paybill.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
          <button
            onClick={() => { setSelectedCategory('all'); setView('shop'); }}
            className="w-full md:w-auto rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-700 transition-all focus:outline-none"
          >
            Start Shopping Now
          </button>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="home-bestsellers" className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight">Customer Favorites & Bestsellers</h2>
              <p className="text-sm text-gray-500 mt-0.5">Most loved products based on high rating volumes</p>
            </div>
          </div>
          <button
            onClick={() => { setSelectedCategory('all'); setView('shop'); }}
            className="group flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors focus:outline-none"
          >
            <span>View All Products</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="home-testimonials" className="space-y-8 bg-slate-50/50 py-12 px-6 rounded-3xl border border-gray-100">
        <div className="text-center max-w-md mx-auto space-y-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <HeartHandshake className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Loved by Thousands of Customers</h2>
          <p className="text-xs text-gray-500">Read verified experiences from our local community across Kenya</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative text-left flex flex-col justify-between">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-gray-100" />
              <div>
                <div className="flex text-amber-400 gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-light mb-6">
                  "{t.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                  {t.avatarInitials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-950">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
