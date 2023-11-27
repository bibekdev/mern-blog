import { Schema, Document } from 'mongoose'

export interface IBlogDocument extends Document {
  _id: Schema.Types.ObjectId | string
  title: string
  slug: string
  banner?: string
  desc?: string
  content?: any[]
  tags?: string[]
  author: Schema.Types.ObjectId
  activity: Activity
  comments?: Schema.Types.ObjectId[]
  draft: boolean
}

interface Activity {
  total_likes: number
  total_comments: number
  total_reads: number
  total_parent_comments: number
}
