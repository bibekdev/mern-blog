import { FiArrowLeft } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import AnimationWrapper from '../globals/animation-wrapper'
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { useBlog } from '@/hook/use-blog'
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs'
import { editorTools } from '@/utils/editor-tools'
import { toast } from 'react-toastify'

const BlogEditor = () => {
  const navigate = useNavigate()
  const { blog, setBlog, setEditorState } = useBlog()
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      const editorConfig: EditorConfig = {
        holder: 'textEditor',
        placeholder: "Let's write some interesting story",
        tools: editorTools,
        data: blog?.content,
      }

      const editorInstance = new EditorJS(editorConfig)
      editorRef.current = editorInstance
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [])

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target
    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'
    setBlog({ ...blog, title: input.value })
  }

  const handleBannerUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0]

    if (imgFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        setBlog({ ...blog, banner: base64String })
      }
      reader.readAsDataURL(imgFile)
    }
  }

  const handlePublistEvent = () => {
    if (!blog?.banner) {
      toast.error('Please provide a blog banner')
      return
    }
    if (!blog?.title) {
      toast.error('Please provide a blog title')
      return
    }
    editorRef.current?.save().then((outputData: OutputData) => {
      setBlog({ ...blog, content: outputData })
    })
    setEditorState('publish')
  }

  return (
    <>
      <nav className='z-10 sticky top-0 border-b border-grey bg-white h-[80px] px-[5vw] py-5 flex items-center gap-12 w-full'>
        <button
          className='w-12 flex items-center justify-center h-12 bg-grey rounded-full'
          onClick={() => navigate(-1)}>
          <FiArrowLeft className='text-2xl text-dark-grey' />
        </button>
        <Link to='/' className='flex-none w-10'>
          <img src='/logo.png' alt='logo' className='w-full' />
        </Link>

        <div className='flex items-center gap-5 ml-auto'>
          <button className='btn-dark py-2' onClick={handlePublistEvent}>
            Publish
          </button>
          <button className='btn-light py-2'>Save As Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className='h-cover max-w-[900px] w-full center'>
            <div className='aspect-video mt-10 border-4 border-grey hover:opacity-70'>
              <label htmlFor='editorImageId'>
                <img
                  src={`${blog?.banner ? blog.banner : '/blog-banner.png'}`}
                  alt='hello'
                  className='cursor-pointer w-full h-full object-cover'
                />
                <input
                  type='file'
                  accept='.png,.jpg,.jpeg'
                  hidden
                  id='editorImageId'
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <textarea
              className='mt-5 text-3xl outline-none w-full resize-none font-bold text-dark-grey'
              placeholder='Blog Title'
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <hr className='w-full opacity-10 my-5' />

            <div id='textEditor' className='font-gelasio'></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}
export default BlogEditor
