import { handleFileUpload } from 'lib/helpers/files'
import { GalleryModel } from '../model/Gallery.Model'
import { Request } from 'express'

export const uploadGalleryItemService = async (params: {
  req: Request
  fieldName: string
  userId: string
}) => {
  const { req, fieldName, userId } = params

  const URLs = await handleFileUpload({
    fieldName,
    req,
    targetFolder: userId,
  })

  return GalleryModel.insertMany(URLs.map(url => ({ userId, url })))
}
