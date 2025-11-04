'use client'

interface Product {
  id: number
  name: string
  category: string
  price: string
  unit: string
  description: string
  moq: string
  brand: string
  image: string
  status: string
}

interface ProductListProps {
  products: Product[]
  onUpdateStatus: (id: number, status: string) => void
  onDelete: (id: number) => void
}

export default function ProductList({ products, onUpdateStatus, onDelete }: ProductListProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    }
    const icons = {
      pending: '⏳',
      processing: '🔄',
      completed: '✅',
      failed: '❌'
    }
    return (
      <span className={`${badges[status as keyof typeof badges]} px-3 py-1 rounded-full text-sm font-semibold`}>
        {icons[status as keyof typeof icons]} {status.toUpperCase()}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-3xl mr-3">📋</span>
        Product Queue ({products.length})
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-lg">No products in queue</p>
          <p className="text-gray-400 text-sm mt-2">Add products using the form above or bulk upload</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                          📦
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        {product.moq && (
                          <div className="text-xs text-gray-500">MOQ: {product.moq}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">{product.category}</td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-gray-800">₹{product.price}</div>
                    {product.unit && (
                      <div className="text-xs text-gray-500">per {product.unit}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{product.brand || '-'}</td>
                  <td className="px-4 py-4">{getStatusBadge(product.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      {product.status === 'failed' && (
                        <button
                          onClick={() => onUpdateStatus(product.id, 'pending')}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                          title="Retry"
                        >
                          🔄
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
