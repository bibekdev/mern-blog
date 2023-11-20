import { ICommentDocument } from '@/interfaces/comment.interface'
import { Model, Schema, model } from 'mongoose'

const commentSchema: Schema<ICommentDocument> = new Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Blog',
    },
    // blog_author: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'blogs',
    // },
    comment: {
      type: String,
      required: true,
    },
    children: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
    },
    commented_by: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    isReply: {
      type: Boolean,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  {
    timestamps: {
      createdAt: 'commentedAt',
    },
  }
)

export const CommentModel: Model<ICommentDocument> = model<ICommentDocument>(
  'Comment',
  commentSchema
)
