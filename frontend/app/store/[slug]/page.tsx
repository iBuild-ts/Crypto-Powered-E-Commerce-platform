'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Settings, ShoppingBag, BarChart3, Palette, CreditCard, Package, Eye } from 'lucide-react'

export default function StorePage() {
  const params = useParams()
  const slug = params.slug as string

  const managementItems = [
    {
      icon: Palette,
      title: 'Visual Builder',
      description: 'Design and customize your store',
      href: `/store/${slug}/builder`,
      color: 'text-purple-400',
    },
    {
      icon: ShoppingBag,
      title: 'Products',
      description: 'Add, edit, and manage products',
      href: `/store/${slug}/products`,
      color: 'text-blue-400',
    },
    {
      icon: CreditCard,
      title: 'Payments',
      description: 'Track payments and transactions',
      href: `/store/${slug}/payments`,
      color: 'text-green-400',
    },
    {
      icon: Package,
      title: 'Orders',
      description: 'Manage customer orders',
      href: `/store/${slug}/orders`,
      color: 'text-orange-400',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View sales and customer insights',
      href: `/store/${slug}/analytics`,
      color: 'text-pink-400',
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure store settings',
      href: `/store/${slug}/settings`,
      color: 'text-slate-400',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      {/* Store Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700 rounded-lg p-8 mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 capitalize">{slug.replace(/-/g, ' ')}</h1>
            <p className="text-slate-400">Manage all aspects of your store</p>
          </div>
          <Link
            href={`/${slug}`}
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center gap-2"
          >
            <Eye size={20} />
            View Store
          </Link>
        </div>
      </div>

      {/* Management Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {managementItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-700/50 transition group"
          >
            <item.icon size={32} className={`${item.color} mb-4 group-hover:scale-110 transition`} />
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Products', value: '0', color: 'text-blue-400' },
          { label: 'Total Orders', value: '0', color: 'text-green-400' },
          { label: 'Total Revenue', value: '$0', color: 'text-orange-400' },
          { label: 'Visitors', value: '0', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Store Info */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-400 text-sm mb-2">Store Slug</p>
            <p className="text-white font-mono text-lg">{slug}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">Store URL</p>
            <a
              href={`http://localhost:3000/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition font-mono text-lg"
            >
              http://localhost:3000/{slug}
            </a>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">Status</p>
            <span className="inline-block px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-semibold">
              Active
            </span>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">Created</p>
            <p className="text-white">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
