/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { ClipboardList, ShoppingBag, Eye, MapPin, Receipt, ArrowRight, ChevronRight } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, setView, setReceiptOrder, setTrackingOrder } = useShop();

  // Tab filter: 'current' | 'delivered' | 'cancelled'
  const [activeTab, setActiveTab] = useState<'current' | 'delivered' | 'cancelled'>('current');

  // Filter orders based on active tab selection
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === 'current') {
        return order.deliveryStatus !== 'delivered' && order.deliveryStatus !== 'cancelled';
      } else if (activeTab === 'delivered') {
        return order.deliveryStatus === 'delivered';
      } else {
        return order.deliveryStatus === 'cancelled';
      }
    });
  }, [orders, activeTab]);

  return (
    <div id="orders-page-wrapper" className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div className="text-left border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-black text-gray-950 tracking-tight">Order Histories</h1>
        <p className="text-xs text-gray-500 mt-1">Review M-Pesa paid receipts and track active deliveries</p>
      </div>

      {/* Tabs Filter controller */}
      <div className="flex border-b border-gray-100 font-bold text-xs select-none">
        <button
          id="orders-tab-current"
          onClick={() => setActiveTab('current')}
          className={`py-3 px-6 border-b-2 -mb-[2px] transition-colors focus:outline-none ${
            activeTab === 'current' ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Active Deliveries ({orders.filter((o) => o.deliveryStatus !== 'delivered' && o.deliveryStatus !== 'cancelled').length})
        </button>
        <button
          id="orders-tab-delivered"
          onClick={() => setActiveTab('delivered')}
          className={`py-3 px-6 border-b-2 -mb-[2px] transition-colors focus:outline-none ${
            activeTab === 'delivered' ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Completed / Delivered ({orders.filter((o) => o.deliveryStatus === 'delivered').length})
        </button>
        <button
          id="orders-tab-cancelled"
          onClick={() => setActiveTab('cancelled')}
          className={`py-3 px-6 border-b-2 -mb-[2px] transition-colors focus:outline-none ${
            activeTab === 'cancelled' ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Cancelled ({orders.filter((o) => o.deliveryStatus === 'cancelled').length})
        </button>
      </div>

      {/* Orders List / Empty State */}
      {filteredOrders.length > 0 ? (
        <div id="orders-cards-list" className="space-y-4">
          {filteredOrders.map((order) => {
            const isDelivered = order.deliveryStatus === 'delivered';
            const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

            return (
              <div
                id={`order-card-${order.id}`}
                key={order.id}
                className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:border-gray-200 hover:shadow-md"
              >
                
                {/* Left block: Order identification + items summary */}
                <div className="text-left space-y-3.5 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-extrabold text-gray-950 font-mono">
                      Order: {order.orderNumber}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Date Placed: {order.date}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isDelivered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-blue-50 text-blue-700 border border-blue-100 animate-pulse'
                    }`}>
                      {order.deliveryStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Thumbnail and items roll summary */}
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3.5 overflow-hidden">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="h-11 w-11 rounded-xl border border-white bg-gray-50 overflow-hidden flex-shrink-0 shadow-sm">
                          <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="min-w-0 text-xs">
                      <div className="font-bold text-gray-900 truncate">
                        {order.items.map((i) => i.product.name).join(', ')}
                      </div>
                      <div className="text-gray-400 mt-0.5 font-medium">
                        Total items count: <span className="font-bold text-gray-600">{itemsCount} units</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right block: Total and action trigger buttons */}
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
                  
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Paid (VAT incl.)</span>
                    <span className="text-base font-black text-blue-600 font-mono">Ksh {order.grandTotal.toLocaleString()}</span>
                  </div>

                  {/* Buttons controls */}
                  <div className="flex gap-2 text-xs font-bold">
                    
                    {/* Invoice/Receipt */}
                    <button
                      id={`order-view-receipt-${order.id}`}
                      onClick={() => setReceiptOrder(order)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                      <Receipt className="h-4 w-4 text-gray-400" />
                      <span className="hidden sm:inline">Receipt</span>
                    </button>

                    {/* Delivery tracking */}
                    {!isDelivered && (
                      <button
                        id={`order-track-delivery-${order.id}`}
                        onClick={() => setTrackingOrder(order)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2.5 text-white hover:bg-blue-700 shadow-sm focus:outline-none transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Track Shipment</span>
                      </button>
                    )}

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        
        // Blank history state
        <div id="orders-empty-state" className="border border-gray-100 rounded-3xl bg-white p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-8 text-left">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ClipboardList className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-950 text-center">No orders listed in this tab</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed text-center">
            You don't have any matching orders in your history. Go back to our products catalog and discover premium selections!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setView('shop')}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none"
            >
              Start Browsing Now
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
