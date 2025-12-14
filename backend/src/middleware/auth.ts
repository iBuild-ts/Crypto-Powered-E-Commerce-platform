import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId?: string
      walletAddress?: string
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as {
      userId: string
      walletAddress: string
    }

    req.userId = decoded.userId
    req.walletAddress = decoded.walletAddress

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      ) as {
        userId: string
        walletAddress: string
      }

      req.userId = decoded.userId
      req.walletAddress = decoded.walletAddress
    }

    next()
  } catch (error) {
    next()
  }
}

export const generateToken = (userId: string, walletAddress: string) => {
  return jwt.sign(
    { userId, walletAddress },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  )
}
