/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Menu,
  X,
  Compass,
  ClipboardList,
  MapPin,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setView,
    cart,
    wishlist,
    currentUser,
    logoutUser,
    searchQuery,
    setSearchQuery,
    currentOrderForTracking
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    if (currentView !== 'shop') {
      setView('shop');
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    setSearchQuery(val);
    if (val && currentView !== 'shop') {
      setView('shop');
    }
  };

  const navigateTo = (view: any) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              id="header-logo-btn"
              onClick={() => navigateTo('home')}
              className="group flex items-center gap-2 focus:outline-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25 transition-transform group-hover:scale-105">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Shop<span className="text-blue-600">Ease</span>
              </span>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <form
            id="desktop-search-form"
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <input
              id="desktop-search-input"
              type="text"
              placeholder="Search premium tech, fashion, kitchen..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-full border border-gray-200 py-1.5 pl-10 pr-4 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </form>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-6">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Home
            </button>
            <button
              id="nav-shop-btn"
              onClick={() => navigateTo('shop')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'shop' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Shop
            </button>
            <button
              id="nav-orders-btn"
              onClick={() => navigateTo(currentUser.isLoggedIn ? 'orders' : 'login')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'orders' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Orders
            </button>
            <button
              id="nav-track-btn"
              onClick={() => navigateTo(currentOrderForTracking ? 'track-delivery' : 'orders')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'track-delivery' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Track Order
            </button>
          </nav>

          {/* User Icons Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search toggler for mobile */}
            <button
              id="mobile-search-toggle"
              onClick={() => {
                navigateTo('shop');
                setTimeout(() => {
                  document.getElementById('mobile-search-input-field')?.focus();
                }, 100);
              }}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 focus:outline-none"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button
              id="nav-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors focus:outline-none"
              aria-label="Wishlist"
            >
              <Heart className={`h-5 w-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Badge */}
            <button
              id="nav-cart-btn"
              onClick={() => navigateTo('cart')}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Account / Dashboard */}
            {currentUser.isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 border-l border-gray-100 pl-4">
                <button
                  id="nav-dashboard-btn"
                  onClick={() => navigateTo('dashboard')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold text-xs border border-blue-100">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                </button>
                <button
                  id="nav-logout-btn"
                  onClick={logoutUser}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors focus:outline-none"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => navigateTo('login')}
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <UserIcon className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger menu */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Navigation</span>
                  <button
                    id="close-mobile-drawer-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search Bar */}
                <form id="mobile-drawer-search-form" onSubmit={handleSearchSubmit} className="relative w-full">
                  <input
                    id="mobile-search-input-field"
                    type="text"
                    placeholder="Search ShopEase..."
                    value={searchInput}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </form>

                {/* Links */}
                <div className="flex flex-col gap-4">
                  <button
                    id="mobile-nav-home"
                    onClick={() => navigateTo('home')}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${currentView === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-3"><Compass className="h-4 w-4" /> Home</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                  <button
                    id="mobile-nav-shop"
                    onClick={() => navigateTo('shop')}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${currentView === 'shop' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-3"><ShoppingBag className="h-4 w-4" /> Shop Products</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                  <button
                    id="mobile-nav-orders"
                    onClick={() => navigateTo(currentUser.isLoggedIn ? 'orders' : 'login')}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${currentView === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-3"><ClipboardList className="h-4 w-4" /> My Orders</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                  <button
                    id="mobile-nav-track"
                    onClick={() => navigateTo(currentOrderForTracking ? 'track-delivery' : 'orders')}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${currentView === 'track-delivery' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Track Active Order</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                </div>
              </div>

              {/* Bottom Auth Card */}
              <div className="border-t border-gray-100 pt-6">
                {currentUser.isLoggedIn ? (
                  <div className="flex flex-col gap-4">
                    <button
                      id="mobile-drawer-user-btn"
                      onClick={() => navigateTo('dashboard')}
                      className="flex items-center gap-3 text-left focus:outline-none"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm border border-blue-200">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{currentUser.name}</div>
                        <div className="text-xs text-gray-500">{currentUser.email}</div>
                      </div>
                    </button>
                    <button
                      id="mobile-drawer-logout-btn"
                      onClick={() => {
                        logoutUser();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      id="mobile-drawer-login-btn"
                      onClick={() => navigateTo('login')}
                      className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700"
                    >
                      Login
                    </button>
                    <button
                      id="mobile-drawer-register-btn"
                      onClick={() => navigateTo('register')}
                      className="flex w-full items-center justify-center rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
