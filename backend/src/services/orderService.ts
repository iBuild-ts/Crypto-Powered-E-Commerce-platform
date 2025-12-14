import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const orderService = {
  async createOrder(
    userId: string,
    storeId: string,
    data: {
      items: Array<{ productId: string; quantity: number }>
      customerEmail: string
      customerName: string
      shippingAddress?: string
    }
  ) {
    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of data.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        throw new Error(`Product ${item.productId} not found`)
      }

      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      })
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return prisma.order.create({
      data: {
        userId,
        storeId,
        orderNumber,
        items: {
          create: orderItems,
        },
        subtotal,
        total: subtotal,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        shippingAddress: data.shippingAddress,
        status: 'pending',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
  },

  async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    })
  },

  async getUserOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getStoreOrders(storeId: string) {
    return prisma.order.findMany({
      where: { storeId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async updateOrderStatus(orderId: string, status: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    })
  },

  async linkPaymentToOrder(orderId: string, paymentId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId,
        status: 'confirmed',
      },
    })
  },

  async getOrderStats(storeId: string) {
    const orders = await prisma.order.findMany({
      where: { storeId },
    })

    const confirmed = orders.filter((o) => o.status === 'confirmed')
    const pending = orders.filter((o) => o.status === 'pending')
    const shipped = orders.filter((o) => o.status === 'shipped')

    const totalRevenue = confirmed.reduce((sum, o) => sum + o.total, 0)

    return {
      totalOrders: orders.length,
      confirmedOrders: confirmed.length,
      pendingOrders: pending.length,
      shippedOrders: shipped.length,
      totalRevenue,
    }
  },
}
