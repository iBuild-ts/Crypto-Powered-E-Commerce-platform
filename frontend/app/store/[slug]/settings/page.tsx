'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href={`/store/${slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Store
      </Link>

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-white mb-2">Store Settings</h1>
      <p className="text-slate-400 mb-8">Configure your store settings and preferences</p>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Store Name</label>
              <input
                type="text"
                placeholder="My Store"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Store Description</label>
              <textarea
                placeholder="Describe your store..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Accepted Tokens</label>
              <div className="space-y-3">
                {['USDC', 'USDT', 'ETH'].map(token => (
                  <label key={token} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={token !== 'ETH'}
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-orange-400"
                    />
                    <span className="text-white">{token}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Shipping Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Shipping Cost</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Tax Rate (%)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
