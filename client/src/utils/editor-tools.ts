// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import ImageTool from '@editorjs/image'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import Marker from '@editorjs/marker'
// @ts-ignore
import InlineCode from '@editorjs/inline-code'

export const editorTools = {
  embed: Embed,
  list: { class: List, inlineToolbar: true },
  image: {
    class: ImageTool,
    inlineToolbar: true,
    config: {
      uploader: {
        async uploadByUrl(file: any) {
          console.log('Yoyo', file)
          let link = new Promise((resolve, reject) => {
            try {
              resolve(file)
            } catch (error) {
              reject(error)
            }
          })

          return link.then(url => {
            console.log('I am god', url)
            return {
              success: 1,
              file: { url },
            }
          })
        },
        async uploadByFile(file: any) {
          console.log('File', file)
          try {
            const base64String = await readFileAsDataURL(file)

            console.log(base64String)

            return {
              success: 1,
              file: { url: base64String },
            }
          } catch (error) {
            console.error(error)
            return {
              success: 0,
              error: { message: 'Failed to upload by file' },
            }
          }
        },
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Type heading',
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: { class: Quote, inlineToolbar: true },
  marker: Marker,
  inlineCode: InlineCode,
}

async function readFileAsDataURL(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const base64String = e.target?.result
      resolve(base64String)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
