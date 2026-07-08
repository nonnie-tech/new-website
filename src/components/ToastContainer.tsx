/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgClass = 'bg-white text-gray-800 border-gray-100';
          let icon = <Info className="h-5 w-5 text-blue-500" />;
          
          if (toast.type === 'success') {
            bgClass = 'bg-emerald-50 text-emerald-900 border-emerald-100';
            icon = <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
          } else if (toast.type === 'error') {
            bgClass = 'bg-rose-50 text-rose-900 border-rose-100';
            icon = <AlertCircle className="h-5 w-5 text-rose-600" />;
          } else if (toast.type === 'info') {
            bgClass = 'bg-blue-50 text-blue-900 border-blue-100';
            icon = <Info className="h-5 w-5 text-blue-600" />;
          }

          return (
            <motion.div
              id={`toast-${toast.id}`}
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
              className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${bgClass}`}
            >
              <div className="flex-shrink-0 mt-0.5">{icon}</div>
              <div className="flex-grow text-sm font-medium pr-2">{toast.message}</div>
              <button
                id={`close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-0.5"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
