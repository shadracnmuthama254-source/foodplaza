
import React from 'react';
import { User, Product } from '../types';

interface VendorDashboardProps {
  user: User;
  products: Product[];
  onAddProduct: () => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ user, products, onAddProduct }) => {
  const totalSales = products.length * 4500; // Mock calculation
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, <span className="text-green-700 font-semibold">{user.vendorName || user.name}</span></p>
        </div>
        <button 
          onClick={onAddProduct}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center shadow-lg"
        >
          <i className="fas fa-plus mr-2"></i> Add New Dish
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Dishes', value: products.length, icon: 'fa-utensils', color: 'blue' },
          { label: 'Pending Orders', value: '12', icon: 'fa-clock', color: 'orange' },
          { label: 'Today\'s Sales', value: 'Ksh 15,200', icon: 'fa-chart-line', color: 'green' },
          { label: 'Total Revenue', value: `Ksh ${totalSales.toLocaleString()}`, icon: 'fa-wallet', color: 'purple' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${stat.color}-50 text-${stat.color}-600`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Manage Your Menu</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Product</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Price</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
                    <div>
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">{product.category}</span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">Ksh {product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-green-600"><i className="fas fa-edit"></i></button>
                    <button className="p-2 text-gray-400 hover:text-red-500"><i className="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                  <p className="mb-4">You haven't added any products yet.</p>
                  <button onClick={onAddProduct} className="text-green-600 font-bold hover:underline">Add your first dish</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
