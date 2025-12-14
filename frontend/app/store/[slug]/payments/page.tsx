'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Filter } from 'lucide-react'
import { useState } from 'react'

interface Payment {
  id: string
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed'
  date: string
  customer: string
  txHash: string
}

export default function PaymentsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [payments] = useState<Payment[]>([
    {
      id: '1',
      amount: 99.99,
      currency: 'USDC',
      status: 'completed',
      date: '2024-12-13',
      customer: 'John Doe',
      txHash: '0x123...abc',
    },
    {
      id: '2',
      amount: 49.99,
      currency: 'USDT',
      status: 'completed',
      date: '2024-12-12',
      customer: 'Jane Smith',
      txHash: '0x456...def',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-400/20 text-green-400'
      case 'pending':
        return 'bg-yellow-400/20 text-yellow-400'
      case 'failed':
        return 'bg-red-400/20 text-red-400'
      default:
        return 'bg-slate-400/20 text-slate-400'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href={`/store/${slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Store
      </Link>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments</h1>
          <p className="text-slate-400 mt-2">Track all payments and transactions</p>
        </div>
        <button className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center gap-2 font-semibold">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '$149.98', color: 'text-green-400' },
          { label: 'Completed Payments', value: '2', color: 'text-blue-400' },
          { label: 'Pending Payments', value: '0', color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Currency</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">TX Hash</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 text-slate-300">{payment.date}</td>
                  <td className="px-6 py-4 text-white">{payment.customer}</td>
                  <td className="px-6 py-4 text-white font-semibold">${payment.amount}</td>
                  <td className="px-6 py-4 text-slate-300">{payment.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-orange-400 font-mono text-sm">{payment.txHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No payments yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
