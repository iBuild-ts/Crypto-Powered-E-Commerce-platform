'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  currency: string
  stock: number
  status: 'active' | 'draft'
  image?: string
  sales: number
}

export default function ProductsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price) return

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      currency: 'USDC',
      stock: parseInt(formData.stock) || 0,
      status: 'active',
      sales: 0,
    }

    setProducts([...products, newProduct])
    setFormData({ name: '', price: '', stock: '', description: '' })
    setShowAddForm(false)
  }

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
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
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-slate-400 mt-2">Manage your store products and inventory</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Price (USDC)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 transition resize-none"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition">
              <div className="h-48 bg-slate-700/50 flex items-center justify-center">
                <span className="text-slate-400">No image</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-orange-400">${product.price}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.status === 'active'
                      ? 'bg-green-400/20 text-green-400'
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">Stock: {product.stock} | Sales: {product.sales}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center justify-center gap-2 text-sm">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No products yet</h2>
          <p className="text-slate-400 mb-6">Start by adding your first product to your store</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
          >
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  )
}
