import { IUserDocument } from '@/interfaces/user.interface'
import { Model, Schema, model } from 'mongoose'
import * as argon from 'argon2'

const profileImgsNameList: string[] = [
  'Garfield',
  'Tinkerbell',
  'Annie',
  'Loki',
  'Cleo',
  'Angel',
  'Bob',
  'Mia',
  'Coco',
  'Gracie',
  'Bear',
  'Bella',
  'Abby',
  'Harley',
  'Cali',
  'Leo',
  'Luna',
  'Jack',
  'Felix',
  'Kiki',
]
const profileImgsCollectionsList: string[] = [
  'notionists-neutral',
  'adventurer-neutral',
  'fun-emoji',
]

const userSchema: Schema<IUserDocument> = new Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [3, 'fullname must be 3 letters long'],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: String,
    username: {
      type: String,
      minlength: [3, 'Username must be 3 letters long'],
      unique: true,
    },
    bio: {
      type: String,
      maxlength: [200, 'Bio should not be more than 200'],
      default: '',
    },
    profile_img: {
      type: String,
      default: () => {
        return `https://api.dicebear.com/6.x/${
          profileImgsCollectionsList[
            Math.floor(Math.random() * profileImgsCollectionsList.length)
          ]
        }/svg?seed=${
          profileImgsNameList[
            Math.floor(Math.random() * profileImgsNameList.length)
          ]
        }`
      },
    },
    social_links: {
      youtube: {
        type: String,
        default: '',
      },
      instagram: {
        type: String,
        default: '',
      },
      facebook: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
      github: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
    },
    account_info: {
      total_posts: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: 'Blog',
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'joinedAt',
    },
    toJSON: {
      transform(_doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (this: IUserDocument, next: () => void) {
  if (this.isModified('password')) {
    const hashedPassword: string = await argon.hash(this.password as string)
    this.password = hashedPassword
    next()
  }
})

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return argon.verify(this.password as string, password)
}

export const UserModel: Model<IUserDocument> = model<IUserDocument>(
  'User',
  userSchema
)
