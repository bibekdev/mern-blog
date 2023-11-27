import { IBlogDocument } from '@/interfaces/blog.interface'
import { Model, Schema, model } from 'mongoose'

const blogSchema: Schema<IBlogDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, lowercase: true, required: true, unique: true },
    banner: {
      type: String,
    },
    desc: {
      type: String,
      maxlength: 200,
    },
    content: {
      type: Object,
    },
    tags: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    activity: {
      total_likes: {
        type: Number,
        default: 0,
      },
      total_comments: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
      total_parent_comments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
    },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'publishedAt',
    },
  }
)

export const BlogModel: Model<IBlogDocument> = model<IBlogDocument>(
  'Blog',
  blogSchema
)
