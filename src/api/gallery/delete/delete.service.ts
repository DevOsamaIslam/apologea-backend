import { handleFileDeletion, handleFileUpload } from 'lib/helpers/files'
import { GalleryModel } from '../model/Gallery.Model'
import { Request } from 'express'
import { runTransaction } from '@helpers'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'

export const deleteGalleryItemService = async (itemId: string) => {
  return runTransaction(async () => {
    const item = await GalleryModel.findByIdAndDelete(itemId)
    if (!item) {
      throw new ServerError({
        message: 'Item not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }
    const deleted = await item.deleteOne().exec()

    if (deleted.acknowledged) {
      handleFileDeletion(item.url.split('uploads/')[1])
    }

    return { item, deleted }
  })
}
