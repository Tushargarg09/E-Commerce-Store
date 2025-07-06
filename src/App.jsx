import React from 'react';
import { EcommerceProvider } from './context/EcommerceContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

function App() {
  return (
    <ThemeProvider>
      <EcommerceProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header />
          <main>
            <ProductGrid />
          </main>
          <CartDrawer />
          <CheckoutModal />
        </div>
      </EcommerceProvider>
    </ThemeProvider>
  );
}

export default App;