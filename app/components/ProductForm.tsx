'use client'

import { useState } from 'react'

interface ProductFormProps {
  onAddProduct: (product: any) => void
}

export default function ProductForm({ onAddProduct }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    description: '',
    moq: '',
    brand: '',
    image: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProduct(formData)
    setFormData({
      name: '',
      category: '',
      price: '',
      unit: '',
      description: '',
      moq: '',
      brand: '',
      image: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-3xl mr-3">📦</span>
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Machinery">Machinery</option>
              <option value="Textiles">Textiles</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Building Materials">Building Materials</option>
              <option value="Automotive">Automotive</option>
              <option value="Food & Beverages">Food & Beverages</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (INR) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Piece, Kg, Liter, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              MOQ (Minimum Order Quantity)
            </label>
            <input
              type="text"
              name="moq"
              value={formData.moq}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="e.g., 10 pieces"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Brand name"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Enter product description..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
        >
          ➕ Add Product to Queue
        </button>
      </form>
    </div>
  )
}
