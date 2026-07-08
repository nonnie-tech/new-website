/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, setSelectedCategory, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Thank you for subscribing! We've sent a welcome discount to ${email}.`, 'success');
    setEmail('');
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setView('shop');
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Newsletter Panel */}
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center">
            <div className="max-w-md">
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Stay updated on premium deals
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Sign up to receive exclusive offers, new arrivals, and special promotions directly in your inbox.
              </p>
            </div>
            <div className="lg:col-span-2">
              <form id="newsletter-form" onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 flex-auto rounded-xl border-0 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="flex-none rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-500 focus:outline-none transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Same-Day Delivery</h4>
                <p className="text-xs text-slate-400">Available across Nairobi and Nyali Mombasa.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Secure M-Pesa Paybill</h4>
                <p className="text-xs text-slate-400">Safeguarded transactions with instant receipts.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Easy 7-Day Returns</h4>
                <p className="text-xs text-slate-400">No hassle refunds or items exchanges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Links Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold tracking-tight text-white">
              Shop<span className="text-blue-500">Ease</span>
            </span>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Curating premium quality electronics, fashionwear, home goods, and wellness products. We deliver convenience and quality right to your doorstep.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-xs">
              <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-blue-400" /> +254 700 000 000</span>
              <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-blue-400" /> support@shopease.co.ke</span>
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-blue-400" /> Kilimani, Nairobi, Kenya</span>
            </div>
          </div>

          {/* Shop categories */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Fitness & Sports', 'Beauty & Care'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1 group text-left"
                  >
                    <span>{cat}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {[
                { label: 'Browse Shop', view: 'shop' },
                { label: 'My Cart', view: 'cart' },
                { label: 'Track Delivery', view: 'orders' },
                { label: 'Customer Account', view: 'dashboard' },
                { label: 'Favorites Wishlist', view: 'wishlist' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setView(link.view as any)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment partners */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Payment Partners</h3>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              We process secure transactions in partnership with M-Pesa. Use M-Pesa Paybill for seamless checkouts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <div className="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                M-PESA PAYBILL
              </div>
              <div className="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-bold text-blue-400 border border-blue-500/20">
                VISA / MASTERCARD
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-slate-950 py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 ShopEase E-Commerce. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
