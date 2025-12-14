# CryptoCart Setup Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- MetaMask or Trust Wallet browser extension
- Git

## Quick Start

### 1. Clone and Install Dependencies

```bash
cd CryptoCart

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install contract dependencies
cd ../contracts
npm install

cd ..
```

### 2. Environment Configuration

```bash
# Backend
cp backend/.env.example backend/.env

# Edit backend/.env with your configuration:
# - DATABASE_URL: PostgreSQL connection string
# - JWT_SECRET: Generate a secure random string
# - ETHEREUM_RPC_URL: Alchemy or Infura endpoint
# - PRIVATE_KEY: Your wallet private key (for deployments)
# - USDC_ADDRESS, USDT_ADDRESS: Stablecoin addresses
```

### 3. Database Setup

```bash
cd backend

# Create PostgreSQL database
createdb cryptocart

# Run migrations (when Prisma schema is ready)
npx prisma migrate dev --name init

cd ..
```

### 4. Smart Contract Deployment

```bash
cd contracts

# Compile contracts
npm run compile

# Deploy to testnet
npm run deploy

# Deploy to Polygon mainnet
npm run deploy:polygon

# Save the deployed contract address to backend/.env
# ESCROW_CONTRACT_ADDRESS=0x...

cd ..
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## Project Structure

```
CryptoCart/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (wallet, auth)
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, validation
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── contracts/               # Solidity smart contracts
│   ├── contracts/
│   │   └── PaymentEscrow.sol
│   ├── scripts/
│   │   └── deploy.ts
│   ├── test/
│   └── hardhat.config.ts
│
└── docs/                    # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/connect` - Connect wallet
- `POST /api/auth/disconnect` - Disconnect wallet

### Stores
- `GET /api/stores` - List user's stores
- `POST /api/stores` - Create new store
- `GET /api/stores/:id` - Get store details
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Payments
- `POST /api/payments/create` - Create payment
- `GET /api/payments/:id` - Get payment status
- `POST /api/payments/:id/confirm` - Confirm payment

## Supported Networks

- **Ethereum Mainnet** - Production
- **Polygon (Matic)** - Lower fees, faster transactions
- **Sepolia Testnet** - Testing
- **Mumbai Testnet** - Polygon testing

## Wallet Integration

### MetaMask
1. Install MetaMask extension
2. Create or import wallet
3. Add network (if not Ethereum mainnet)
4. Click "Connect Wallet" in app

### Trust Wallet
1. Install Trust Wallet app
2. Create or import wallet
3. Open in-app browser
4. Navigate to CryptoCart
5. Click "Connect Wallet"

## Testing

```bash
# Backend tests
cd backend
npm run test

# Contract tests
cd ../contracts
npm run test

# Frontend tests (when configured)
cd ../frontend
npm run test
```

## Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
npm run build
# Deploy using platform's CLI
```

### Smart Contracts
```bash
cd contracts
npm run deploy:polygon
# Verify on PolygonScan
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### Wallet Connection Issues
- Clear browser cache and cookies
- Reinstall MetaMask extension
- Check network selection in wallet

### Contract Deployment Failed
- Verify private key has sufficient funds
- Check RPC endpoint is accessible
- Ensure correct network in hardhat.config.ts

## Security Considerations

1. **Never commit .env files** - Use .env.example
2. **Protect private keys** - Use environment variables
3. **Validate all inputs** - Server-side validation required
4. **Use HTTPS** - Always in production
5. **Rate limiting** - Implemented on API endpoints
6. **Smart contract audits** - Recommended before mainnet

## Performance Optimization

- Frontend: Lazy loading, code splitting
- Backend: Database indexing, caching
- Contracts: Gas optimization, batch operations

## Support & Resources

- Documentation: `/docs`
- GitHub Issues: Report bugs
- Discord: Community support (coming soon)
- Email: support@cryptocart.io

## License

MIT License - See LICENSE file

---

**Happy building! 🚀**
