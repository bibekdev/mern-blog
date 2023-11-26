import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { OutputData } from '@editorjs/editorjs'

interface IBlog {
  banner?: string
  title?: string
  desc?: string
  content?: OutputData
  tags?: string[]
}

export interface IBlogContext {
  blog: null | IBlog
  setBlog: Dispatch<SetStateAction<IBlog>>
  editorState: string
  setEditorState: Dispatch<SetStateAction<string>>
}

export const BlogContext = createContext<IBlogContext>({} as IBlogContext)

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [blog, setBlog] = useState<IBlog>({
    title: '',
    desc: '',
    content: {} as OutputData,
    tags: [],
    banner: '',
  })
  const [editorState, setEditorState] = useState<string>('editor')
  return (
    <BlogContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
      }}>
      {children}
    </BlogContext.Provider>
  )
}
