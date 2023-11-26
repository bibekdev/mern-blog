import BlogEditor from '@/components/blogs/blog-editor'
import BlogPublish from '@/components/blogs/blog-publish'
import { useBlog } from '@/hook/use-blog'

const EditorPage = () => {
  const { editorState } = useBlog()

  return editorState === 'editor' ? <BlogEditor /> : <BlogPublish />
}
export default EditorPage
