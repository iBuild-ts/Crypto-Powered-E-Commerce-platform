'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  date: string
  items: number
}

export default function OrdersPage() {
  const params = useParams()
  const slug = params.slug as string
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 99.99,
      status: 'completed',
      date: '2024-12-13',
      items: 2,
    },
    {
      id: '2',
      orderNumber: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 49.99,
      status: 'processing',
      date: '2024-12-12',
      items: 1,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-400/20 text-green-400'
      case 'processing':
        return 'bg-blue-400/20 text-blue-400'
      case 'pending':
        return 'bg-yellow-400/20 text-yellow-400'
      case 'cancelled':
        return 'bg-red-400/20 text-red-400'
      default:
        return 'bg-slate-400/20 text-slate-400'
    }
  }

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href={`/store/${slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Store
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-slate-400 mt-2">Manage customer orders and track shipments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Orders', value: orders.length.toString(), color: 'text-blue-400' },
          { label: 'Completed', value: orders.filter(o => o.status === 'completed').length.toString(), color: 'text-green-400' },
          { label: 'Processing', value: orders.filter(o => o.status === 'processing').length.toString(), color: 'text-yellow-400' },
          { label: 'Total Revenue', value: `$${orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}`, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-4 text-left text-white font-semibold">Order #</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Items</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 text-white font-semibold">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-300">{order.email}</td>
                  <td className="px-6 py-4 text-white font-semibold">${order.amount}</td>
                  <td className="px-6 py-4 text-slate-300">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
