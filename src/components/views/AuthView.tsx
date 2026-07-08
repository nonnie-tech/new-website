/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, KeyRound, Mail, User, Phone, CheckSquare, ShieldCheck } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { cart, loginUser, registerUser, setView, showToast } = useShop();

  // Active sub-tab: 'login' | 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    loginUser(loginEmail, loginPassword);
    
    // Smart Routing forwarding
    if (cart.length > 0) {
      setView('checkout');
      showToast('Welcome back! Forwarding you directly to paybill checkout.', 'success');
    } else {
      setView('dashboard');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) return;

    registerUser(regName, regEmail, regPhone, regPassword);

    // Smart Routing forwarding
    if (cart.length > 0) {
      setView('checkout');
      showToast('Account created successfully! Directing to checkout.', 'success');
    } else {
      setView('dashboard');
    }
  };

  const handleGoogleSimulate = () => {
    loginUser('google.user@gmail.com', 'googlepass');
    showToast('Authenticated successfully with Google Credentials!', 'success');
    
    if (cart.length > 0) {
      setView('checkout');
    } else {
      setView('dashboard');
    }
  };

  return (
    <div id="auth-page-wrapper" className="max-w-md mx-auto py-8">
      
      {/* Central Login Card */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl">
        
        {/* Toggle headers */}
        <div className="flex border-b border-gray-50 text-xs font-bold font-sans">
          <button
            id="auth-tab-login"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-center transition-colors focus:outline-none ${
              activeTab === 'login' ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-extrabold' : 'bg-gray-50/50 text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign In to ShopEase
          </button>
          
          <button
            id="auth-tab-register"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-4 text-center transition-colors focus:outline-none ${
              activeTab === 'register' ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-extrabold' : 'bg-gray-50/50 text-gray-400 hover:text-gray-600'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Form Body wrapper */}
        <div className="p-6 sm:p-8 text-left space-y-6">
          
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-extrabold text-gray-950 tracking-tight">
              {activeTab === 'login' ? 'Welcome Back!' : 'Join ShopEase'}
            </h2>
            <p className="text-xs text-gray-500 font-light max-w-[240px] mx-auto leading-relaxed">
              {activeTab === 'login'
                ? 'Sign in to access your saved receipts, track active orders, and speed up checks.'
                : 'Register a premium membership account to save delivery locations instantly.'}
            </p>
          </div>

          {/* Core Sign in form */}
          {activeTab === 'login' ? (
            <form id="auth-login-form" onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="text-xs font-bold text-gray-900">Email Address</label>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. jak@example.com"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="login-pass" className="text-xs font-bold text-gray-900">Secret Password</label>
                  <span className="text-[10px] text-gray-400 hover:text-blue-600 cursor-pointer font-medium">Forgot Password?</span>
                </div>
                <div className="relative">
                  <input
                    id="login-pass"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-md focus:outline-none transition-colors"
              >
                Sign In to Account
              </button>
            </form>
          ) : (
            
            // Core Registration form
            <form id="auth-register-form" onSubmit={handleRegisterSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label htmlFor="reg-name" className="text-xs font-bold text-gray-900">Full Name</label>
                <div className="relative">
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Dr. Jak Mbugua"
                  />
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-email" className="text-xs font-bold text-gray-900">Email Address</label>
                <div className="relative">
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. jak@gmail.com"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-phone" className="text-xs font-bold text-gray-900">M-Pesa Phone Number</label>
                <div className="relative">
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 0722 000 111"
                  />
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-pass" className="text-xs font-bold text-gray-900">Secret Password</label>
                <div className="relative">
                  <input
                    id="reg-pass"
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-md focus:outline-none transition-colors"
              >
                Register Account
              </button>
            </form>
          )}

          {/* Divider lines */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100" />
            <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider bg-white px-2">Or Continue With</span>
            <div className="flex-grow border-t border-gray-100" />
          </div>

          {/* Simulated Google Button */}
          <button
            id="auth-google-sim-btn"
            onClick={handleGoogleSimulate}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 focus:outline-none transition-all"
          >
            {/* Google icon simple visual representation */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Sign In with Google</span>
          </button>

          {/* Secure assurance badge */}
          <div className="flex items-center gap-2 justify-center pt-2 text-[10px] text-gray-400 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>256-Bit SSL Payment Credentials Encryption</span>
          </div>

        </div>

      </div>

    </div>
  );
};
