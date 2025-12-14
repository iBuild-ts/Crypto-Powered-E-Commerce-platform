'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Save, Plus, Trash2, Eye, Settings } from 'lucide-react'

interface Section {
  id: string
  type: 'hero' | 'products' | 'features' | 'testimonials' | 'cta' | 'faq'
  title: string
  content: string
}

export default function VisualBuilderPage() {
  const params = useParams()
  const slug = params.slug as string
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Welcome to Your Store',
      content: 'Start building your amazing store',
    },
  ])
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [designSettings, setDesignSettings] = useState({
    primaryColor: '#FF6B35',
    secondaryColor: '#004E89',
    fontFamily: 'Inter',
    layout: 'grid',
  })

  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title: `New ${type} Section`,
      content: 'Edit this content',
    }
    setSections([...sections, newSection])
  }

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id))
  }

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections(sections.map(s => (s.id === id ? { ...s, ...updates } : s)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem('cryptocart_token')
      const response = await fetch(`http://localhost:5000/api/stores/${slug}/design`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          sections,
          ...designSettings,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save design')
      }

      alert('Design saved successfully!')
    } catch (error) {
      alert('Error saving design: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/store/${slug}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft size={20} />
            Back to Store
          </Link>
          <h1 className="text-2xl font-bold text-white">Visual Store Builder</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center gap-2"
            >
              <Eye size={18} />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Design'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto p-4">
          <h2 className="text-lg font-bold text-white mb-4">Design Settings</h2>

          {/* Color Settings */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={designSettings.primaryColor}
                onChange={(e) => setDesignSettings({ ...designSettings, primaryColor: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={designSettings.primaryColor}
                onChange={(e) => setDesignSettings({ ...designSettings, primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={designSettings.secondaryColor}
                onChange={(e) => setDesignSettings({ ...designSettings, secondaryColor: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={designSettings.secondaryColor}
                onChange={(e) => setDesignSettings({ ...designSettings, secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">Font Family</label>
            <select
              value={designSettings.fontFamily}
              onChange={(e) => setDesignSettings({ ...designSettings, fontFamily: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
            >
              <option>Inter</option>
              <option>Poppins</option>
              <option>Roboto</option>
              <option>Playfair Display</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">Layout</label>
            <select
              value={designSettings.layout}
              onChange={(e) => setDesignSettings({ ...designSettings, layout: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>

          <hr className="border-slate-700 my-6" />

          <h3 className="text-lg font-bold text-white mb-4">Add Sections</h3>
          <div className="space-y-2">
            {['hero', 'products', 'features', 'testimonials', 'cta', 'faq'].map(type => (
              <button
                key={type}
                onClick={() => addSection(type as Section['type'])}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center gap-2 text-sm"
              >
                <Plus size={16} />
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {showPreview ? (
              // Preview Mode
              <div className="space-y-8">
                {sections.map(section => (
                  <div
                    key={section.id}
                    className="bg-white rounded-lg p-8 shadow-lg"
                    style={{
                      color: designSettings.secondaryColor,
                      fontFamily: designSettings.fontFamily,
                    }}
                  >
                    <h2 className="text-3xl font-bold mb-4" style={{ color: designSettings.primaryColor }}>
                      {section.title}
                    </h2>
                    <p className="text-lg">{section.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={section.id} className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <label className="block text-white text-sm font-semibold mb-2">Section Type</label>
                        <select
                          value={section.type}
                          onChange={(e) => updateSection(section.id, { type: e.target.value as Section['type'] })}
                          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white text-sm mb-4"
                        >
                          <option value="hero">Hero</option>
                          <option value="products">Products</option>
                          <option value="features">Features</option>
                          <option value="testimonials">Testimonials</option>
                          <option value="cta">CTA</option>
                          <option value="faq">FAQ</option>
                        </select>

                        <label className="block text-white text-sm font-semibold mb-2">Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white text-sm mb-4"
                        />

                        <label className="block text-white text-sm font-semibold mb-2">Content</label>
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white text-sm resize-none"
                          rows={3}
                        />
                      </div>
                      <button
                        onClick={() => removeSection(section.id)}
                        className="ml-4 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
