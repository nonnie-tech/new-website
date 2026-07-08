/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Order } from '../types';
import { useShop } from '../context/ShopContext';
import { Printer, Download, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';

interface ReceiptComponentProps {
  order: Order;
  onBackToOrders?: () => void;
}

export const ReceiptComponent: React.FC<ReceiptComponentProps> = ({ order, onBackToOrders }) => {
  const { showToast } = useShop();

  const handlePrint = () => {
    window.print();
    showToast('Sent receipt document to printer.', 'info');
  };

  const handleDownloadPDF = () => {
    // Generate a beautiful receipt text file for download
    const receiptContent = `
========================================
             SHOPEASE RECEIPTS
========================================
Receipt No: RE-${order.id.toUpperCase().replace('ORD-', '')}
Order Number: ${order.orderNumber}
Date: ${order.date}
Payment Ref: ${order.transactionReference || 'MOCK-MPESA-REF'}
Payment Method: M-Pesa Paybill
Status: PAID & CONFIRMED

CUSTOMER DETAILS
----------------------------------------
Name: ${order.customerInfo.fullName}
Phone: ${order.customerInfo.phone}
Email: ${order.customerInfo.email}
Delivery Address: ${order.customerInfo.address}, ${order.customerInfo.city}

PURCHASED ITEMS
----------------------------------------
${order.items.map((item) => `${item.product.name} x${item.quantity} - Ksh ${(item.product.price * item.quantity).toLocaleString()}`).join('\n')}

SUMMARY
----------------------------------------
Items Total: Ksh ${order.totalAmount.toLocaleString()}
Delivery Fee: Ksh ${order.deliveryFee.toLocaleString()}
Discount Applied: -Ksh ${order.discount.toLocaleString()}
VAT (16% Included): Ksh ${order.vat.toLocaleString()}
----------------------------------------
GRAND TOTAL: Ksh ${order.grandTotal.toLocaleString()}

Thank you for shopping with ShopEase!
========================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ShopEase-Receipt-${order.orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Receipt PDF text file downloaded successfully!');
  };

  const receiptNo = `RE-${order.id.toUpperCase().replace('ORD-', '')}`;

  return (
    <div id="receipt-screen" className="max-w-2xl mx-auto py-4">
      {/* Back button */}
      {onBackToOrders && (
        <button
          id="receipt-back-btn"
          onClick={onBackToOrders}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus:outline-none print:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Orders</span>
        </button>
      )}

      {/* Actual Receipt Wrapper */}
      <div
        id="receipt-print-wrapper"
        className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-lg print:border-0 print:shadow-none"
      >
        
        {/* Header Grid */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-8 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-950">
                Shop<span className="text-blue-600">Ease</span>
              </span>
            </div>
            <p className="mt-1.5 text-xs text-gray-400">Kilimani, Nairobi, Kenya | support@shopease.co.ke</p>
          </div>
          
          <div className="text-left sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-100 mb-2">
              <CheckCircle className="h-3 w-3 fill-emerald-500 text-white" /> Paid
            </span>
            <div className="text-xs text-gray-400">Receipt: <span className="font-semibold text-gray-800">{receiptNo}</span></div>
            <div className="text-xs text-gray-400 mt-0.5">Date: <span className="font-semibold text-gray-800">{order.date}</span></div>
          </div>
        </div>

        {/* Customer & Transaction Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-b border-gray-100 text-xs">
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2.5">Invoiced To:</h4>
            <div className="text-gray-800 font-semibold mb-1">{order.customerInfo.fullName}</div>
            <div className="text-gray-500 mb-0.5">Phone: {order.customerInfo.phone}</div>
            <div className="text-gray-500 mb-0.5">Email: {order.customerInfo.email}</div>
            <div className="text-gray-500">
              Address: {order.customerInfo.address}, {order.customerInfo.city}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2.5">Payment Information:</h4>
            <div className="text-gray-500 mb-1">Method: <span className="font-semibold text-gray-800">M-Pesa Paybill</span></div>
            <div className="text-gray-500 mb-1">Business No: <span className="font-semibold text-gray-800">502600</span></div>
            <div className="text-gray-500 mb-1">Account No: <span className="font-semibold text-gray-800">{order.orderNumber}</span></div>
            <div className="text-gray-500">
              Transaction Ref: <span className="font-mono font-bold text-blue-600 uppercase">{order.transactionReference || 'PENDING'}</span>
            </div>
          </div>
        </div>

        {/* Purchased Items Table */}
        <div className="py-8">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Purchased Items</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <tr key={item.product.id} className="text-gray-800">
                    <td className="py-3">
                      <div className="font-medium text-gray-950">{item.product.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.product.category} | {item.product.brand}</div>
                    </td>
                    <td className="py-3 text-center font-medium text-gray-600">{item.quantity}</td>
                    <td className="py-3 text-right">Ksh {item.product.price.toLocaleString()}</td>
                    <td className="py-3 text-right font-semibold">
                      Ksh {(item.product.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculations Section */}
        <div className="border-t border-gray-200 pt-6 flex justify-end text-xs">
          <div className="w-full sm:w-72 space-y-2 text-gray-500">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="font-semibold text-gray-900">Ksh {order.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-gray-900">Ksh {order.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Discount Applied:</span>
              <span className="font-semibold">-Ksh {order.discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (16% standard included):</span>
              <span className="font-semibold text-gray-900">Ksh {order.vat.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-sm text-gray-950 font-bold">
              <span>Grand Total:</span>
              <span className="text-blue-600">Ksh {order.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="mt-12 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-6">
          <p className="font-medium">Thank you for shopping with ShopEase!</p>
          <p className="mt-1">This is a digitally generated system receipt. No physical signature is required.</p>
        </div>

      </div>

      {/* Buttons */}
      <div id="receipt-actions-row" className="mt-8 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
        <button
          id="print-receipt-btn"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition-all active:scale-95"
        >
          <Printer className="h-4.5 w-4.5 text-gray-500" />
          <span>Print Receipt</span>
        </button>
        <button
          id="download-receipt-btn"
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-700 focus:outline-none transition-all active:scale-95"
        >
          <Download className="h-4.5 w-4.5" />
          <span>Download Receipt</span>
        </button>
      </div>

    </div>
  );
};
