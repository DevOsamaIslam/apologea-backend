import { handleFileUpload } from 'lib/helpers/files'
import { GalleryModel } from '../model/Gallery.Model'
import { Request } from 'express'
import { runTransaction } from '@helpers'

export const uploadGalleryItemService = async (params: {
  req: Request
  fieldName: string
  userId: string
}) => {
  return runTransaction(async () => {
    const { req, fieldName, userId } = params

    const URLs = await handleFileUpload({
      files: req.files?.[fieldName],
      targetFolder: userId,
    })

    return GalleryModel.insertMany(URLs.map(url => ({ userId, url })))
  })
}
