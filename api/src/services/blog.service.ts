import { IBlogDocument } from '@/interfaces/blog.interface'
import { BlogModel } from '@/models/blog.model'
import { UserModel } from '@/models/user.model'

class BlogService {
  public async createBlog(data: IBlogDocument, userId: string) {
    const blog = await BlogModel.create(data)
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $inc: { 'account_info.total_posts': data.draft ? 1 : 0 },
        $push: { blogs: blog._id },
      }
    )
  }

  public async findBySlug(slug: string) {}
}

export const blogService: BlogService = new BlogService()
