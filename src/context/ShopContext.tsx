/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, ToastMessage, ViewType, CustomerInfo } from '../types';
import { mockProducts } from '../data/mockProducts';

interface ShopContextType {
  currentView: ViewType;
  currentProductId: string | null;
  cart: CartItem[];
  wishlist: Product[];
  currentUser: User;
  orders: Order[];
  toasts: ToastMessage[];
  currentOrderForReceipt: Order | null;
  currentOrderForTracking: Order | null;
  searchQuery: string;
  selectedCategory: string;
  setView: (view: ViewType) => void;
  setProductId: (id: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  loginUser: (email: string, name?: string, phone?: string) => void;
  registerUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  createOrder: (customerInfo: CustomerInfo, deliveryMethod: 'home_delivery' | 'pickup_station') => Order;
  finalizeOrderPayment: (orderId: string, reference: string) => void;
  setReceiptOrder: (order: Order | null) => void;
  setTrackingOrder: (order: Order | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Helper to generate random string references
const generateRef = (prefix: string, length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentViewState] = useState<ViewType>('home');
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    isLoggedIn: false,
    savedAddresses: ['Nairobi, Kilimani, Rose Avenue, Apt 4B', 'Mombasa, Nyali, Links Road']
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive Receipt & Tracking Views References
  const [currentOrderForReceipt, setCurrentOrderForReceipt] = useState<Order | null>(null);
  const [currentOrderForTracking, setCurrentOrderForTracking] = useState<Order | null>(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Scroll to top helper
  const setView = (view: ViewType) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setProductId = (id: string | null) => {
    setCurrentProductId(id);
    if (id) {
      setView('product-details');
    }
  };

  // Toast Methods
  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Initialize from LocalStorage or inject default values
  useEffect(() => {
    // 1. Cart
    const storedCart = localStorage.getItem('shopease_cart');
    if (storedCart) {
      try { setCart(JSON.parse(storedCart)); } catch (e) { console.error(e); }
    }

    // 2. Wishlist
    const storedWishlist = localStorage.getItem('shopease_wishlist');
    if (storedWishlist) {
      try { setWishlist(JSON.parse(storedWishlist)); } catch (e) { console.error(e); }
    }

    // 3. User
    const storedUser = localStorage.getItem('shopease_user');
    if (storedUser) {
      try { setCurrentUser(JSON.parse(storedUser)); } catch (e) { console.error(e); }
    }

    // 4. Orders (Seed with beautiful mock records if empty)
    const storedOrders = localStorage.getItem('shopease_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial historic orders
      const seedOrders: Order[] = [
        {
          id: 'ord-100293',
          orderNumber: 'SE-983021',
          date: new Date(2026, 6, 1).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }),
          items: [
            { product: mockProducts[0], quantity: 1 }, // AeroPulse smartwatch
            { product: mockProducts[21], quantity: 2 } // PureRadiance hydration cream
          ],
          totalAmount: 14100,
          deliveryFee: 350,
          discount: 1500,
          vat: 2016,
          grandTotal: 14966,
          customerInfo: {
            fullName: 'Jak Mbugua',
            phone: '0712345678',
            email: 'jak.mbugua@gmail.com',
            address: 'Rose Avenue, Apt 4B',
            city: 'Nairobi'
          },
          deliveryMethod: 'home_delivery',
          paymentMethod: 'paybill',
          paymentStatus: 'completed',
          deliveryStatus: 'delivered',
          trackingNumber: 'TRK-8830192',
          transactionReference: 'MPESA-QRT892JK4',
          estimatedDeliveryDate: new Date(2026, 6, 3).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }),
          deliveryAgent: {
            name: 'Francis Omondi',
            phone: '0722000111',
            vehicle: 'KCD 412X (Toyota Probox)'
          }
        },
        {
          id: 'ord-100294',
          orderNumber: 'SE-983022',
          date: new Date(2026, 6, 6).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }),
          items: [
            { product: mockProducts[1], quantity: 1 }, // SyncAudio Headphones
            { product: mockProducts[12], quantity: 1 } // Streetwear Sneaker
          ],
          totalAmount: 20600,
          deliveryFee: 0, // Free pickup
          discount: 2000,
          vat: 2976,
          grandTotal: 21576,
          customerInfo: {
            fullName: 'Jak Mbugua',
            phone: '0712345678',
            email: 'jak.mbugua@gmail.com',
            address: 'Nyali Plaza Pickup Station',
            city: 'Mombasa'
          },
          deliveryMethod: 'pickup_station',
          paymentMethod: 'paybill',
          paymentStatus: 'completed',
          deliveryStatus: 'dispatched',
          trackingNumber: 'TRK-9948271',
          transactionReference: 'MPESA-WNX4839PL',
          estimatedDeliveryDate: new Date(2026, 6, 9).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }),
          deliveryAgent: {
            name: 'Joseph Mwangi',
            phone: '0733888999',
            vehicle: 'KDN 890Y (Suzuki Alto)'
          }
        }
      ];
      setOrders(seedOrders);
      localStorage.setItem('shopease_orders', JSON.stringify(seedOrders));
    }
  }, []);

  // Sync state changes to LocalStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('shopease_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWish: Product[]) => {
    setWishlist(newWish);
    localStorage.setItem('shopease_wishlist', JSON.stringify(newWish));
  };

  const saveUser = (newUser: User) => {
    setCurrentUser(newUser);
    localStorage.setItem('shopease_user', JSON.stringify(newUser));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('shopease_orders', JSON.stringify(newOrders));
  };

  // Cart Methods
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
      if (newCart[existingIndex].quantity > product.stock) {
        newCart[existingIndex].quantity = product.stock;
        showToast(`Stock limit reached! Set quantity to maximum stock (${product.stock}).`, 'info');
      } else {
        showToast(`Increased "${product.name}" quantity in cart.`);
      }
    } else {
      newCart.push({ product, quantity });
      showToast(`Added "${product.name}" to cart.`);
    }

    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const p = cart.find((item) => item.product.id === productId)?.product;
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
    if (p) {
      showToast(`Removed "${p.name}" from cart.`, 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = cart.find((item) => item.product.id === productId);
    if (!item) return;

    if (quantity > item.product.stock) {
      showToast(`Cannot exceed available stock of ${item.product.stock} items.`, 'error');
      return;
    }

    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    showToast('Cleared your shopping cart.', 'info');
  };

  // Wishlist Methods
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    let newWish = [];
    if (exists) {
      newWish = wishlist.filter((item) => item.id !== product.id);
      showToast(`Removed "${product.name}" from Wishlist.`, 'info');
    } else {
      newWish = [...wishlist, product];
      showToast(`Added "${product.name}" to Wishlist.`);
    }
    saveWishlist(newWish);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Auth Methods
  const loginUser = (email: string, name?: string, phone?: string) => {
    const defaultName = name || email.split('@')[0];
    const uppercaseName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    const newUser: User = {
      id: generateRef('USR-'),
      name: uppercaseName,
      email,
      phone: phone || '0712345678',
      isLoggedIn: true,
      savedAddresses: currentUser.savedAddresses || ['Nairobi, Kilimani, Rose Avenue, Apt 4B']
    };
    saveUser(newUser);
    showToast(`Welcome back, ${uppercaseName}!`, 'success');
    setView('home');
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: generateRef('USR-'),
      name,
      email,
      phone,
      isLoggedIn: true,
      savedAddresses: ['Nairobi, Kilimani, Rose Avenue, Apt 4B']
    };
    saveUser(newUser);
    showToast(`Account created successfully! Welcome, ${name}.`, 'success');
    setView('home');
  };

  const logoutUser = () => {
    const name = currentUser.name || 'User';
    saveUser({
      id: '',
      name: '',
      email: '',
      isLoggedIn: false,
      savedAddresses: []
    });
    showToast(`Logged out. Good bye, ${name}!`, 'info');
    setView('home');
  };

  // Orders Management
  const createOrder = (customerInfo: CustomerInfo, deliveryMethod: 'home_delivery' | 'pickup_station'): Order => {
    // Calculations
    const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const deliveryFee = deliveryMethod === 'home_delivery' ? 350 : 0;
    
    // 10% discount for orders above 15,000 Ksh, or 5% for general
    const discount = totalAmount > 15000 ? Math.round(totalAmount * 0.1) : Math.round(totalAmount * 0.05);
    const vat = Math.round((totalAmount - discount) * 0.16); // 16% standard VAT
    const grandTotal = totalAmount + deliveryFee - discount + vat;

    const orderId = generateRef('', 6); // Short numeric code e.g. "100295" but let's make it random digits
    const numericId = Math.floor(100000 + Math.random() * 900000).toString();
    const orderNumber = `SE-${numericId}`;

    const estimateDays = deliveryMethod === 'home_delivery' ? 2 : 3;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + estimateDays);

    const newOrder: Order = {
      id: `ord-${numericId}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      totalAmount,
      deliveryFee,
      discount,
      vat,
      grandTotal,
      customerInfo,
      deliveryMethod,
      paymentMethod: 'paybill',
      paymentStatus: 'pending',
      deliveryStatus: 'placed',
      trackingNumber: generateRef('TRK-', 8),
      estimatedDeliveryDate: estDate.toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }),
      deliveryAgent: {
        name: ['Peter Njoroge', 'Kamau Gitau', 'Kelvin Mwangi', 'John Mutua'][Math.floor(Math.random() * 4)],
        phone: '07' + Math.floor(10000000 + Math.random() * 90000000).toString(),
        vehicle: ['KCG 104Z (Motorcycle)', 'KDB 782P (Toyota Vitz)', 'KDD 409A (Motorcycle)', 'KCM 890F (Toyota Probox)'][Math.floor(Math.random() * 4)]
      }
    };

    // Add to state (but wait for payment confirmation before marking completed)
    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    
    return newOrder;
  };

  const finalizeOrderPayment = (orderId: string, reference: string) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          paymentStatus: 'completed' as const,
          deliveryStatus: 'confirmed' as const,
          transactionReference: reference
        };
      }
      return order;
    });

    saveOrders(updatedOrders);
    
    // Update local cart state to empty
    saveCart([]);

    // Set references for Receipt and Tracking
    const activeOrder = updatedOrders.find((o) => o.id === orderId) || null;
    setCurrentOrderForReceipt(activeOrder);
    setCurrentOrderForTracking(activeOrder);
  };

  const setReceiptOrder = (order: Order | null) => {
    setCurrentOrderForReceipt(order);
    if (order) setView('receipt');
  };

  const setTrackingOrder = (order: Order | null) => {
    setCurrentOrderForTracking(order);
    if (order) setView('track-delivery');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        currentProductId,
        cart,
        wishlist,
        currentUser,
        orders,
        toasts,
        currentOrderForReceipt,
        currentOrderForTracking,
        searchQuery,
        selectedCategory,
        setView,
        setProductId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        loginUser,
        registerUser,
        logoutUser,
        createOrder,
        finalizeOrderPayment,
        setReceiptOrder,
        setTrackingOrder,
        setSearchQuery,
        setSelectedCategory,
        showToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
