import { ServerError } from '@/application/errors/http'

import { RequestHandler } from 'express'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer({ dest: 'uploads/' }).single('file')

  upload(req, res, error => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ServerError(error).message })
    }

    if (req.file !== undefined) {
      req.body = { ...req.body, file: { buffer: req.file.buffer, mimeType: req.file.mimetype, path: req.file.path } }
    }
    next()
  })
}
