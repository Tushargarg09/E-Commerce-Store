import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';

export function ProductGrid() {
  const { state } = useEcommerce();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
          <p className="text-gray-600 dark:text-gray-300">Showing {state.filteredProducts.length} products</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex">
        <div className="hidden lg:block w-64 mr-8">
          <FilterSidebar isOpen={true} onClose={() => {}} />
        </div>

        
        <FilterSidebar isOpen={showFilters} onClose={() => setShowFilters(false)} />

        
        <div className="flex-1">
          {state.filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              state.viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {state.filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={state.viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}