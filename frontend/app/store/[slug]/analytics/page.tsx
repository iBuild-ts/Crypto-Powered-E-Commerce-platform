'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, ShoppingBag, DollarSign, Users } from 'lucide-react'

export default function AnalyticsPage() {
  const params = useParams()
  const slug = params.slug as string

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <Link href={`/store/${slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
        <ArrowLeft size={20} />
        Back to Store
      </Link>

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
      <p className="text-slate-400 mb-8">View your store performance and sales data</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: '$5,200', color: 'text-orange-400' },
          { icon: ShoppingBag, label: 'Total Orders', value: '24', color: 'text-blue-400' },
          { icon: Users, label: 'Total Customers', value: '18', color: 'text-green-400' },
          { icon: TrendingUp, label: 'Conversion Rate', value: '3.2%', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-xl font-bold text-white mb-6">Sales Over Time</h2>
          <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Chart placeholder</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-xl font-bold text-white mb-6">Top Products</h2>
          <div className="space-y-4">
            {[
              { name: 'Product 1', sales: 12, revenue: '$1,200' },
              { name: 'Product 2', sales: 8, revenue: '$800' },
              { name: 'Product 3', sales: 4, revenue: '$400' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-semibold">{product.name}</p>
                  <p className="text-slate-400 text-sm">{product.sales} sales</p>
                </div>
                <p className="text-orange-400 font-semibold">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
