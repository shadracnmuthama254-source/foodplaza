
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const user: User = {
      id: role === UserRole.VENDOR ? 'v_123' : 'c_123',
      name: email.split('@')[0],
      email: email,
      role: role,
      vendorName: role === UserRole.VENDOR ? 'My Kenyan Kitchen' : undefined
    };
    onLogin(user);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to FoodPlaza</h2>
          <p className="mt-2 text-sm text-gray-600">Welcome back! Please enter your details.</p>
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8">
          <button 
            onClick={() => setRole(UserRole.CUSTOMER)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === UserRole.CUSTOMER ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Customer
          </button>
          <button 
            onClick={() => setRole(UserRole.VENDOR)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === UserRole.VENDOR ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Vendor
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="e.g., baraka@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-green-600 rounded mr-2" />
              Remember me
            </label>
            <a href="#" className="font-semibold text-green-600 hover:text-green-500">Forgot password?</a>
          </div>
          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-100"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button onClick={onRegister} className="font-bold text-green-600 hover:text-green-500 underline underline-offset-4">
            Register for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
