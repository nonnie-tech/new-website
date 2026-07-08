/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { User, ShoppingBag, Landmark, Heart, MapPin, Receipt, Compass, Plus, Trash2, ArrowRight } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    orders,
    wishlist,
    setView,
    showToast
  } = useShop();

  // Address form state
  const [newAddress, setNewAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Derive Stats
  const ordersCount = orders.length;
  const wishCount = wishlist.length;
  
  // Calculate total money saved from discounts in previous orders
  const savingsCount = orders.reduce((sum, ord) => sum + ord.discount, 0);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;

    if (!currentUser.savedAddresses) {
      currentUser.savedAddresses = [];
    }

    currentUser.savedAddresses.push(newAddress.trim());
    showToast('New delivery address saved successfully!');
    setNewAddress('');
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (index: number) => {
    if (currentUser.savedAddresses && currentUser.savedAddresses.length > index) {
      currentUser.savedAddresses.splice(index, 1);
      showToast('Delivery address removed.', 'info');
      setNewAddress(''); // trigger re-render
    }
  };

  return (
    <div id="dashboard-page-wrapper" className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div className="text-left border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-black text-gray-950 tracking-tight">My Account</h1>
        <p className="text-xs text-gray-500 mt-1">Manage shipping locations, track statistics, and update details</p>
      </div>

      {/* Grid: Welcome card + stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Profile Welcome Block (md:col-span-4) */}
        <div className="md:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between text-left space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold border border-blue-100 text-base">
              {currentUser.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-950 tracking-tight">{currentUser.name || 'Dr. Jak Mbugua'}</h3>
              <p className="text-xs text-gray-500 font-light">{currentUser.email || 'jak.mbugua@gmail.com'}</p>
            </div>
          </div>

          <div className="text-xs text-gray-500 space-y-1.5 pt-4 border-t border-gray-50 font-medium">
            <div>Contact: <span className="font-bold text-gray-800">{currentUser.phone || '0722 000 111'}</span></div>
            <div>Account Class: <span className="text-blue-600 font-bold uppercase tracking-wider">Premium Member</span></div>
          </div>
        </div>

        {/* Stats Grid Block (md:col-span-8) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left flex flex-col justify-between h-40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Orders Made</span>
              <span className="text-3xl font-black text-gray-950 font-mono mt-0.5 block">{ordersCount}</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left flex flex-col justify-between h-40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <Heart className="h-5 w-5 fill-rose-500/10 text-rose-600" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Wishlist Items</span>
              <span className="text-3xl font-black text-gray-950 font-mono mt-0.5 block">{wishCount}</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left flex flex-col justify-between h-40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Checkout Savings</span>
              <span className="text-2xl font-black text-emerald-600 font-mono mt-1 block">Ksh {savingsCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Addresses + shortcuts rows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Saved Addresses Manager (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-3">
            <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="h-4.5 w-4.5 text-blue-600" />
              <span>Saved Shipping Addresses</span>
            </h3>
            <button
              id="dashboard-add-address-trigger"
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="text-xs font-bold text-blue-600 flex items-center gap-1.5 focus:outline-none hover:text-blue-800 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Address
            </button>
          </div>

          {/* Add Address Form */}
          {showAddressForm && (
            <form onSubmit={handleAddAddress} className="flex gap-3 animate-in slide-in-from-top-3 duration-200">
              <input
                id="dashboard-address-input"
                type="text"
                required
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="e.g. Kilimani, Rose Avenue, Apartment 3C, Nairobi"
                className="flex-1 rounded-xl border border-gray-200 py-2.5 px-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                id="dashboard-save-address-btn"
                type="submit"
                className="rounded-xl bg-blue-600 px-5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors focus:outline-none"
              >
                Save Location
              </button>
            </form>
          )}

          {/* Addresses list */}
          {currentUser.savedAddresses && currentUser.savedAddresses.length > 0 ? (
            <div className="divide-y divide-gray-50 space-y-1">
              {currentUser.savedAddresses.map((addr, idx) => (
                <div key={idx} className="py-4 flex justify-between items-center gap-4 text-xs">
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400 flex-shrink-0">
                      <Landmark className="h-4 w-4" />
                    </div>
                    <span className="text-gray-700 truncate font-medium">{addr}</span>
                  </div>
                  <button
                    id={`delete-address-btn-${idx}`}
                    onClick={() => handleDeleteAddress(idx)}
                    className="p-1 text-gray-400 hover:text-rose-600 focus:outline-none transition-colors"
                    title="Delete location"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              You haven't saved any physical delivery locations yet. Add shipping addresses above to accelerate your checkout process.
            </p>
          )}
        </div>

        {/* Quick Actions Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-widest pl-2">
            Shortcut Hub
          </h3>

          <div className="grid grid-cols-1 gap-3">
            <button
              id="dash-shortcut-shop"
              onClick={() => setView('shop')}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:bg-gray-50/50 hover:shadow-sm"
            >
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </div>
                <div className="text-xs">
                  <span className="block font-bold text-gray-950">Shop Products</span>
                  <span className="text-[10px] text-gray-400">Discover premium items catalog</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="dash-shortcut-orders"
              onClick={() => setView('orders')}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:bg-gray-50/50 hover:shadow-sm"
            >
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Receipt className="h-4.5 w-4.5" />
                </div>
                <div className="text-xs">
                  <span className="block font-bold text-gray-950">My Receipts</span>
                  <span className="text-[10px] text-gray-400">View and print invoices</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="dash-shortcut-track"
              onClick={() => setView('track-delivery')}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:bg-gray-50/50 hover:shadow-sm"
            >
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Compass className="h-4.5 w-4.5" />
                </div>
                <div className="text-xs">
                  <span className="block font-bold text-gray-950">Track Delivery</span>
                  <span className="text-[10px] text-gray-400">Verify shipments in progress</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
