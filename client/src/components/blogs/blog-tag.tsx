import { useBlog } from '@/hook/use-blog'
import { KeyboardEvent, MouseEventHandler } from 'react'
import { FiX } from 'react-icons/fi'

interface BlogTagProps {
  tag: string
  tagIndex: number
}

const BlogTag: React.FC<BlogTagProps> = ({ tag, tagIndex }) => {
  const { blog, setBlog } = useBlog()

  const addEditable: MouseEventHandler<HTMLParagraphElement> = e => {
    const eventTarget = e.target as HTMLParagraphElement
    if (eventTarget) {
      eventTarget.setAttribute('contentEditable', 'true')
      eventTarget.focus()
    }
  }

  const handleTagEdit = (e: KeyboardEvent<HTMLParagraphElement>) => {
    if (e.code === 'Enter' || e.code === 'Comma') {
      e.preventDefault()
      let currentTag = e.currentTarget.innerText
      if (blog?.tags) {
        const updatedTags = blog.tags.map((value, index) =>
          index === tagIndex ? currentTag : value
        )
        setBlog({ ...blog, tags: updatedTags })
        e.currentTarget.setAttribute('contentEditable', 'false')
      }
    }
  }

  const handleTagDelete = () => {
    const filterTags = blog?.tags?.filter(t => t !== tag)
    setBlog({ ...blog, tags: filterTags })
  }

  return (
    <div className='relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10'>
      <p
        className='outline-none'
        onClick={addEditable}
        onKeyDown={handleTagEdit}
        role='presentation' // To prevent accessibility issues due to contentEditable
      >
        {tag}
      </p>
      <button
        className='mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2'
        onClick={handleTagDelete}>
        <FiX className='text-xl pointer-events-auto' />
      </button>
    </div>
  )
}

export default BlogTag
