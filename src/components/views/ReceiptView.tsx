/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ReceiptComponent } from '../ReceiptComponent';

export const ReceiptView: React.FC = () => {
  const { currentOrderForReceipt, setView } = useShop();

  if (!currentOrderForReceipt) {
    return (
      <div id="receipt-error-state" className="text-center py-12">
        <p className="text-gray-500">No receipt selection active. Please choose an order first.</p>
        <button onClick={() => setView('orders')} className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-sm text-white">
          Go to My Orders
        </button>
      </div>
    );
  }

  return (
    <div id="receipt-view-wrapper" className="pb-16">
      <ReceiptComponent
        order={currentOrderForReceipt}
        onBackToOrders={() => setView('orders')}
      />
    </div>
  );
};
