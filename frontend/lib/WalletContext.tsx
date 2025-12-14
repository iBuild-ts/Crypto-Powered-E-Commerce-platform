'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface WalletContextType {
  account: string | null
  isConnected: boolean
  balance: string | null
  chainId: number | null
  token: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (chainId: number) => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
            
            const provider = new ethers.BrowserProvider(window.ethereum)
            const balanceWei = await provider.getBalance(accounts[0])
            const balanceEth = ethers.formatEther(balanceWei)
            setBalance(balanceEth)
            
            const network = await provider.getNetwork()
            setChainId(Number(network.chainId))
          }
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error)
      }
    }

    checkWalletConnection()
  }, [])

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask or Trust Wallet')
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()
      const balanceWei = await provider.getBalance(address)
      const balanceEth = ethers.formatEther(balanceWei)

      setAccount(address)
      setIsConnected(true)
      setBalance(balanceEth)
      setChainId(Number(network.chainId))

      // Authenticate with backend
      try {
        const response = await fetch('http://localhost:5000/api/auth/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: address,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setToken(data.token)
          localStorage.setItem('cryptocart_token', data.token)
          localStorage.setItem('cryptocart_account', address)
        }
      } catch (authError) {
        console.error('Failed to authenticate with backend:', authError)
      }

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      })

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(parseInt(chainId, 16))
      })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    setBalance(null)
    setChainId(null)
    setToken(null)
    localStorage.removeItem('cryptocart_token')
    localStorage.removeItem('cryptocart_account')
  }

  const switchNetwork = async (targetChainId: number) => {
    try {
      if (!window.ethereum) return

      const chainIdHex = `0x${targetChainId.toString(16)}`
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        alert('Please add this network to your wallet')
      }
      console.error('Failed to switch network:', error)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected,
        balance,
        chainId,
        token,
        connectWallet,
        disconnectWallet,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}

declare global {
  interface Window {
    ethereum?: any
  }
}
