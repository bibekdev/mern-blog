import { Document, Schema } from 'mongoose'

export interface IUserDocument extends Document {
  _id: Schema.Types.ObjectId | string
  fullname: string
  email: string
  password?: string
  username?: string
  bio?: string
  profile_img?: string
  social_links: SocialLinks
  account_info: AccountInfo
  blogs: Schema.Types.ObjectId[]
  comparePassword: (password: string) => Promise<boolean>
}

interface SocialLinks {
  youtube?: string
  instagram?: string
  facebook?: string
  twitter?: string
  github?: string
  website?: string
}

interface AccountInfo {
  total_posts: number
  total_reads: number
}
