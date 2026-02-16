
import React from 'react';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  onSeeMenu: () => void;
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, onSeeMenu, onAddToCart }) => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" 
          alt="Kenyan Food Hero"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Karibu FoodPlaza!
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Order authentic Kenyan meals from local vendors and enjoy fresh delivery to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onSeeMenu}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-bold transition-all shadow-lg hover:scale-105"
            >
              Order Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-full text-lg font-bold transition-all shadow-lg hover:scale-105">
              How it Works
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Dishes</h2>
            <p className="text-gray-600">Hand-picked Kenyan favorites from our top vendors.</p>
          </div>
          <button 
            onClick={onSeeMenu}
            className="text-green-600 font-semibold hover:underline flex items-center"
          >
            View full menu <i className="fas fa-chevron-right ml-2 text-sm"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                  Ksh {product.price.toLocaleString()}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">{product.category}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center text-xs text-gray-500 mb-6">
                  <i className="fas fa-store mr-1 text-green-500"></i>
                  <span>Sold by <span className="font-semibold text-gray-700">{product.vendorName}</span></span>
                </div>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-green-50 text-green-700 hover:bg-green-600 hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why FoodPlaza?</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: 'fa-truck-fast', title: 'Lightning Fast', desc: 'Average delivery time of 30 minutes in all major towns.' },
              { icon: 'fa-thumbs-up', title: 'Verified Quality', desc: 'We only partner with vendors who meet our strict hygiene standards.' },
              { icon: 'fa-leaf', title: 'Fresh Ingredients', desc: 'Direct from farm to table, ensuring you get the most nutrients.' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <i className={`fas ${item.icon} text-3xl text-green-600`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
