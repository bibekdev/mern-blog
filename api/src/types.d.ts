declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      DATABASE_URL: string
      JWT_SECRET: string
      CLIENT_URL: string
    }
  }

  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export {}
