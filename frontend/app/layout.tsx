import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { WalletProvider } from '@/lib/WalletContext'

export const metadata: Metadata = {
  title: 'CryptoCart - Crypto E-Commerce Platform',
  description: 'Build and manage your crypto-powered online store with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  )
}
