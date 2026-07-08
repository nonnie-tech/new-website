/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldAlert } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  tagline: string;
  description: string;
  buttonText: string;
  categoryLink: string;
  bgGradient: string;
  imageUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Precision Tech Upgrade',
    tagline: 'SMART LIFE SOLUTIONS',
    description: 'Experience pure innovation. Grab the premium AeroPulse Active Smartwatch, SyncAudio Pro, and more flagship-grade electronics with up to 30% discount.',
    buttonText: 'Shop Electronics',
    categoryLink: 'Electronics',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Minimal Streetwear & Co.',
    tagline: 'ELEVATED COMFORTWEAR',
    description: 'Refined casual essentials tailored for everyday drapes. Explore organic heavyweight tees, genuine leather jackets, and durable commuter backpacks.',
    buttonText: 'Shop Fashion',
    categoryLink: 'Fashion',
    bgGradient: 'from-amber-950 via-stone-900 to-neutral-950',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Mid-Century Nordic Space',
    tagline: 'HOMES & DUSTY MATTES',
    description: 'Sculptural dining chairs, organic terracotta pots, and barista-grade espresso brewers. Infuse elegant architectural details into your living spaces.',
    buttonText: 'Explore Home & Kitchen',
    categoryLink: 'Home & Kitchen',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'
  }
];

export const BannerCarousel: React.FC = () => {
  const { setView, setSelectedCategory } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleActionClick = (category: string) => {
    setSelectedCategory(category);
    setView('shop');
  };

  const currentSlide = slides[currentIndex];

  return (
    <div id="hero-banner-carousel" className="relative w-full overflow-hidden bg-slate-950 rounded-3xl min-h-[380px] sm:min-h-[460px] flex items-center">
      
      {/* Background and details with slide animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgGradient}`}
        />
      </AnimatePresence>

      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-8 sm:px-12 py-12 w-full z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Texts */}
        <div className="md:col-span-7 text-left text-white space-y-4">
          <motion.span
            key={`tag-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-bold tracking-widest text-blue-400 uppercase"
          >
            {currentSlide.tagline}
          </motion.span>
          
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
          >
            {currentSlide.title}
          </motion.h1>

          <motion.p
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-light"
          >
            {currentSlide.description}
          </motion.p>

          <motion.div
            key={`btn-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <button
              id={`hero-carousel-action-${currentSlide.id}`}
              onClick={() => handleActionClick(currentSlide.categoryLink)}
              className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Thumbnail Image Section */}
        <div className="hidden md:flex md:col-span-5 justify-center items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -1 }}
              transition={{ duration: 0.5 }}
              className="relative h-64 w-64 lg:h-80 lg:w-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
            >
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Manual Slide Controls arrows */}
      <button
        id="hero-carousel-prev"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        id="hero-carousel-next"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Index Progress Bullets */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            id={`carousel-bullet-${slide.id}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};
