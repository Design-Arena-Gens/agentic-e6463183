'use client'

import { useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import AutomationControl from './components/AutomationControl'
import BulkUpload from './components/BulkUpload'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [automationActive, setAutomationActive] = useState(false)

  const addProduct = (product: any) => {
    setProducts([...products, { ...product, id: Date.now(), status: 'pending' }])
  }

  const addBulkProducts = (bulkProducts: any[]) => {
    const newProducts = bulkProducts.map((p, i) => ({
      ...p,
      id: Date.now() + i,
      status: 'pending'
    }))
    setProducts([...products, ...newProducts])
  }

  const updateProductStatus = (id: number, status: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status } : p))
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-3">
            🚀 Indiamart Automation System
          </h1>
          <p className="text-gray-600 text-lg">
            Automated Product Listing & Management Platform
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ProductForm onAddProduct={addProduct} />
            <BulkUpload onBulkUpload={addBulkProducts} />
          </div>
          <div>
            <AutomationControl
              active={automationActive}
              onToggle={setAutomationActive}
              products={products}
              onUpdateStatus={updateProductStatus}
            />
          </div>
        </div>

        <ProductList
          products={products}
          onUpdateStatus={updateProductStatus}
          onDelete={deleteProduct}
        />
      </div>
    </main>
  )
}
