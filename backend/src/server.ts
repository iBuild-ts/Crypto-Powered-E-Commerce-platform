import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { authMiddleware, optionalAuth, generateToken } from './middleware/auth'
import { userService } from './services/userService'
import { storeService } from './services/storeService'
import { productService } from './services/productService'
import { paymentService } from './services/paymentService'
import { orderService } from './services/orderService'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// ============ HEALTH CHECK ============
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ============ AUTH ROUTES ============
app.post('/api/auth/connect', async (req: Request, res: Response) => {
  try {
    const { walletAddress, email } = req.body

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' })
    }

    const user = await userService.createOrUpdateUser(walletAddress, email)
    const token = generateToken(user.id, user.walletAddress)

    res.json({
      user,
      token,
      message: 'Wallet connected successfully',
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/auth/disconnect', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Disconnected successfully' })
})

// ============ USER ROUTES ============
app.get('/api/users/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.userId!)
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/users/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { username, displayName, avatar, bio } = req.body
    const user = await userService.updateUserProfile(req.userId!, {
      username,
      displayName,
      avatar,
      bio,
    })
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/users/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const stats = await userService.getUserStats(req.userId!)
    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ STORE ROUTES ============
app.post('/api/stores', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, slug, description, walletAddress } = req.body

    if (!name || !slug || !walletAddress) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const store = await storeService.createStore(req.userId!, {
      name,
      slug,
      description,
      walletAddress,
    })

    res.status(201).json(store)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/stores', authMiddleware, async (req: Request, res: Response) => {
  try {
    const stores = await storeService.getUserStores(req.userId!)
    res.json(stores)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/stores/:id', async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreById(req.params.id)
    if (!store) {
      return res.status(404).json({ error: 'Store not found' })
    }
    res.json(store)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/stores/slug/:slug', async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) {
      return res.status(404).json({ error: 'Store not found' })
    }
    res.json(store)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/stores/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const store = await storeService.updateStore(
      req.params.id,
      req.userId!,
      req.body
    )
    res.json(store)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/api/stores/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await storeService.deleteStore(req.params.id, req.userId!)
    res.json({ message: 'Store deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/stores/:id/stats', async (req: Request, res: Response) => {
  try {
    const stats = await storeService.getStoreStats(req.params.id)
    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ STORE DESIGN ROUTES ============
app.put('/api/stores/:slug/design', authMiddleware, async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const result = await storeService.saveStoreDesign(store.id, req.userId!, req.body)
    res.json({ message: 'Design saved successfully', design: result.design })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/stores/:slug/design', async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const design = await storeService.getStoreDesign(store.id)
    res.json(design)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ STORE SETTINGS ROUTES ============
app.get('/api/stores/:slug/settings', authMiddleware, async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const settings = await storeService.getStoreSettings(store.id)
    res.json(settings || {
      storeName: store.name,
      storeDescription: store.description,
      storeEmail: '',
      storePhone: '',
      currency: 'USDC',
      paymentMethods: store.acceptedTokens,
      shippingEnabled: false,
      shippingCost: 0,
      taxRate: 0,
      notificationsEnabled: true,
      emailNotifications: true,
      orderNotifications: true,
      customDomain: store.customDomain || '',
      subdomain: req.params.slug,
      isPublished: store.isPublished,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/stores/:slug/settings', authMiddleware, async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const result = await storeService.saveStoreSettings(store.id, req.userId!, req.body)
    res.json({ message: 'Settings saved successfully', settings: result.settings })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ PRODUCT DISPLAY ROUTES ============
app.get('/api/stores/:slug/product-display', authMiddleware, async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const productDisplay = await storeService.getProductDisplay(store.id)
    res.json(productDisplay || {
      layout: 'grid',
      cardsPerRow: 3,
      showProductImage: true,
      showProductPrice: true,
      showProductDescription: true,
      showProductRating: true,
      showProductStock: true,
      cardStyle: 'standard',
      imageHeight: 200,
      enableFilters: true,
      enableSearch: true,
      enableSorting: true,
      sortOptions: ['newest', 'price-low', 'price-high', 'popular'],
      filterOptions: ['category', 'price', 'rating'],
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/stores/:slug/product-display', authMiddleware, async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const result = await storeService.saveProductDisplay(store.id, req.userId!, req.body)
    res.json({ message: 'Product display settings saved successfully', productDisplay: result.productDisplay })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ ANALYTICS ROUTES ============
app.get('/api/analytics/dashboard', authMiddleware, async (req: Request, res: Response) => {
  try {
    const stats = await userService.getUserStats(req.userId!)
    const orders = await orderService.getUserOrders(req.userId!)
    
    const totalSales = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
    const recentOrders = orders.slice(0, 5)
    const uniqueCustomers = new Set(orders.map((o: any) => o.customerEmail))
    
    const salesByDay = [
      { date: 'Mon', amount: 0 },
      { date: 'Tue', amount: 0 },
      { date: 'Wed', amount: 0 },
      { date: 'Thu', amount: 0 },
      { date: 'Fri', amount: 0 },
      { date: 'Sat', amount: 0 },
      { date: 'Sun', amount: 0 },
    ]
    
    res.json({
      totalSales,
      totalOrders: orders.length,
      totalCustomers: uniqueCustomers.size,
      activeStores: stats.storeCount,
      recentOrders,
      topProducts: [],
      salesByDay,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/stores/:slug/public', async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug)
    if (!store) return res.status(404).json({ error: 'Store not found' })
    
    const products = await productService.getStoreProducts(store.id)
    const design = await storeService.getStoreDesign(store.id)
    const productDisplay = await storeService.getProductDisplay(store.id)
    
    res.json({
      id: store.id,
      name: store.name,
      description: store.description,
      slug: store.slug,
      isPublished: store.isPublished,
      ...design,
      products,
      productDisplay,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ PRODUCT ROUTES ============
app.post('/api/products', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { storeId, name, slug, description, image, price, currency, stock, unlimited, category, tags, sku } = req.body

    if (!storeId || !name || !slug || !price) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const product = await productService.createProduct(
      req.userId!,
      storeId,
      {
        name,
        slug,
        description,
        image,
        price,
        currency,
        stock,
        unlimited,
        category,
        tags,
        sku,
      }
    )

    res.status(201).json(product)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/products', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { storeId, search } = req.query

    if (search) {
      const products = await productService.searchProducts(
        search as string,
        storeId as string
      )
      return res.json(products)
    }

    if (storeId) {
      const products = await productService.getStoreProducts(storeId as string)
      return res.json(products)
    }

    if (req.userId) {
      const products = await productService.getUserProducts(req.userId)
      return res.json(products)
    }

    res.json([])
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/products/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.userId!,
      req.body
    )
    res.json(product)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/api/products/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id, req.userId!)
    res.json({ message: 'Product deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ ORDER ROUTES ============
app.post('/api/orders', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { storeId, items, customerEmail, customerName, shippingAddress } = req.body

    if (!storeId || !items || !customerEmail || !customerName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const order = await orderService.createOrder(
      req.userId!,
      storeId,
      {
        items,
        customerEmail,
        customerName,
        shippingAddress,
      }
    )

    res.status(201).json(order)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/orders', authMiddleware, async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getUserOrders(req.userId!)
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/orders/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/orders/:id/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status } = req.body
    const order = await orderService.updateOrderStatus(req.params.id, status)
    res.json(order)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ PAYMENT ROUTES ============
app.post('/api/payments', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { amount, currency, fromAddress, toAddress, chainId } = req.body

    if (!amount || !currency || !fromAddress || !toAddress || !chainId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const payment = await paymentService.createPayment(req.userId!, {
      amount,
      currency,
      fromAddress,
      toAddress,
      chainId,
    })

    res.status(201).json(payment)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/payments', authMiddleware, async (req: Request, res: Response) => {
  try {
    const payments = await paymentService.getUserPayments(req.userId!)
    res.json(payments)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/payments/:id', async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id)
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }
    res.json(payment)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/payments/:id/confirm', async (req: Request, res: Response) => {
  try {
    const { txHash } = req.body
    if (!txHash) {
      return res.status(400).json({ error: 'Transaction hash required' })
    }

    const payment = await paymentService.confirmPayment(req.params.id, txHash)
    res.json(payment)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/payments/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const stats = await paymentService.getPaymentStats(req.userId!)
    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// ============ 404 HANDLER ============
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
})

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`🚀 CryptoCart Backend running on http://localhost:${PORT}`)
  console.log(`📝 Health check: http://localhost:${PORT}/health`)
  console.log(`📚 API Documentation: See SETUP.md`)
})

export default app
