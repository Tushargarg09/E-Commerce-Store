import React from 'react';
import { Star, ShoppingCart, Eye, Plus, Minus } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export function ProductCard({ product, viewMode }) {
  const { state, dispatch } = useEcommerce();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (quantityInCart > 1) {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: product.id, quantity: quantityInCart - 1 } });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
    }
  };

  
  const cartItem = state.cart.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />);
    }

    return stars;
  };

  const renderCartControls = () => {
    if (!product.inStock) {
      return (
        <button
          disabled
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
        >
          Out of Stock
        </button>
      );
    }

    if (quantityInCart === 0) {
      return (
        <button
          onClick={handleAddToCart}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
          {quantityInCart}
        </span>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderCartControlsCompact = () => {
    if (!product.inStock) {
      return (
        <button
          disabled
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
        >
          Out of Stock
        </button>
      );
    }

    if (quantityInCart === 0) {
      return (
        <button
          onClick={handleAddToCart}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-1">
        <button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[1.5rem] text-center">
          {quantityInCart}
        </span>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all">
        <div className="flex space-x-6">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="h-32 w-32 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.inStock 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {renderCartControls()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Rs.{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">Rs.{product.originalPrice}</span>
            )}
          </div>
          {renderCartControlsCompact()}
        </div>
      </div>
    </div>
  );
}