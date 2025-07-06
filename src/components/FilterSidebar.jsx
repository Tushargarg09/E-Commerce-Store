import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { categories } from '../data/products';

export function FilterSidebar({ isOpen, onClose }) {
  const { state, dispatch } = useEcommerce();

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'newest', label: 'Newest' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto">
      <div className="absolute inset-0 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl lg:relative lg:w-full lg:shadow-none border-l border-gray-200 dark:border-gray-700 lg:border-l-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={state.selectedCategory === category}
                      onChange={() => dispatch({ type: 'SET_CATEGORY', payload: category })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Rs.</span>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={state.priceRange[0]}
                    onChange={(e) => dispatch({ 
                      type: 'SET_PRICE_RANGE', 
                      payload: [parseInt(e.target.value), state.priceRange[1]]
                    })}
                    className="flex-1 accent-blue-600"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Rs.1000</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>Rs.{state.priceRange[0]}</span>
                  <span>Rs.{state.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={state.priceRange[1]}
                  onChange={(e) => dispatch({ 
                    type: 'SET_PRICE_RANGE', 
                    payload: [state.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
              <select
                value={state.sortOption}
                onChange={(e) => dispatch({ type: 'SET_SORT_OPTION', payload: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}