
import React, { useState, useEffect, useCallback } from 'react';
import { Page, User, Product, CartItem, UserRole } from './types';
import { INITIAL_PRODUCTS } from './data/initialData';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorDashboard from './pages/VendorDashboard';
import AddProduct from './pages/AddProduct';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('foodplaza_user');
    const savedProducts = localStorage.getItem('foodplaza_products');
    const savedCart = localStorage.getItem('foodplaza_cart');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodplaza_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('foodplaza_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('foodplaza_user', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('foodplaza_user');
    setCurrentPage('home');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const clearCart = () => setCart([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home products={products.slice(0, 6)} onSeeMenu={() => setCurrentPage('menu')} onAddToCart={addToCart} />;
      case 'menu':
        return <Menu products={products} onAddToCart={addToCart} />;
      case 'cart':
        return <Cart cartItems={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onCheckout={() => setCurrentPage('checkout')} />;
      case 'checkout':
        return <Checkout cartItems={cart} onComplete={clearCart} onBackToMenu={() => setCurrentPage('menu')} />;
      case 'login':
        return <Login onLogin={handleLogin} onRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <Register onRegister={handleLogin} onLogin={() => setCurrentPage('login')} />;
      case 'vendor_dashboard':
        return user?.role === UserRole.VENDOR ? (
          <VendorDashboard 
            user={user} 
            products={products.filter(p => p.vendorId === user.id)} 
            onAddProduct={() => setCurrentPage('add_product')} 
          />
        ) : <Home products={products.slice(0, 6)} onSeeMenu={() => setCurrentPage('menu')} onAddToCart={addToCart} />;
      case 'add_product':
        return user?.role === UserRole.VENDOR ? (
          <AddProduct 
            user={user} 
            onProductAdded={(p) => {
              addProduct(p);
              setCurrentPage('vendor_dashboard');
            }} 
            onCancel={() => setCurrentPage('vendor_dashboard')}
          />
        ) : <Home products={products.slice(0, 6)} onSeeMenu={() => setCurrentPage('menu')} onAddToCart={addToCart} />;
      default:
        return <Home products={products.slice(0, 6)} onSeeMenu={() => setCurrentPage('menu')} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-green-600 text-white p-2 rounded-lg mr-2">
              <i className="fas fa-utensils"></i>
            </div>
            <span className="text-xl font-bold text-white">FoodPlaza</span>
          </div>
          <p className="mb-6 max-w-md mx-auto">Connecting you to the best authentic Kenyan flavors across the country.</p>
          <div className="flex justify-center space-x-6 mb-8 text-xl">
            <a href="#" className="hover:text-green-500"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-green-500"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-green-500"><i className="fab fa-instagram"></i></a>
          </div>
          <p className="text-sm opacity-50">&copy; {new Date().getFullYear()} FoodPlaza Kenya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
