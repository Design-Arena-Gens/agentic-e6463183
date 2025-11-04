'use client'

import { useState } from 'react'
import Papa from 'papaparse'

interface BulkUploadProps {
  onBulkUpload: (products: any[]) => void
}

export default function BulkUpload({ onBulkUpload }: BulkUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const products = results.data.filter((row: any) => row.name)
        onBulkUpload(products)
        setUploading(false)
        e.target.value = ''
      },
      error: () => {
        alert('Error parsing CSV file')
        setUploading(false)
      }
    })
  }

  const downloadTemplate = () => {
    const template = `name,category,price,unit,description,moq,brand,image
Sample Product 1,Electronics,5000,Piece,High quality electronic product,10,BrandX,https://example.com/image1.jpg
Sample Product 2,Machinery,25000,Unit,Industrial machinery,5,BrandY,https://example.com/image2.jpg`

    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product_template.csv'
    a.click()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-3xl mr-3">📊</span>
        Bulk Upload Products
      </h2>
      <div className="space-y-4">
        <p className="text-gray-600">
          Upload a CSV file with multiple products to add them all at once.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadTemplate}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            📥 Download CSV Template
          </button>
          <label className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg cursor-pointer text-center">
            {uploading ? '⏳ Processing...' : '📤 Upload CSV File'}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
