
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onComplete: () => void;
  onBackToMenu: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onComplete, onBackToMenu }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 150;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    onComplete();
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-green-50">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl animate-bounce">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-500 mb-8">
            Asante sana for your order! Your food is being prepared by our local vendors and will reach you shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">Order ID: #FP-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="text-sm text-gray-600">Estimated Delivery: 35-45 mins</p>
          </div>
          <button 
            onClick={onBackToMenu}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Complete Your Order</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Doe" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (M-Pesa)</label>
              <input required type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="0712 345 678" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea required rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Street name, Apartment name, Floor..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City/Town</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kisumu</option>
                <option>Nakuru</option>
                <option>Eldoret</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-green-200 bg-green-50 rounded-xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-green-600 focus:ring-green-500" />
                <div className="ml-4">
                  <span className="block font-bold">M-Pesa</span>
                  <span className="text-xs text-gray-500">Pay now via STK push</span>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="MPesa" className="ml-auto h-6" />
              </label>
              <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-not-allowed opacity-50">
                <input disabled type="radio" name="payment" className="w-4 h-4 text-green-600" />
                <div className="ml-4">
                  <span className="block font-bold">Cash on Delivery</span>
                  <span className="text-xs text-gray-500">Temporarily unavailable</span>
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-green-100"
          >
            Place Order (Ksh {total.toLocaleString()})
          </button>
        </form>

        <div className="bg-gray-50 p-8 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-6">Your Order</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="font-semibold">{item.quantity}x {item.name}</span>
                    <span className="text-gray-600">Ksh {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-gray-400">from {item.vendorName}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Ksh {(total - 150).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>Ksh 150</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2">
              <span>Total</span>
              <span>Ksh {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
