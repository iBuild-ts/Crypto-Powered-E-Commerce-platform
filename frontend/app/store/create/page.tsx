'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/lib/WalletContext'
import { ArrowLeft, Loader } from 'lucide-react'
import Link from 'next/link'

export default function CreateStore() {
  const router = useRouter()
  const { account, isConnected } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  })

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-slate-400 mb-6">You need to connect your wallet to create a store.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold">
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Auto-generate slug from name
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-'),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const token = localStorage.getItem('cryptocart_token')
      if (!token) {
        throw new Error('Not authenticated. Please reconnect your wallet.')
      }

      const response = await fetch('http://localhost:5000/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          walletAddress: account,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create store')
      }

      const store = await response.json()
      // Redirect to visual builder instead of store page
      router.push(`/store/${store.slug}/builder`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Store creation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      {/* Form Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Your Store</h1>
        <p className="text-slate-400 mb-8">Set up your crypto-powered e-commerce store in minutes</p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-white font-semibold mb-2">Store Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Awesome Store"
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
            />
          </div>

          {/* Store Slug */}
          <div>
            <label className="block text-white font-semibold mb-2">Store URL</label>
            <div className="flex items-center">
              <span className="text-slate-400 mr-2">cryptocart.io/</span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="my-awesome-store"
                required
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
            <p className="text-slate-400 text-sm mt-2">This will be your store's unique URL</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your store..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition resize-none"
            />
          </div>

          {/* Wallet Info */}
          <div className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Store Owner Wallet</p>
            <p className="text-white font-mono">{account}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Creating Store...
              </>
            ) : (
              'Create Store'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
