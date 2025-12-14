# CryptoCart - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 min)
```bash
cd CryptoCart

# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..

# Contracts
cd contracts && npm install && cd ..
```

### Step 2: Setup Environment (1 min)
```bash
# Copy example env file
cp backend/.env.example backend/.env

# For development, you can use default values
# For production, update with your actual keys
```

### Step 3: Start Backend (1 min)
```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
```

### Step 4: Start Frontend (1 min)
```bash
# In a new terminal
cd frontend
npm run dev
# App opens on http://localhost:3000
```

### Step 5: Connect Your Wallet
1. Open http://localhost:3000 in your browser
2. Click "Connect Wallet" button
3. Select MetaMask or Trust Wallet
4. Approve the connection
5. You're in! 🎉

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `frontend/src/App.tsx` | Main React app with routing |
| `frontend/src/context/WalletContext.tsx` | Wallet connection logic |
| `backend/src/index.ts` | Express API server |
| `contracts/contracts/PaymentEscrow.sol` | Smart contract for escrow |
| `README.md` | Full project documentation |
| `SETUP.md` | Detailed setup instructions |

---

## 🔧 Common Commands

### Frontend
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Check code quality
```

### Backend
```bash
cd backend
npm run dev      # Start dev server with hot reload
npm run build    # Compile TypeScript
npm run test     # Run tests
```

### Contracts
```bash
cd contracts
npm run compile  # Compile Solidity
npm run test     # Run contract tests
npm run deploy   # Deploy to testnet
```

---

## 🌐 API Endpoints

```
GET  /health                    # Health check
GET  /api/stores                # List stores
POST /api/stores                # Create store
GET  /api/stores/:id            # Get store
GET  /api/products              # List products
POST /api/products              # Create product
POST /api/auth/connect          # Connect wallet
POST /api/payments/create       # Create payment
```

---

## 💡 What's Included

✅ **Frontend**
- React 18 with TypeScript
- TailwindCSS styling
- MetaMask/Trust Wallet integration
- Responsive design
- 6 main pages

✅ **Backend**
- Express.js API
- Wallet authentication
- Store management
- Product management
- Payment processing

✅ **Smart Contracts**
- PaymentEscrow.sol
- USDC/USDT support
- Dispute resolution
- Seller withdrawals

✅ **Documentation**
- README.md
- SETUP.md
- This quick start guide

---

## 🎯 Next Steps

1. **Explore the Code**
   - Check `frontend/src/pages/LandingPage.tsx` for UI examples
   - Review `backend/src/index.ts` for API structure
   - Study `contracts/contracts/PaymentEscrow.sol` for smart contract logic

2. **Customize**
   - Update branding in Navbar component
   - Modify pricing tiers in PricingPage
   - Adjust colors in TailwindCSS config

3. **Extend Features**
   - Add database models with Prisma
   - Implement more API endpoints
   - Deploy contracts to testnet

4. **Deploy**
   - Frontend: Netlify/Vercel
   - Backend: Railway/Heroku
   - Contracts: Ethereum/Polygon

---

## 🆘 Troubleshooting

**Port 5000 already in use?**
```bash
lsof -ti:5000 | xargs kill -9
```

**Port 3000 already in use?**
```bash
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Wallet not connecting?**
- Clear browser cache
- Reinstall MetaMask
- Check network selection

---

## 📚 Learn More

- **React**: https://react.dev
- **Ethers.js**: https://docs.ethers.org
- **Solidity**: https://docs.soliditylang.org
- **TailwindCSS**: https://tailwindcss.com
- **Express**: https://expressjs.com

---

## 🎓 Architecture Overview

```
┌─────────────────────────────────────────┐
│         Frontend (React)                 │
│  - Pages, Components, Wallet Context     │
└────────────┬────────────────────────────┘
             │ HTTP/REST API
┌────────────▼────────────────────────────┐
│         Backend (Express)                │
│  - Routes, Auth, Business Logic          │
└────────────┬────────────────────────────┘
             │ Web3 Calls
┌────────────▼────────────────────────────┐
│    Smart Contracts (Solidity)            │
│  - Escrow, Payments, Withdrawals         │
└─────────────────────────────────────────┘
```

---

## 💰 Supported Tokens

- **USDC** (USD Coin) - Ethereum & Polygon
- **USDT** (Tether) - Ethereum & Polygon

---

## 🔐 Security Notes

⚠️ **Development Only**
- Don't use real private keys
- Don't deploy contracts with test code
- Use testnet for development

✅ **Before Production**
- Audit smart contracts
- Set up proper environment variables
- Enable HTTPS
- Implement rate limiting
- Add database backups

---

## 📞 Support

- 📖 Read SETUP.md for detailed instructions
- 📖 Read README.md for full documentation
- 📖 Check PROJECT_SUMMARY.md for overview

---

**Ready to build? Start with `npm run dev` in both frontend and backend! 🚀**

---

## 🙏 Connect With Me

**Buy me a coffee with ETH**
```
0xdf49e29b6840d7ba57e4b5acddc770047f67ff13
```

**Follow me on X**
https://X.com/lahwealth

**Work with me on Upwork**
https://www.upwork.com/freelancers/~01857093015b424e00

---

**Copyright © 2025 - Built with ❤️ by Horlah**
