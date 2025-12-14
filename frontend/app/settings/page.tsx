'use client'

import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@/lib/WalletContext'

export default function SettingsPage() {
  const { account, isConnected } = useWallet()
  const [isSaving, setIsSaving] = useState(false)

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-slate-400 mb-6">You need to connect your wallet to access settings.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold">
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
      <p className="text-slate-400 mb-8">Manage your account preferences and security</p>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Account Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Wallet Address</label>
              <input
                type="text"
                value={account || ''}
                disabled
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 font-mono cursor-not-allowed"
              />
              <p className="text-slate-400 text-sm mt-2">Your wallet address cannot be changed</p>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Display Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email notifications for new orders', id: 'orders' },
              { label: 'Email notifications for store updates', id: 'updates' },
              { label: 'Email notifications for security alerts', id: 'security' },
            ].map(notification => (
              <label key={notification.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-orange-400"
                />
                <span className="text-white">{notification.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Security</h2>
          <div className="space-y-4">
            <button className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold text-left">
              Change Password
            </button>
            <button className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold text-left">
              Enable Two-Factor Authentication
            </button>
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
