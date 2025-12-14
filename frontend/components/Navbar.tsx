'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Wallet, LogOut } from 'lucide-react'
import { useWallet } from '@/lib/WalletContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { account, isConnected, connectWallet, disconnectWallet } = useWallet()

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <nav className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-orange-400 transition">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg"></div>
            CryptoCart
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isConnected && (
              <>
                <Link href="/dashboard" className="text-slate-300 hover:text-white transition">Dashboard</Link>
                <Link href="/store" className="text-slate-300 hover:text-white transition">Stores</Link>
                <Link href="/settings" className="text-slate-300 hover:text-white transition">Settings</Link>
              </>
            )}
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-slate-700/50 rounded-lg text-slate-300 text-sm">
                  {truncateAddress(account!)}
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition font-semibold flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center gap-2"
              >
                <Wallet size={18} />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {isConnected && (
              <>
                <Link href="/dashboard" className="block text-slate-300 hover:text-white transition">Dashboard</Link>
                <Link href="/store" className="block text-slate-300 hover:text-white transition">Stores</Link>
                <Link href="/settings" className="block text-slate-300 hover:text-white transition">Settings</Link>
              </>
            )}
            {isConnected ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-slate-700/50 rounded-lg text-slate-300 text-sm">
                  {truncateAddress(account!)}
                </div>
                <button
                  onClick={disconnectWallet}
                  className="w-full px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="w-full px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2"
              >
                <Wallet size={18} />
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
