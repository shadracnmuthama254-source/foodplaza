
import React from 'react';
import { Page, User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentPage, setCurrentPage, cartCount, onLogout }) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-green-600 text-white p-2 rounded-lg mr-2">
              <i className="fas fa-utensils text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-green-700 tracking-tight">FoodPlaza</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-500'} transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('menu')}
              className={`${currentPage === 'menu' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-500'} transition-colors`}
            >
              Menu
            </button>
            {user?.role === UserRole.VENDOR && (
              <button 
                onClick={() => setCurrentPage('vendor_dashboard')}
                className={`${currentPage === 'vendor_dashboard' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-500'} transition-colors`}
              >
                My Shop
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-gray-600 hover:text-green-500 transition-colors"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user.name} ({user.role})
                </span>
                <button 
                  onClick={onLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentPage('register')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
