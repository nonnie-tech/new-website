/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

// Import Page Views
import { HomeView } from './components/views/HomeView';
import { ShopView } from './components/views/ShopView';
import { ProductDetailsView } from './components/views/ProductDetailsView';
import { CartView } from './components/views/CartView';
import { CheckoutView } from './components/views/CheckoutView';
import { PaymentSuccessView } from './components/views/PaymentSuccessView';
import { ReceiptView } from './components/views/ReceiptView';
import { OrdersView } from './components/views/OrdersView';
import { TrackDeliveryView } from './components/views/TrackDeliveryView';
import { DashboardView } from './components/views/DashboardView';
import { AuthView } from './components/views/AuthView';
import { WishlistView } from './components/views/WishlistView';

// Smooth slide/fade route animation helper
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'payment-success':
        return <PaymentSuccessView />;
      case 'receipt':
        return <ReceiptView />;
      case 'orders':
        return <OrdersView />;
      case 'track-delivery':
        return <TrackDeliveryView />;
      case 'dashboard':
        return <DashboardView />;
      case 'auth':
        return <AuthView />;
      case 'wishlist':
        return <WishlistView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div id="shopease-app" className="min-h-screen bg-slate-50/30 flex flex-col font-sans select-text scroll-smooth">
      {/* Toast alert system layer */}
      <ToastContainer />

      {/* Global Header Navigation */}
      <Navbar />

      {/* Main viewport area with animated view transitioning */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-[72px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer Area */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
