
import React, { useState } from 'react';
import { User, Product } from '../types';

interface AddProductProps {
  user: User;
  onProductAdded: (p: Product) => void;
  onCancel: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ user, onProductAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Main Dish',
    image: ''
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image || 'https://picsum.photos/400/300?random=' + Math.random(),
      category: formData.category,
      vendorId: user.id,
      vendorName: user.vendorName || user.name
    };
    onProductAdded(newProduct);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <button onClick={onCancel} className="mr-4 text-gray-400 hover:text-gray-600">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Dish to Your Menu</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  placeholder="e.g., Authentic Goat Biryani"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Ksh)</label>
                <input 
                  required
                  type="number" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  placeholder="e.g., 450"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Main Dish</option>
                  <option>Meat</option>
                  <option>Rice</option>
                  <option>Vegetarian</option>
                  <option>Seafood</option>
                  <option>Snacks</option>
                  <option>Desserts</option>
                  <option>Drinks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required
                rows={4} 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                placeholder="Tell customers what makes this dish special..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-100"
              >
                Publish Dish
              </button>
              <button 
                type="button"
                onClick={onCancel}
                className="px-8 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Product Image</h2>
            <div className="aspect-[4/3] w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden mb-6 relative group">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt text-4xl text-gray-300 mb-2"></i>
                  <span className="text-sm text-gray-400">Upload food photo</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleImageChange}
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              <i className="fas fa-info-circle mr-1"></i>
              Please upload a high-quality photo of the food. Good lighting and clear plating help increase sales. Max size 5MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
