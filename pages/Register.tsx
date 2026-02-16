
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER,
    vendorName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      vendorName: formData.role === UserRole.VENDOR ? formData.vendorName : undefined
    };
    onRegister(user);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fas fa-user-plus"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join the FoodPlaza community today.</p>
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8">
          <button 
            onClick={() => setFormData({...formData, role: UserRole.CUSTOMER})}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${formData.role === UserRole.CUSTOMER ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            I'm a Customer
          </button>
          <button 
            onClick={() => setFormData({...formData, role: UserRole.VENDOR})}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${formData.role === UserRole.VENDOR ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            I'm a Vendor
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Full Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {formData.role === UserRole.VENDOR && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business/Vendor Name</label>
              <input 
                required
                type="text" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="e.g., Mama Grace Catering"
                value={formData.vendorName}
                onChange={e => setFormData({...formData, vendorName: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <p className="text-xs text-gray-500 py-2">
            By signing up, you agree to our <a href="#" className="text-green-600 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 font-semibold hover:underline">Privacy Policy</a>.
          </p>

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-100"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onLogin} className="font-bold text-green-600 hover:text-green-500 underline underline-offset-4">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
