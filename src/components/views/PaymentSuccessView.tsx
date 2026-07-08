/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, ShoppingBag, Download, MapPin } from 'lucide-react';

export const PaymentSuccessView: React.FC = () => {
  const { currentOrderForReceipt, setView, showToast } = useShop();

  // If no order reference is active, route them home safely
  useEffect(() => {
    if (!currentOrderForReceipt) {
      setView('home');
    }
  }, [currentOrderForReceipt]);

  if (!currentOrderForReceipt) {
    return null;
  }

  const order = currentOrderForReceipt;

  const handleDownloadReceipt = () => {
    // Standard text download formatting
    const content = `
========================================
             SHOPEASE RECEIPTS
========================================
Order Number: ${order.orderNumber}
Payment Date: ${order.date}
M-Pesa Transaction Ref: ${order.transactionReference || 'MOCK-MPESA-REF'}
Amount Paid: Ksh ${order.grandTotal.toLocaleString()}
Delivery Estimate: ${order.estimatedDeliveryDate}

Thank you for shopping with us!
========================================
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt-${order.orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Downloaded payment receipt text successfully!');
  };

  return (
    <div id="payment-success-wrapper" className="max-w-xl mx-auto py-8">
      
      {/* Centered card container */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-8">
        
        {/* Animated green success icon */}
        <div className="flex justify-center">
          <motion.div
            id="success-circle-anim"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500/20 shadow-inner"
          >
            <CheckCircle2 className="h-10 w-10 stroke-[2.5px]" />
          </motion.div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">Payment Successful!</h1>
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
            Your transaction was processed successfully. We have registered your order and dispatched details to your email.
          </p>
        </div>

        {/* Order Details box */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 text-left text-xs divide-y divide-gray-100">
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400 font-medium">Order Number:</span>
            <span className="font-bold text-gray-950">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400 font-medium">Transaction Reference:</span>
            <span className="font-mono font-bold text-blue-600 uppercase">{order.transactionReference}</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400 font-medium">Payment Method:</span>
            <span className="font-bold text-gray-950">M-Pesa Paybill (502600)</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400 font-medium">Amount Paid:</span>
            <span className="font-bold text-gray-950 text-sm">Ksh {order.grandTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400 font-medium">Date:</span>
            <span className="font-bold text-gray-950">{order.date}</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400 font-medium">Estimated Delivery:</span>
            <span className="font-bold text-blue-600">{order.estimatedDeliveryDate}</span>
          </div>
        </div>

        {/* Quick action buttons stack */}
        <div className="flex flex-col gap-2.5 pt-2">
          
          <button
            id="success-track-order-btn"
            onClick={() => setView('track-delivery')}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700 transition-colors focus:outline-none"
          >
            <MapPin className="h-4.5 w-4.5" />
            <span>Track Delivery Timeline</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="success-download-btn"
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
            >
              <Download className="h-4 w-4 text-gray-500" />
              <span>Download Receipt</span>
            </button>
            <button
              id="success-continue-btn"
              onClick={() => setView('shop')}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
            >
              <ShoppingBag className="h-4 w-4 text-gray-500" />
              <span>Shop More</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
