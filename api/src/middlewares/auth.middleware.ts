import { UnAuthorizedError } from '@/helpers/error-handler'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

class AuthMiddleware {
  public async verifyUser(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['auth_token']
    if (!token) {
      throw new UnAuthorizedError('Token not available. Please login')
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as { id: string }
    req.userId = payload.id as string
    next()
  }
}

export const authMiddleware = new AuthMiddleware()
