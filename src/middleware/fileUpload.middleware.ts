import { feedback, returnHandler } from '@helpers'
import { MAX_FILE_SIZE } from 'app/settings'
import fileUpload from 'express-fileupload'
import { StatusCodes } from 'http-status-codes'

export const fileUploadMiddleware = fileUpload({
  debug: true,
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  limitHandler: (req, res, next) =>
    next(returnHandler(StatusCodes.BAD_REQUEST, null, feedback('error', 'File size must be 5 MB or smaller'))),
})
