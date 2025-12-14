# CryptoCart - Crypto-Native E-Commerce Platform

A modern, blockchain-first e-commerce platform enabling creators and sellers to build and manage online stores with seamless cryptocurrency payments.

## 🚀 Features

- **Crypto Payment Integration**: USDC & USDT payments via MetaMask and Trust Wallet
- **Smart Contract Escrow**: On-chain transaction security and transparency
- **Drag-and-Drop Store Builder**: No-code store customization
- **Tiered Subscription Plans**: Free, Starter, Popular, and Golden tiers
- **Advanced Analytics**: Sales tracking, customer insights, and SEO tools
- **Multi-Store Management**: Manage multiple stores from one dashboard
- **NFT & DeFi Integration**: Token-gated products, loyalty programs, and blockchain perks

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **shadcn/ui** for component library
- **Web3.js** for blockchain interaction
- **Ethers.js** for wallet connection
- **Zustand** for state management
- **React Query** for data fetching

### Backend
- **Node.js + Express** with TypeScript
- **PostgreSQL** for data persistence
- **Prisma ORM** for database management
- **JWT** for authentication
- **Stripe** for fiat on-ramps (optional)

### Blockchain
- **Solidity** smart contracts
- **Hardhat** for contract development
- **Ethereum/Polygon** for deployment
- **OpenZeppelin** for secure contract libraries

## 📁 Project Structure

```
CryptoCart/
├── frontend/              # React web application
├── backend/               # Express API server
├── contracts/             # Solidity smart contracts
├── docs/                  # Documentation
└── README.md
```

## 🏗️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or Trust Wallet browser extension
- PostgreSQL 14+

### Installation

1. **Clone and setup**
```bash
cd CryptoCart
npm install
```

2. **Frontend setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend setup**
```bash
cd backend
npm install
npm run dev
```

4. **Smart Contracts**
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

## 💰 Subscription Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0/month | Up to 10 products, basic templates, crypto payments |
| **Starter** | $9-19/month | Up to 50 products, custom domain, email marketing |
| **Popular** | $29-49/month | Unlimited products, advanced analytics, 24/7 support |
| **Golden** | $99+/month | NFT drops, AI recommendations, dedicated manager |

## 🔐 Security

- Smart contract escrow for buyer/seller protection
- KYC/AML compliance for high-value transactions
- On-chain transaction transparency
- Secure wallet integration (MetaMask, Trust Wallet)

## 📊 Monetization

- Subscription tier fees
- 1-2% transaction fees on sales
- Premium theme marketplace
- Add-on services and integrations

## 🤝 Contributing

Contributions welcome! Please follow our coding standards and submit PRs with tests.

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

- Documentation: `/docs`
- Community: Discord (coming soon)
- Email: support@cryptocart.io

---

**CryptoCart** - Building the future of commerce on blockchain 🚀
