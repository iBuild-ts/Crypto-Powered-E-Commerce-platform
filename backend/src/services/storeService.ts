import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const storeService = {
  async createStore(
    userId: string,
    data: {
      name: string
      slug: string
      description?: string
      walletAddress: string
    }
  ) {
    // Check if slug is unique
    const existing = await prisma.store.findUnique({
      where: { slug: data.slug },
    })

    if (existing) {
      throw new Error('Store slug already exists')
    }

    return prisma.store.create({
      data: {
        userId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        walletAddress: data.walletAddress,
      },
    })
  },

  async getStoreById(id: string) {
    return prisma.store.findUnique({
      where: { id },
      include: {
        products: true,
        orders: true,
      },
    })
  },

  async getStoreBySlug(slug: string) {
    return prisma.store.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
        },
      },
    })
  },

  async getUserStores(userId: string) {
    return prisma.store.findMany({
      where: { userId },
      include: {
        products: true,
        orders: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async updateStore(
    storeId: string,
    userId: string,
    data: {
      name?: string
      description?: string
      logo?: string
      banner?: string
      theme?: string
      customDomain?: string
      isPublished?: boolean
      acceptedTokens?: string[]
    }
  ) {
    // Verify ownership
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.store.update({
      where: { id: storeId },
      data,
    })
  },

  async deleteStore(storeId: string, userId: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.store.delete({
      where: { id: storeId },
    })
  },

  async getStoreStats(storeId: string) {
    const orders = await prisma.order.findMany({
      where: { storeId },
    })

    const products = await prisma.product.findMany({
      where: { storeId },
    })

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    return {
      productCount: products.length,
      orderCount: orders.length,
      totalRevenue,
      orders,
      products,
    }
  },

  async saveStoreDesign(storeId: string, userId: string, design: any) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.store.update({
      where: { id: storeId },
      data: { design },
    })
  },

  async getStoreDesign(storeId: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { design: true },
    })
    return store?.design || {}
  },

  async saveStoreSettings(storeId: string, userId: string, settings: any) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.store.update({
      where: { id: storeId },
      data: { settings },
    })
  },

  async getStoreSettings(storeId: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { settings: true },
    })
    return store?.settings || {}
  },

  async saveProductDisplay(storeId: string, userId: string, productDisplay: any) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.store.update({
      where: { id: storeId },
      data: { productDisplay },
    })
  },

  async getProductDisplay(storeId: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { productDisplay: true },
    })
    return store?.productDisplay || {}
  },

  async publishStore(storeId: string, userId: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.store.update({
      where: { id: storeId },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    })
  },
}
