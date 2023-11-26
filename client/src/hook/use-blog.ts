import { BlogContext, IBlogContext } from '@/providers/blog-provider'
import { useContext } from 'react'

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context as IBlogContext
}
