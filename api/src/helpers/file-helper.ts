import fs from 'fs'
import path from 'path'
import { v4 } from 'uuid'

export function base64toFile(base64: string) {
  const base64Image = base64.replace(/^data:image\/\w+;base64,/, '')
  const imageBuffer = Buffer.from(base64Image, 'base64')
  const fileName = `image_${v4()}.png`
  const filePath = path.join(__dirname, 'src', 'uploads', fileName)
  fs.writeFileSync(filePath, imageBuffer)
  return `http://localhost:8000/uploads/${fileName}`
}
