import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { products } from '../data/products';

const initialState = {
  products,
  filteredProducts: products,
  cart: [],
  searchQuery: '',
  selectedCategory: 'All',
  viewMode: 'grid',
  sortOption: 'name',
  priceRange: [0, 1000],
  isCartOpen: false,
  isCheckoutOpen: false,
};

const EcommerceContext = createContext(null);

function ecommerceReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_SORT_OPTION':
      return { ...state, sortOption: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'TOGGLE_CHECKOUT':
      return { ...state, isCheckoutOpen: !state.isCheckoutOpen };
    case 'FILTER_PRODUCTS':
      let filtered = [...state.products];
      
      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()))
        );
      }
      
      // Filter by category
      if (state.selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }
      
      // Filter by price range
      filtered = filtered.filter(product => 
        product.price >= state.priceRange[0] && product.price <= state.priceRange[1]
      );
      
      // Sort products
      switch (state.sortOption) {
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Keep original order for newest
          break;
      }
      
      return { ...state, filteredProducts: filtered };
    default:
      return state;
  }
}

export function EcommerceProvider({ children }) {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FILTER_PRODUCTS' });
  }, [state.searchQuery, state.selectedCategory, state.sortOption, state.priceRange]);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
}