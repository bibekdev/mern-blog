import { Document, Schema } from 'mongoose'

export interface ICommentDocument extends Document {
  _id: Schema.Types.ObjectId | string
  blog_id: Schema.Types.ObjectId
  comment: string
  children?: Schema.Types.ObjectId[]
  commented_by: Schema.Types.ObjectId
  isReply?: boolean
  parent?: Schema.Types.ObjectId
}
