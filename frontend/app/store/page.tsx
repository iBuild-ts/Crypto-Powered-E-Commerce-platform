'use client'

import Link from 'next/link'
import { Plus, ArrowLeft } from 'lucide-react'
import { useWallet } from '@/lib/WalletContext'

export default function StoresPage() {
  const { isConnected } = useWallet()

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-slate-400 mb-6">You need to connect your wallet to view your stores.</p>
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
      <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white">Your Stores</h1>
          <p className="text-slate-400 mt-2">Manage all your stores in one place</p>
        </div>
        <Link
          href="/store/create"
          className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          New Store
        </Link>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Tech Store', products: 24, sales: '$5,200', status: 'Active' },
          { name: 'Fashion Hub', products: 18, sales: '$4,100', status: 'Active' },
          { name: 'Art Gallery', products: 12, sales: '$3,150', status: 'Draft' },
        ].map((store, i) => (
          <Link
            key={i}
            href={`/store/${store.name.toLowerCase().replace(' ', '-')}`}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-700/50 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{store.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                store.status === 'Active'
                  ? 'bg-green-400/20 text-green-400'
                  : 'bg-yellow-400/20 text-yellow-400'
              }`}>
                {store.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4">{store.products} products • {store.sales} in sales</p>
            <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition font-semibold">
              Manage Store
            </button>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {false && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No stores yet</h2>
          <p className="text-slate-400 mb-6">Create your first store to get started</p>
          <Link
            href="/store/create"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
          >
            Create Your First Store
          </Link>
        </div>
      )}
    </div>
  )
}
