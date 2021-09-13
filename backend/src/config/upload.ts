import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

export default {
  avatarFolder: path.resolve(__dirname, '..', '..', 'tmp', 'avatar'),
  defaultDirectory: path.resolve(__dirname, '..', '..', 'tmp'),
  upload(folder = './tmp') {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex")
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}