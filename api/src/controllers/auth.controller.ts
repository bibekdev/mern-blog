import { BadRequestError } from '@/helpers/error-handler'
import { joiValidation } from '@/helpers/validation'
import { IUserDocument } from '@/interfaces/user.interface'
import { userService } from '@/services/user.service'
import { loginSchema, registerSchema } from '@/validaton-schema/auth'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'
// @ts-ignore
import { generateId } from 'xid'

class AuthController {
  @joiValidation(loginSchema)
  public async login(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await userService.findByEmail(email)
    if (!user) {
      throw new BadRequestError('User not found')
    }
    const matchedPassword = user.comparePassword(password)
    if (!matchedPassword) {
      throw new BadRequestError('Invalid credentials')
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as Secret, {
      expiresIn: '7d',
    })
    res.cookie('auth-token', token, {
      sameSite: 'lax',
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    })
    res
      .status(httpStatus.CREATED)
      .json({ message: 'User created successfully', user, token })
  }

  @joiValidation(registerSchema)
  public async register(req: Request, res: Response) {
    const { fullname, email, password } = req.body
    const existingUser = await userService.findByEmail(email)
    if (existingUser) {
      throw new BadRequestError('User already exists')
    }
    let username = email.split('@')[0]

    username = `${username + generateId().substring(0, 5)}`

    const userObject = {
      fullname,
      email,
      password,
      username,
    } as IUserDocument
    const user = await userService.createUser(userObject)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as Secret, {
      expiresIn: '7d',
    })
    res.cookie('auth-token', token, {
      sameSite: 'lax',
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    })
    res
      .status(httpStatus.CREATED)
      .json({ message: 'User created successfully', user, token })
  }
}

export const authController: AuthController = new AuthController()
