/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number; // Crossed out original price if discount exists
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  images: string[]; // Image gallery
  features: string[];
  specifications: Record<string, string>;
  reviews: ProductReview[];
  stock: number;
  deliveryEstimate: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
}

export interface DeliveryAgent {
  name: string;
  phone: string;
  vehicle: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  discount: number;
  vat: number;
  grandTotal: number;
  customerInfo: CustomerInfo;
  deliveryMethod: 'home_delivery' | 'pickup_station';
  paymentMethod: 'paybill';
  paymentStatus: 'pending' | 'completed' | 'failed';
  deliveryStatus: 'placed' | 'confirmed' | 'processing' | 'packed' | 'dispatched' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  transactionReference?: string;
  estimatedDeliveryDate: string;
  deliveryAgent?: DeliveryAgent;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isLoggedIn: boolean;
  savedAddresses?: string[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type ViewType =
  | 'home'
  | 'shop'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'payment-success'
  | 'receipt'
  | 'orders'
  | 'track-delivery'
  | 'dashboard'
  | 'wishlist'
  | 'login'
  | 'register';
