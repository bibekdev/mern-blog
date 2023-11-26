import { FiX } from 'react-icons/fi'
import AnimationWrapper from '../globals/animation-wrapper'
import { useBlog } from '@/hook/use-blog'
import { ChangeEvent, KeyboardEvent } from 'react'
import BlogTag from './blog-tag'

const BlogPublish = () => {
  const characterLimit = 200
  const tagLimit = 10
  const { setEditorState, blog, setBlog } = useBlog()

  const handleBlogTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target
    setBlog({ ...blog, title: input.value })
  }

  const handleBlogDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target
    setBlog({ ...blog, desc: input.value })
  }

  const handleDescriptionKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'Comma') {
      e.preventDefault()
      let eventTarget = e.target as HTMLInputElement
      let tag = eventTarget.value

      if ((blog?.tags?.length ?? 0) < tagLimit) {
        if (!blog?.tags?.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...(blog?.tags as string[]), tag] })
        }
      }
      eventTarget.value = ''
    }
  }

  const handleCloseBtn = () => {
    setEditorState('editor')
  }

  return (
    <AnimationWrapper>
      <section className='w-screen relative min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4'>
        <button
          className='w-12 h-12 hover:bg-grey flex items-center justify-center rounded-full hover:text-dark-grey absolute right-[5vw] z-10 top-[3%] lg:top-[10%]'
          onClick={handleCloseBtn}>
          <FiX className='w-7 h-7 text-dark-grey' />
        </button>

        <div className='w-full center'>
          <p className='text-dark-grey mb-1'>Preview</p>

          <div className='w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4'>
            <img src={blog?.banner} alt='banner' />
          </div>

          <h1 className=' text-3xl font-medium mt-2 leading-tight w-full word-break overflow-hidden'>
            {blog?.title}
          </h1>

          <p className='font-gelasio w-full text-xl leading-7 mt-4 overflow-hidden'>
            {blog?.desc}
          </p>
        </div>

        <div className='border-grey lg:border-1 lg:pl-8'>
          <p className='text-dark-grey mb-2 mt-9'>Blog Title</p>
          <input
            type='text'
            placeholder='Blog Title'
            defaultValue={blog?.title}
            className='input-box pl-4'
            onChange={handleBlogTitleChange}
          />

          <p className='text-dark-grey mb-2 mt-9'>Blog Description</p>
          <textarea
            maxLength={characterLimit}
            defaultValue={blog?.desc}
            className='h-40 resize-none leading-7 input-box pl-4'
            onChange={handleBlogDescriptionChange}
            onKeyDown={handleDescriptionKeyDown}
          />
          <p className='mt-1 text-dark-grey text-sm text-right'>
            {characterLimit - (blog?.desc?.length ?? 0)}/{characterLimit}
          </p>

          <p className='text-dark-grey mb-2 mt-9'>
            Topics - (Helps in searching and ranking your blog)
          </p>
          <div className='relative input-box pl-2 py-2 pb-4'>
            <input
              type='text'
              placeholder='Topic'
              className='sticky input-box bg-white focus:bg-white top-0 left-0 pl-4 mb-3'
              onKeyDown={handleTagKeyDown}
            />
            {blog?.tags?.length !== 0 &&
              blog?.tags?.map((tag, index) => (
                <BlogTag key={index} tagIndex={index} tag={tag} />
              ))}
          </div>
          <p className='mt-1 mb-4 text-dark-grey text-right'>
            {tagLimit - (blog?.tags?.length ?? 0)}/{tagLimit}
          </p>

          <button className='btn-dark px-8'>Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  )
}
export default BlogPublish
