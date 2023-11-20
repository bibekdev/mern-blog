import cookieParser from 'cookie-parser'
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'express-async-errors'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import { CustomError, IErrorResponse } from './helpers/error-handler'
import appRoutes from './routes'

dotenv.config()

const app: Express = express()

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    credentials: true,
  })
)

app.use('/api/v1', appRoutes)
// all rountes error handlers
app.all('*', (req: Request, res: Response) => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({ message: `${req.originalUrl} not found` })
})

// handling errors and responses
app.use(
  (error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.serializeErrors())
    }
  }
)

mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err))

app.listen(8000, () => console.log('listening on port 8000'))
