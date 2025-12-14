import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const productService = {
  async createProduct(
    userId: string,
    storeId: string,
    data: {
      name: string
      slug: string
      description?: string
      image?: string
      price: number
      currency?: string
      stock?: number
      unlimited?: boolean
      category?: string
      tags?: string[]
      sku?: string
    }
  ) {
    // Verify store ownership
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    })

    if (store?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.product.create({
      data: {
        userId,
        storeId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        price: data.price,
        currency: data.currency || 'USDC',
        stock: data.stock || 0,
        unlimited: data.unlimited || false,
        category: data.category,
        tags: data.tags || [],
        sku: data.sku,
      },
    })
  },

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    })
  },

  async getStoreProducts(storeId: string) {
    return prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getUserProducts(userId: string) {
    return prisma.product.findMany({
      where: { userId },
      include: {
        store: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async updateProduct(
    productId: string,
    userId: string,
    data: {
      name?: string
      description?: string
      image?: string
      price?: number
      stock?: number
      unlimited?: boolean
      category?: string
      tags?: string[]
      isActive?: boolean
    }
  ) {
    // Verify ownership
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (product?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.product.update({
      where: { id: productId },
      data,
    })
  },

  async deleteProduct(productId: string, userId: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (product?.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return prisma.product.delete({
      where: { id: productId },
    })
  },

  async searchProducts(query: string, storeId?: string) {
    return prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { tags: { hasSome: [query] } },
            ],
          },
          { isActive: true },
          storeId ? { storeId } : {},
        ],
      },
    })
  },
}
