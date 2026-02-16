
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = 150; // Flat delivery fee
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 inline-block">
          <i className="fas fa-shopping-basket text-6xl text-gray-200 mb-6"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Sounds like a good time to start ordering some food!</p>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
            onClick={() => window.location.hash = '#menu'} // Note: Simplified for the sake of demo
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">Your Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-6 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Sold by {item.vendorName}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-600"
                    >
                      <i className="fas fa-minus text-xs"></i>
                    </button>
                    <span className="font-bold text-gray-800 w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-gray-600"
                    >
                      <i className="fas fa-plus text-xs"></i>
                    </button>
                  </div>
                  <span className="font-bold text-green-700">Ksh {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Ksh {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>Ksh {delivery.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-100 w-full"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>Ksh {total.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-100"
            >
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-gray-400 mt-6">
              Prices inclusive of VAT where applicable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
