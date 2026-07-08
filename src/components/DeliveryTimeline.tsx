/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, ClipboardList, Wallet, Settings, Package, Truck, Compass, Home } from 'lucide-react';

interface DeliveryTimelineProps {
  currentStatus: 'placed' | 'confirmed' | 'processing' | 'packed' | 'dispatched' | 'out_for_delivery' | 'delivered';
}

interface Stage {
  key: DeliveryTimelineProps['currentStatus'];
  label: string;
  description: string;
  icon: React.ComponentType<any>;
}

const STAGES: Stage[] = [
  { key: 'placed', label: 'Order Placed', description: 'Received in system', icon: ClipboardList },
  { key: 'confirmed', label: 'Payment Confirmed', description: 'M-Pesa transaction verified', icon: Wallet },
  { key: 'processing', label: 'Processing', description: 'Assigned to warehouse', icon: Settings },
  { key: 'packed', label: 'Packed', description: 'Quality checked & sealed', icon: Package },
  { key: 'dispatched', label: 'Dispatched', description: 'Departed sorting facility', icon: Truck },
  { key: 'out_for_delivery', label: 'Out for Delivery', description: 'With courier agent', icon: Compass },
  { key: 'delivered', label: 'Delivered', description: 'Completed and signed', icon: Home }
];

export const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ currentStatus }) => {
  // Find current active index
  const activeIndex = STAGES.findIndex((stage) => stage.key === currentStatus);

  // Calculate percentage for progress bar
  const progressPercent = Math.round((activeIndex / (STAGES.length - 1)) * 100);

  return (
    <div id="delivery-timeline" className="w-full">
      
      {/* Horizontal Desktop Timeline */}
      <div className="hidden lg:block relative mt-8 mb-12">
        {/* Gray Track Background */}
        <div className="absolute top-6 left-12 right-12 h-1 bg-gray-100 rounded-full" />
        {/* Blue Active Progress Bar */}
        <div
          id="desktop-timeline-progress-bar"
          className="absolute top-6 left-12 h-1 bg-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `calc(${progressPercent}% - 24px)` }}
        />

        <div className="relative z-10 flex justify-between">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;
            const isPending = index > activeIndex;

            return (
              <div key={stage.key} className="flex flex-col items-center text-center w-32">
                {/* Node bubble */}
                <div
                  id={`timeline-node-${stage.key}`}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 shadow-sm ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isActive
                        ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100 scale-110 font-bold'
                        : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5 stroke-[3px]" /> : <Icon className="h-5 w-5" />}
                </div>

                {/* Labels */}
                <span className={`mt-3 text-xs font-bold ${isActive ? 'text-blue-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                  {stage.label}
                </span>
                <span className="mt-1 text-[10px] text-gray-400 max-w-[110px] leading-tight">
                  {stage.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Mobile Timeline */}
      <div className="lg:hidden relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
        
        {/* Active colored line in mobile */}
        <div
          id="mobile-timeline-progress-bar"
          className="absolute left-3 top-2 bg-blue-600 w-0.5 transition-all duration-1000 ease-out"
          style={{ height: `calc(${progressPercent}% - 4px)` }}
        />

        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isCompleted = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <div key={stage.key} className="relative flex gap-4 items-start">
              
              {/* Dot Icon Indicator */}
              <div
                id={`mobile-timeline-node-${stage.key}`}
                className={`absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-500 shadow-sm ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : isActive
                      ? 'bg-white border-blue-600 text-blue-600 ring-2 ring-blue-100 scale-105'
                      : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? <Check className="h-3 w-3 stroke-[3px]" /> : <Icon className="h-3.5 w-3.5" />}
              </div>

              {/* Labels right side */}
              <div className="flex-1 min-w-0">
                <h4 className={`text-xs font-bold leading-none ${isActive ? 'text-blue-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                  {stage.label}
                </h4>
                <p className="mt-1 text-[11px] text-gray-400">
                  {stage.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
