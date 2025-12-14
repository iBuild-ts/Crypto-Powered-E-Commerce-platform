'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp, Users } from 'lucide-react'
import { useWallet } from '@/lib/WalletContext'

export default function Home() {
  const { isConnected, connectWallet } = useWallet()

  const handleGetStarted = () => {
    if (!isConnected) {
      connectWallet()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Crypto-Powered
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"> E-Commerce</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Build, customize, and manage your online store with seamless cryptocurrency payments. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isConnected ? (
              <Link
                href="/store/create"
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-2xl transition font-semibold flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </Link>
            ) : (
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-2xl transition font-semibold flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
            )}
            <Link
              href="/docs"
              className="px-8 py-4 border border-slate-600 text-white rounded-lg hover:bg-slate-700/50 transition font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Instant payments with crypto' },
            { icon: Shield, title: 'Secure', desc: 'Smart contract escrow protection' },
            { icon: TrendingUp, title: 'Analytics', desc: 'Real-time sales tracking' },
            { icon: Users, title: 'Community', desc: 'Join thousands of sellers' },
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-700/50 transition">
              <feature.icon size={32} className="text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-400/10 to-pink-500/10 border-y border-slate-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to launch your store?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join the crypto commerce revolution. Create your store in minutes.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-2xl transition font-semibold"
          >
            Create Your Store Now
          </Link>
        </div>
      </section>
    </div>
  )
}
