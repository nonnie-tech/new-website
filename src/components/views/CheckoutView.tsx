/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { CreditCard, Truck, Landmark, ClipboardCheck, ArrowLeft, Loader2, Info, AlertCircle } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    setView,
    currentUser,
    createOrder,
    finalizeOrderPayment,
    showToast
  } = useShop();

  // If cart is empty, send them back to shop
  useEffect(() => {
    if (cart.length === 0) {
      setView('shop');
    }
  }, [cart]);

  // Form State
  const [fullName, setFullName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [address, setAddress] = useState(currentUser.savedAddresses?.[0] || '');
  const [city, setCity] = useState('Nairobi');
  const [notes, setNotes] = useState('');
  
  // Delivery Method Selection
  const [deliveryMethod, setDeliveryMethod] = useState<'home_delivery' | 'pickup_station'>('home_delivery');

  // Order Lifecycle State
  const [pendingOrder, setPendingOrder] = useState<any | null>(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  // Math Calculations (Live estimates for preview)
  const itemsSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'home_delivery' ? 350 : 0;
  const discountAmount = itemsSubtotal > 15000 ? Math.round(itemsSubtotal * 0.1) : Math.round(itemsSubtotal * 0.05);
  const vatAmount = Math.round((itemsSubtotal - discountAmount) * 0.16);
  const grandTotal = itemsSubtotal + deliveryFee - discountAmount + vatAmount;

  // Handles placing the initial pending order to generate the Account Number (Order ID)
  const handlePlacePendingOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !address) {
      showToast('Please fill out all required customer information fields.', 'error');
      return;
    }

    const orderInfo = createOrder(
      {
        fullName,
        phone,
        email,
        address: deliveryMethod === 'pickup_station' ? `Pickup: ${address}` : address,
        city,
        notes
      },
      deliveryMethod
    );

    setPendingOrder(orderInfo);
    showToast('Pending order registered. Please follow Paybill payment instructions below.', 'info');
  };

  // Simulates verifying the M-Pesa payment
  const handleConfirmPayment = () => {
    if (!pendingOrder) return;
    setIsVerifyingPayment(true);

    // Simulate 1.5s server-side verification with Safaricom API
    setTimeout(() => {
      setIsVerifyingPayment(false);
      
      // Generate a realistic M-Pesa transaction reference
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let ref = 'MPESA-';
      for (let i = 0; i < 9; i++) {
        ref += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      finalizeOrderPayment(pendingOrder.id, ref);
      setView('payment-success');
    }, 1800);
  };

  const pickupStations: Record<string, string[]> = {
    'Nairobi': ['Kilimani Mall, Rose Avenue', 'Westlands Square Mall Ground Floor', 'CBD View Plaza, Kimathi Street'],
    'Mombasa': ['Nyali Plaza Pickup Point', 'Mombasa Town Mall, Digo Road'],
    'Kisumu': ['Kisumu Megacity Ground Floor', 'Riat Mall Office 5']
  };

  // Keep pickup station address synchronized if they switch to pickup station
  useEffect(() => {
    if (deliveryMethod === 'pickup_station') {
      setAddress(pickupStations[city]?.[0] || 'Pickup Station');
    } else {
      setAddress(currentUser.savedAddresses?.[0] || '');
    }
  }, [deliveryMethod, city]);

  return (
    <div id="checkout-page-wrapper" className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div className="text-left border-b border-gray-100 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">Checkout Payment</h1>
          <p className="text-xs text-gray-500 mt-1">Complete your order details and pay via M-Pesa Paybill</p>
        </div>
        
        <button
          id="checkout-back-to-cart"
          onClick={() => setView('cart')}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-950 focus:outline-none transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side (Forms and instructions) (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Customer details Form */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
            <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">1</span>
              <span>Customer Information & Shipping</span>
            </h3>

            <form id="checkout-shipping-form" onSubmit={handlePlacePendingOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="checkout-name" className="text-xs font-bold text-gray-900">Full Name *</label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    disabled={!!pendingOrder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                    placeholder="e.g. Jak Mbugua"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="checkout-phone" className="text-xs font-bold text-gray-900">M-Pesa Phone Number *</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    disabled={!!pendingOrder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                    placeholder="e.g. 0712345678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="checkout-email" className="text-xs font-bold text-gray-900">Email Address *</label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    disabled={!!pendingOrder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                    placeholder="e.g. jak@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="checkout-city" className="text-xs font-bold text-gray-900">Town / City *</label>
                  <select
                    id="checkout-city"
                    required
                    disabled={!!pendingOrder}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                  </select>
                </div>
              </div>

              {/* Delivery method toggle choice */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-900 block">Delivery Method *</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    id="delivery-home-btn"
                    type="button"
                    disabled={!!pendingOrder}
                    onClick={() => setDeliveryMethod('home_delivery')}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                      deliveryMethod === 'home_delivery'
                        ? 'border-blue-600 bg-blue-50/20 shadow-sm'
                        : 'border-gray-100 hover:bg-gray-50'
                    } disabled:opacity-60`}
                  >
                    <Truck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-gray-950">Home/Office Delivery</span>
                      <span className="block text-[10px] text-gray-500 font-light mt-0.5">Ships directly to your location. Delivery Fee: Ksh 350</span>
                    </div>
                  </button>

                  <button
                    id="delivery-pickup-btn"
                    type="button"
                    disabled={!!pendingOrder}
                    onClick={() => setDeliveryMethod('pickup_station')}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                      deliveryMethod === 'pickup_station'
                        ? 'border-blue-600 bg-blue-50/20 shadow-sm'
                        : 'border-gray-100 hover:bg-gray-50'
                    } disabled:opacity-60`}
                  >
                    <Landmark className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-gray-950">Pickup Station (Ksh 0)</span>
                      <span className="block text-[10px] text-gray-500 font-light mt-0.5">Collect from local designated center near you.</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic Address details */}
              <div className="space-y-1.5">
                <label htmlFor="checkout-address" className="text-xs font-bold text-gray-900">
                  {deliveryMethod === 'home_delivery' ? 'Physical Address (Street, Apartment, Gate No.) *' : 'Select Pickup Station *'}
                </label>
                
                {deliveryMethod === 'home_delivery' ? (
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    disabled={!!pendingOrder}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                    placeholder="e.g. Kilimani, Rose Avenue, Apt 4B"
                  />
                ) : (
                  <select
                    id="checkout-pickup-select"
                    required
                    disabled={!!pendingOrder}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                  >
                    {pickupStations[city]?.map((station) => (
                      <option key={station} value={station}>{station}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label htmlFor="checkout-notes" className="text-xs font-bold text-gray-900">Additional Order Notes (Optional)</label>
                <textarea
                  id="checkout-notes"
                  rows={2}
                  disabled={!!pendingOrder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60 resize-none"
                  placeholder="e.g. Leave with receptionist, call before dispatch..."
                />
              </div>

              {/* Initial step button */}
              {!pendingOrder && (
                <button
                  id="submit-shipping-details-btn"
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-md focus:outline-none"
                >
                  Confirm Details & Generate Paybill
                </button>
              )}
            </form>
          </div>

          {/* STEP 2: Paybill Details (Shows only after pending order is placed) */}
          {pendingOrder && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md text-left space-y-6 animate-in slide-in-from-bottom-5 duration-300">
              <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">2</span>
                <span>M-Pesa Lipa na M-Pesa Paybill</span>
              </h3>

              {/* M-Pesa design identity banner */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 p-5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                <div className="space-y-1">
                  <span className="inline-block rounded-md bg-white/20 px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                    SAFARICOM M-PESA
                  </span>
                  <h4 className="text-base font-black tracking-tight">ShopEase M-Pesa Paybill Channel</h4>
                  <p className="text-[11px] text-emerald-100 leading-tight">Follow instructions to complete your payment securely.</p>
                </div>
                
                {/* Account Number display */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 text-center sm:text-right">
                  <div className="text-[9px] uppercase font-bold text-emerald-200">Payment Account No:</div>
                  <div className="text-base font-mono font-black">{pendingOrder.orderNumber}</div>
                </div>
              </div>

              {/* Paybill Parameters Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Business Number</span>
                  <span className="text-lg font-black text-blue-600 font-mono">502600</span>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Account Number</span>
                  <span className="text-lg font-black text-blue-600 font-mono">{pendingOrder.orderNumber}</span>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Amount To Pay</span>
                  <span className="text-lg font-black text-blue-600 font-mono">Ksh {pendingOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Written instructions */}
              <div className="space-y-3 text-xs text-gray-600 bg-blue-50/25 border border-blue-500/10 rounded-2xl p-5">
                <h5 className="font-bold text-gray-950 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-blue-600" /> Payment Steps:
                </h5>
                <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed font-light">
                  <li>Go to your SIM toolkit or open your <span className="font-bold text-gray-800">M-PESA App</span> on your mobile device.</li>
                  <li>Select <span className="font-bold text-gray-800">Lipa na M-PESA</span>, then click on <span className="font-bold text-gray-800">Pay Bill</span>.</li>
                  <li>Enter Business Number <span className="font-mono font-bold text-gray-950">502600</span> (registered as ShopEase Ltd).</li>
                  <li>Enter Account Number <span className="font-mono font-bold text-gray-950">{pendingOrder.orderNumber}</span>.</li>
                  <li>Enter exactly Amount: <span className="font-bold text-gray-950">Ksh {pendingOrder.grandTotal.toLocaleString()}</span>.</li>
                  <li>Key in your secret M-Pesa PIN and press OK to complete the transaction.</li>
                  <li>Wait to receive Safaricom transaction SMS, then click <span className="font-bold text-blue-600">"Confirm Payment"</span> below to finalize.</li>
                </ol>
              </div>

              {/* Action payment confirm buttons */}
              <div className="pt-2">
                <button
                  id="checkout-confirm-payment-btn"
                  onClick={handleConfirmPayment}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700 transition-colors focus:outline-none"
                >
                  <ClipboardCheck className="h-4.5 w-4.5" />
                  <span>Confirm M-Pesa Payment Received</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Side (Pricing Summary Card) (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 space-y-6 shadow-sm text-left">
          <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest border-b border-gray-50 pb-3">
            Itemized Order Checkout
          </h3>

          {/* Cart item summary snapshots */}
          <div className="divide-y divide-gray-50 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            {cart.map((item) => (
              <div key={item.product.id} className="py-2.5 flex items-center gap-3 text-xs">
                <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-950 truncate">{item.product.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Qty: {item.quantity} x Ksh {item.product.price.toLocaleString()}</div>
                </div>
                <div className="font-bold text-gray-800">
                  Ksh {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing breakdowns */}
          <div className="space-y-3 text-xs border-t border-gray-100 pt-4 text-gray-500 font-medium">
            <div className="flex justify-between">
              <span>Items Total Subtotal:</span>
              <span className="font-bold text-gray-950">Ksh {itemsSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee ({deliveryMethod === 'home_delivery' ? 'Home' : 'Pickup'}):</span>
              <span className="font-bold text-gray-950">Ksh {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Volume Discount:</span>
              <span className="font-bold">-Ksh {discountAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT standard Tax (16% Included):</span>
              <span className="font-bold text-gray-950">Ksh {vatAmount.toLocaleString()}</span>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between text-sm text-gray-950 font-black">
              <span>Grand Net Total:</span>
              <span className="text-blue-600">Ksh {grandTotal.toLocaleString()}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Network Verification Loading Spinner Overlay */}
      {isVerifyingPayment && (
        <div id="payment-verification-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
          
          <div className="relative bg-white border border-gray-100 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 animate-spin">
              <Loader2 className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-gray-950">Verifying Safaricom M-Pesa...</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Securely polling the Safaricom network to verify Paybill reference credentials for order <span className="font-semibold text-gray-800">{pendingOrder?.orderNumber}</span>. Please do not close this window.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
