'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Coffee } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg"></div>
              CryptoCart
            </div>
            <p className="text-slate-400 text-sm">
              Build and manage your crypto-powered online store with ease.
            </p>
            <p className="text-slate-500 text-xs mt-4">
              Built with ❤️ by Horlah
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white transition">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-white transition">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-white mb-4">Connect With Me</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="https://X.com/lahwealth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
                  <Twitter size={16} /> Follow on X
                </a>
              </li>
              <li>
                <a href="https://www.upwork.com/freelancers/~01857093015b424e00" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Work with me on Upwork
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition flex items-center gap-2">
                  <Coffee size={16} /> Buy me a coffee (ETH)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 CryptoCart - Built with ❤️ by Horlah. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://github.com/iBuild-ts/Crypto-Powered-E-Commerce-platform" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="https://X.com/lahwealth" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.upwork.com/freelancers/~01857093015b424e00" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* ETH Address */}
          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <p className="text-slate-500 text-xs mb-2">Support this project with ETH</p>
            <p className="text-slate-400 text-sm font-mono">0xdf49e29b6840d7ba57e4b5acddc770047f67ff13</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
