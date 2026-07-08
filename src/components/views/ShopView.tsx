/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';
import { mockProducts } from '../../data/mockProducts';
import { SlidersHorizontal, Search, RotateCcw, LayoutGrid, ChevronRight, Home, Info } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useShop();

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(120000);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Trigger skeleton loading on filter/sort changes to enrich UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450000 / 1000); // 450ms smooth transition
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedBrand, priceRange, sortBy, searchQuery]);

  // Dynamically extract available brands
  const brands = useMemo(() => {
    const list = new Set<string>();
    mockProducts.forEach((p) => {
      if (p.brand) list.add(p.brand);
    });
    return ['all', ...Array.from(list)];
  }, []);

  // Filter and sort core logic
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Brand filter
    if (selectedBrand && selectedBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price range filter
    result = result.filter((p) => p.price <= priceRange);

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCategory, selectedBrand, searchQuery, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange(120000);
    setSortBy('popular');
  };

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Kitchen', 'Fitness & Sports', 'Beauty & Care'];

  return (
    <div id="shop-page-wrapper" className="space-y-6 pb-16">
      
      {/* Breadcrumbs Navigation */}
      <nav id="shop-breadcrumbs" className="flex items-center gap-1.5 text-xs text-gray-400 font-medium py-1">
        <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer">
          <Home className="h-3 w-3" /> Home
        </span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900">Shop Catalog</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-semibold">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Grid Layout (Filters Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filters Panel (lg:col-span-3) */}
        <aside id="shop-filters-sidebar" className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 space-y-6 shadow-sm sticky top-20">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2">
              <SlidersHorizontal className="h-4.5 w-4.5 text-blue-600" />
              <span>Catalog Filters</span>
            </h3>
            <button
              id="reset-filters-btn"
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors focus:outline-none"
              title="Reset Filters"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* Search Sub-bar inside panel */}
          <div className="space-y-2">
            <label htmlFor="sidebar-search-input" className="text-xs font-bold text-gray-900 uppercase tracking-wider">Search Key</label>
            <div className="relative">
              <input
                id="sidebar-search-input"
                type="text"
                placeholder="Type keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-1.5 pl-9 pr-3 text-xs text-gray-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          {/* Categories List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Categories</h4>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`sidebar-category-${cat.toLowerCase().replace(' & ', '-')}`}
                  onClick={() => setSelectedCategory(cat === 'all' ? 'all' : cat)}
                  className={`text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-colors focus:outline-none ${
                    (selectedCategory.toLowerCase() === cat.toLowerCase())
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat === 'all' ? 'All Curated Items' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brands list */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select Brand</h4>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1 select-none scrollbar-thin">
              {brands.map((brand) => (
                <button
                  key={brand}
                  id={`sidebar-brand-${brand.toLowerCase()}`}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-colors focus:outline-none ${
                    selectedBrand === brand ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {brand === 'all' ? 'All Premium Brands' : brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-baseline">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Max Budget</h4>
              <span className="text-xs font-bold text-blue-600">Ksh {priceRange.toLocaleString()}</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min="500"
              max="120000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-gray-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>Ksh 500</span>
              <span>Ksh 120,000</span>
            </div>
          </div>

        </aside>

        {/* Products Grid (lg:col-span-9) */}
        <main id="shop-products-grid-section" className="lg:col-span-9 space-y-6">
          
          {/* Top Sort Panel bar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">
              We found <span className="text-gray-950 font-bold">{filteredProducts.length}</span> premium items matching your criteria.
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label htmlFor="shop-sort-select" className="text-xs font-bold text-gray-600 flex-shrink-0">Sort By:</label>
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white py-1.5 px-3 text-xs font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-44"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Skeleton Loaders Grid / Actual Products Grid */}
          {isLoading ? (
            <div id="loading-skeletons" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-white space-y-4 animate-pulse">
                  <div className="aspect-[4/3] w-full bg-gray-100 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 w-24 bg-gray-100 rounded" />
                    <div className="h-8 w-8 bg-gray-100 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div id="active-products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // Beautiful Empty State
            <div id="empty-shop-state" className="border border-gray-100 rounded-3xl bg-white p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <LayoutGrid className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-950">No products match your filters</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find any premium matches for your current parameters. Try adjusting your search query, choosing another brand, or resetting the filters.
              </p>
              <button
                id="empty-shop-reset-btn"
                onClick={handleResetFilters}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none"
              >
                Clear All Filter Parameters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
