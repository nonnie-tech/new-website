/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight, Minus, Plus, AlertTriangle } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    setView,
    setProductId,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    showToast
  } = useShop();

  // Confirmation dialog state for item removal
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Math Calculations
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const itemsSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  // Calculate a volume discount (10% above Ksh 15,000, 5% otherwise, or 0 if empty)
  const discountAmount = itemsSubtotal > 0
    ? itemsSubtotal > 15000
      ? Math.round(itemsSubtotal * 0.1)
      : Math.round(itemsSubtotal * 0.05)
    : 0;

  const deliveryFee = itemsSubtotal > 0 ? 350 : 0; // standard flat rate (will be customized on checkout)
  const vatAmount = Math.round((itemsSubtotal - discountAmount) * 0.16); // 16% standard VAT
  const grandTotal = itemsSubtotal + deliveryFee - discountAmount + vatAmount;

  const handleTriggerDeleteConfirm = (productId: string) => {
    setItemToDelete(productId);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
  };

  const handleProceedToCheckout = () => {
    setView('checkout');
  };

  const productToDelete = cart.find((item) => item.product.id === itemToDelete)?.product;

  return (
    <div id="cart-page-wrapper" className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div className="text-left border-b border-gray-100 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">Shopping Basket</h1>
          <p className="text-xs text-gray-500 mt-1">Review your premium selections and totals</p>
        </div>
        
        {cart.length > 0 && (
          <button
            id="clear-entire-cart-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your entire cart?')) {
                clearCart();
              }
            }}
            className="text-xs font-semibold text-rose-500 hover:text-rose-700 hover:underline focus:outline-none transition-all"
          >
            Clear All items
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Table Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    id={`cart-row-${item.product.id}`}
                    key={item.product.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors hover:bg-gray-50/30"
                  >
                    
                    {/* Item details */}
                    <div className="flex gap-4 items-center flex-1 min-w-0">
                      <div
                        onClick={() => setProductId(item.product.id)}
                        className="h-20 w-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 cursor-pointer"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="text-left min-w-0">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded">
                          {item.product.category}
                        </span>
                        <h4
                          onClick={() => setProductId(item.product.id)}
                          className="text-sm font-bold text-gray-950 truncate mt-1 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-gray-400 mt-0.5 font-medium">Brand: {item.product.brand}</div>
                        <div className="text-xs text-gray-900 font-bold mt-1">Ksh {item.product.price.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Quantity selectors and Subtotal price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      
                      {/* +/- Controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden p-0.5 shadow-sm">
                        <button
                          id={`qty-dec-${item.product.id}`}
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-inc-${item.product.id}`}
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Row Total Subtotal */}
                      <div className="text-right w-24">
                        <span className="text-sm font-bold text-gray-950">
                          Ksh {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Remove Button trigger modal */}
                      <button
                        id={`cart-item-delete-${item.product.id}`}
                        onClick={() => handleTriggerDeleteConfirm(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg transition-colors focus:outline-none"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Back button option */}
            <button
              id="cart-back-to-shop-btn"
              onClick={() => setView('shop')}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-950 transition-colors focus:outline-none"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Cart Pricing Summary Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest border-b border-gray-50 pb-3">
              Order Pricing Summary
            </h3>
            
            <div className="space-y-3.5 text-xs text-gray-500 font-medium">
              <div className="flex justify-between">
                <span>Basket Items Subtotal ({totalItemsCount} items):</span>
                <span className="font-bold text-gray-900">Ksh {itemsSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery Fee:</span>
                <span className="font-bold text-gray-900">Ksh {deliveryFee.toLocaleString()}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Volume Discount ({itemsSubtotal > 15000 ? '10%' : '5%'} applied):</span>
                  <span className="font-bold">-Ksh {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>VAT Tax Estimate (16% standard):</span>
                <span className="font-bold text-gray-900">Ksh {vatAmount.toLocaleString()}</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between text-sm text-gray-950 font-black">
                <span>Grand Total Amount:</span>
                <span className="text-blue-600 text-base">Ksh {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Checkout Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700 transition-all active:scale-95 focus:outline-none"
            >
              <span>Proceed to Paybill Checkout</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>

            {/* Micro assurance disclaimer */}
            <p className="text-[10px] text-gray-400 font-medium text-center">
              Items will be secured for checkout. Payments are protected and processed via M-Pesa.
            </p>
          </div>

        </div>
      ) : (
        
        // Basket Empty State layout
        <div id="cart-empty-state" className="border border-gray-100 rounded-3xl bg-white p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-950">Your Shopping Basket is Empty</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Looks like you haven't added any premium selections to your cart yet. Explore our curated electronics, apparel collections, or living goods!
          </p>
          <button
            id="cart-empty-shop-btn"
            onClick={() => setView('shop')}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none"
          >
            Explore Product Catalog
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog Modal */}
      {itemToDelete && (
        <div id="delete-confirm-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setItemToDelete(null)} />
          
          <div className="relative bg-white border border-gray-200 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-left space-y-5 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-3 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 flex-shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-950">Remove Product?</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  Are you sure you want to remove <span className="font-bold text-gray-800">"{productToDelete?.name}"</span> from your shopping cart? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 justify-end text-xs font-bold">
              <button
                id="delete-confirm-cancel"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 focus:outline-none transition-colors"
              >
                Cancel
              </button>
              <button
                id="delete-confirm-ok"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 focus:outline-none transition-colors shadow-sm shadow-rose-500/10"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
