import { base64toFile } from '@/helpers/file-helper'
import { joiValidation } from '@/helpers/validation'
import { IBlogDocument } from '@/interfaces/blog.interface'
import { blogService } from '@/services/blog.service'
import { createBlogSchema } from '@/validaton-schema/blog'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import slugify from 'slugify'

class BlogController {
  @joiValidation(createBlogSchema)
  public async createBlog(req: Request, res: Response) {
    const { title, banner, desc, content, tags, draft } = req.body

    const lowercaseTags = tags.map((t: string) => t.toLowerCase())
    const bannerUrl = base64toFile(banner)

    const blogObject = {
      title,
      slug: slugify(title),
      banner: bannerUrl,
      desc,
      content,
      tags: lowercaseTags,
      author: req.userId!,
      draft: draft ? true : false,
    } as unknown as IBlogDocument

    await blogService.createBlog(blogObject, req.userId!)

    res
      .status(httpStatus.CREATED)
      .json({ message: 'Blog created successfully' })
  }
}

export const blogController: BlogController = new BlogController()
