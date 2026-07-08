/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { DeliveryTimeline } from '../DeliveryTimeline';
import { Compass, Phone, User, Info, ArrowLeft, RefreshCw, Calendar, MapPin, Truck } from 'lucide-react';

export const TrackDeliveryView: React.FC = () => {
  const { currentOrderForTracking, orders, setView, showToast } = useShop();

  // If no order is active, fallback to first order in list or show empty state
  const order = currentOrderForTracking || orders[0];

  // Local state to support instant live simulations
  const [localStatus, setLocalStatus] = useState<any>('placed');

  useEffect(() => {
    if (order) {
      setLocalStatus(order.deliveryStatus);
    }
  }, [order]);

  if (!order) {
    return (
      <div id="tracking-empty" className="border border-gray-100 rounded-3xl bg-white p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Compass className="h-7 w-7 animate-spin" />
        </div>
        <h3 className="text-lg font-bold text-gray-950">No active tracking order found</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          You don't have any orders currently dispatched for delivery. Go to your orders history to view details of previous purchases!
        </p>
        <button
          onClick={() => setView('orders')}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none"
        >
          Check Orders History
        </button>
      </div>
    );
  }

  // Support advancing status for demo/simulation purposes
  const statusFlow: any[] = ['placed', 'confirmed', 'processing', 'packed', 'dispatched', 'out_for_delivery', 'delivered'];
  
  const handleSimulateNextStep = () => {
    const currentIndex = statusFlow.indexOf(localStatus);
    if (currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      setLocalStatus(nextStatus);
      // Persist in mock order
      order.deliveryStatus = nextStatus;
      showToast(`Simulated status update: Order is now ${nextStatus.replace('_', ' ').toUpperCase()}`, 'success');
    } else {
      showToast('Order is already marked as DELIVERED!', 'info');
    }
  };

  const handleResetSimulation = () => {
    setLocalStatus('placed');
    order.deliveryStatus = 'placed';
    showToast('Reset delivery status to PLACED for demo.', 'info');
  };

  const agentName = order.deliveryAgent?.name || 'Francis Omondi';
  const agentPhone = order.deliveryAgent?.phone || '0722 000 111';
  const agentVehicle = order.deliveryAgent?.vehicle || 'KCD 412X (Toyota Probox)';

  return (
    <div id="track-delivery-page" className="space-y-6 pb-16">
      
      {/* Title Header */}
      <div className="text-left border-b border-gray-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">Track Delivery Shipment</h1>
          <p className="text-xs text-gray-500 mt-1">Real-time GPS status and delivery progress logs</p>
        </div>
        
        <button
          id="track-back-to-orders"
          onClick={() => setView('orders')}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-950 focus:outline-none transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>My Orders History</span>
        </button>
      </div>

      {/* Main timeline + details card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Large timeline block (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-4">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-gray-400">Tracking Number:</span>
              <h3 className="text-sm font-extrabold text-blue-600 font-mono tracking-tight mt-0.5">{order.trackingNumber}</h3>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400">Order ID:</span>
              <h3 className="text-sm font-bold text-gray-900 mt-0.5">{order.orderNumber}</h3>
            </div>
          </div>

          {/* Core Timeline Component */}
          <DeliveryTimeline currentStatus={localStatus} />

          {/* Interactive Demo simulation controller */}
          <div className="border border-blue-500/10 bg-blue-50/15 rounded-2xl p-5 text-left space-y-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4.5 w-4.5 text-blue-600 animate-spin" />
              <h4 className="text-xs font-bold text-gray-950">Interactive Delivery Simulator</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              This sandbox incorporates a real-time status driver. Click <span className="font-bold text-blue-600">Advance Status</span> to trigger Safaricom/warehouse signals and push the courier's delivery steps forward!
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                id="sim-advance-status"
                onClick={handleSimulateNextStep}
                className="rounded-xl bg-blue-600 py-2 px-4 text-xs font-bold text-white hover:bg-blue-700 shadow-sm focus:outline-none transition-colors"
              >
                Advance Status (Next Step)
              </button>
              <button
                id="sim-reset-status"
                onClick={handleResetSimulation}
                className="rounded-xl border border-gray-200 bg-white py-2 px-4 text-xs font-semibold text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors"
              >
                Reset to Placed
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Courier + Details info card (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Dispatch summary details */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-5">
            <h4 className="text-xs font-bold text-gray-950 uppercase tracking-widest border-b border-gray-50 pb-3">
              Shipment Information
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="block font-bold text-gray-900">Estimated Arrival Date</span>
                  <span className="text-blue-600 font-semibold">{order.estimatedDeliveryDate}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="block font-bold text-gray-900">Delivery Location Address</span>
                  <span className="text-gray-500 leading-tight block">{order.customerInfo.address}, {order.customerInfo.city}</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="block font-bold text-gray-900">Shipping Mode / Method</span>
                  <span className="text-gray-500 font-semibold uppercase">{order.deliveryMethod.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Courier Agent block */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-5">
            <h4 className="text-xs font-bold text-gray-950 uppercase tracking-widest border-b border-gray-50 pb-3">
              Your Delivery Rider / Agent
            </h4>

            {/* Driver Profile */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-bold text-sm">
                <User className="h-5 w-5" />
              </div>
              
              <div className="text-xs">
                <h5 className="font-bold text-gray-950">{agentName}</h5>
                <p className="text-gray-400 mt-0.5 font-medium">Licensed ShopEase Dispatch Driver</p>
              </div>
            </div>

            {/* Rider metadata */}
            <div className="space-y-3.5 text-xs text-gray-500 pt-2 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <span>Vehicle:</span>
                <span className="font-bold text-gray-950">{agentVehicle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Contact Rider:</span>
                <a href={`tel:${agentPhone}`} className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline">
                  <Phone className="h-3 w-3" /> {agentPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
