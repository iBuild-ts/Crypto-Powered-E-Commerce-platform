'use client'

import Link from 'next/link'
import { Plus, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react'
import { useWallet } from '@/lib/WalletContext'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { isConnected } = useWallet()
  const router = useRouter()

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-slate-400 mb-6">You need to connect your wallet to access the dashboard.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold">
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">Welcome back! Here's your store overview.</p>
        </div>
        <Link
          href="/store/create"
          className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          New Store
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: '$12,450', color: 'text-orange-400' },
          { icon: ShoppingBag, label: 'Total Orders', value: '248', color: 'text-blue-400' },
          { icon: TrendingUp, label: 'Active Stores', value: '3', color: 'text-green-400' },
          { icon: DollarSign, label: 'Avg Order Value', value: '$50.20', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-700/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon size={40} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Stores Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your Stores</h2>
        <div className="space-y-4">
          {[
            { name: 'Tech Store', products: 24, sales: '$5,200', status: 'Active' },
            { name: 'Fashion Hub', products: 18, sales: '$4,100', status: 'Active' },
            { name: 'Art Gallery', products: 12, sales: '$3,150', status: 'Draft' },
          ].map((store, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
              <div>
                <h3 className="text-lg font-semibold text-white">{store.name}</h3>
                <p className="text-slate-400 text-sm">{store.products} products • {store.sales} in sales</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  store.status === 'Active'
                    ? 'bg-green-400/20 text-green-400'
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {store.status}
                </span>
                <Link
                  href={`/store/${store.name.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition font-semibold"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
