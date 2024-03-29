import { Document, Schema } from 'mongoose'

export interface INotificationDocument extends Document {
  type: 'like' | 'comment' | 'reply'
  blog: Schema.Types.ObjectId
  notification_for: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
  comment?: Schema.Types.ObjectId
  reply?: Schema.Types.ObjectId
  replied_on_comment?: Schema.Types.ObjectId
  seen: boolean
}
