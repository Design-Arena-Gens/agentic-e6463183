'use client'

import { useEffect, useState } from 'react'

interface AutomationControlProps {
  active: boolean
  onToggle: (active: boolean) => void
  products: any[]
  onUpdateStatus: (id: number, status: string) => void
}

export default function AutomationControl({
  active,
  onToggle,
  products,
  onUpdateStatus
}: AutomationControlProps) {
  const [stats, setStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0
  })
  const [interval, setIntervalValue] = useState(5)

  useEffect(() => {
    const pending = products.filter(p => p.status === 'pending').length
    const processing = products.filter(p => p.status === 'processing').length
    const completed = products.filter(p => p.status === 'completed').length
    const failed = products.filter(p => p.status === 'failed').length
    setStats({ pending, processing, completed, failed })
  }, [products])

  useEffect(() => {
    if (!active) return

    const timer = setInterval(() => {
      const pendingProducts = products.filter(p => p.status === 'pending')
      if (pendingProducts.length === 0) return

      const product = pendingProducts[0]
      onUpdateStatus(product.id, 'processing')

      // Simulate API call to Indiamart
      setTimeout(() => {
        // Random success/failure for simulation
        const success = Math.random() > 0.1
        onUpdateStatus(product.id, success ? 'completed' : 'failed')
      }, 3000)
    }, interval * 1000)

    return () => clearInterval(timer)
  }, [active, products, interval, onUpdateStatus])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-3xl mr-3">⚙️</span>
        Automation Control
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">Status</span>
          <button
            onClick={() => onToggle(!active)}
            className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
              active ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                active ? 'translate-x-11' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="text-center">
          <div className={`text-2xl font-bold ${active ? 'text-green-600' : 'text-gray-400'}`}>
            {active ? '🟢 ACTIVE' : '🔴 INACTIVE'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Processing Interval (seconds)
          </label>
          <input
            type="number"
            value={interval}
            onChange={(e) => setIntervalValue(Number(e.target.value))}
            min="1"
            max="60"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">⏳ Pending</span>
              <span className="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full">
                {stats.pending}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🔄 Processing</span>
              <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
                {stats.processing}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">✅ Completed</span>
              <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full">
                {stats.completed}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">❌ Failed</span>
              <span className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full">
                {stats.failed}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-sm text-indigo-800">
            <strong>Auto Mode:</strong> When enabled, products will be automatically processed
            and added to Indiamart at the specified interval.
          </p>
        </div>
      </div>
    </div>
  )
}
