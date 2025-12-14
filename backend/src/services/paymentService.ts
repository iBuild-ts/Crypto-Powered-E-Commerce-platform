import { PrismaClient } from '@prisma/client'
import { ethers } from 'ethers'

const prisma = new PrismaClient()

export const paymentService = {
  async createPayment(
    userId: string,
    data: {
      amount: number
      currency: string
      fromAddress: string
      toAddress: string
      chainId: number
    }
  ) {
    return prisma.payment.create({
      data: {
        userId,
        amount: data.amount,
        currency: data.currency,
        fromAddress: data.fromAddress,
        toAddress: data.toAddress,
        chainId: data.chainId,
        status: 'pending',
      },
    })
  },

  async getPaymentById(id: string) {
    return prisma.payment.findUnique({
      where: { id },
    })
  },

  async getUserPayments(userId: string) {
    return prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  },

  async updatePaymentStatus(
    paymentId: string,
    status: string,
    txHash?: string
  ) {
    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        txHash: txHash || undefined,
      },
    })
  },

  async confirmPayment(paymentId: string, txHash: string) {
    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'confirmed',
        txHash,
      },
    })
  },

  async createEscrow(
    paymentId: string,
    escrowId: string,
    status: string = 'pending'
  ) {
    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        escrowId,
        escrowStatus: status,
      },
    })
  },

  async releaseEscrow(paymentId: string) {
    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        escrowStatus: 'released',
      },
    })
  },

  async refundPayment(paymentId: string) {
    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'refunded',
      },
    })
  },

  async getPaymentStats(userId: string) {
    const payments = await prisma.payment.findMany({
      where: { userId },
    })

    const confirmed = payments.filter((p) => p.status === 'confirmed')
    const pending = payments.filter((p) => p.status === 'pending')
    const failed = payments.filter((p) => p.status === 'failed')

    const totalAmount = confirmed.reduce((sum, p) => sum + p.amount, 0)
    const pendingAmount = pending.reduce((sum, p) => sum + p.amount, 0)

    return {
      totalPayments: payments.length,
      confirmedPayments: confirmed.length,
      pendingPayments: pending.length,
      failedPayments: failed.length,
      totalAmount,
      pendingAmount,
    }
  },
}
