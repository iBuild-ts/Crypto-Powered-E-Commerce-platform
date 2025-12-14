import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const userService = {
  async createOrUpdateUser(walletAddress: string, email?: string) {
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {
        email: email || undefined,
        emailVerified: email ? true : undefined,
      },
      create: {
        walletAddress,
        email,
        emailVerified: !!email,
      },
    })

    return user
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        stores: true,
        subscriptions: true,
      },
    })
  },

  async getUserByWallet(walletAddress: string) {
    return prisma.user.findUnique({
      where: { walletAddress },
      include: {
        stores: true,
        subscriptions: true,
      },
    })
  },

  async updateUserProfile(
    userId: string,
    data: {
      username?: string
      displayName?: string
      avatar?: string
      bio?: string
    }
  ) {
    return prisma.user.update({
      where: { id: userId },
      data,
    })
  },

  async updateKYCStatus(userId: string, status: string, kycData?: any) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        kycStatus: status,
        kycData: kycData || undefined,
      },
    })
  },

  async getUserStats(userId: string) {
    const stores = await prisma.store.findMany({
      where: { userId },
    })

    const orders = await prisma.order.findMany({
      where: { userId },
    })

    const payments = await prisma.payment.findMany({
      where: { userId, status: 'confirmed' },
    })

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

    return {
      storeCount: stores.length,
      orderCount: orders.length,
      totalRevenue,
      stores,
      orders,
    }
  },
}
