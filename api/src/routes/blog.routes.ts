import { blogController } from '@/controllers/blog.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'

const router = Router()

router.post('/create', authMiddleware.verifyUser, blogController.createBlog)
// router.post('/register', authController.register)

export default router
