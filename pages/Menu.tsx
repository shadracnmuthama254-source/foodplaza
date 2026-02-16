
import React, { useState } from 'react';
import { Product } from '../types';

interface MenuProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Menu: React.FC<MenuProps> = ({ products, onAddToCart }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Full Menu</h1>
        <p className="text-gray-600">Explore authentic Kenyan delicacies from different regions.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
              filter === cat 
                ? 'bg-green-600 text-white shadow-green-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-all">
            <div className="relative aspect-video overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-5 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{product.name}</h3>
                <span className="text-green-600 font-bold">Ksh {product.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <i className="fas fa-utensils text-5xl text-gray-200 mb-4"></i>
          <p className="text-gray-500 text-xl font-medium">No dishes found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
