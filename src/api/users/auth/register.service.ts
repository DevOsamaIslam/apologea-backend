import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/User.Model'
import { TRegistrationPayload } from '../users.schema'
import { runTransaction } from 'lib/helpers/transactions'
import { uploadGalleryItemService } from 'api/gallery/upload/upload.service'
import { Request } from 'express'

export async function registerUser(params: { input: TRegistrationPayload; req: Request }) {
  const { input, req } = params
  return runTransaction(async () => {
    const user = new UserModel(input)

    const data = await uploadGalleryItemService({
      req,
      fieldName: 'photo',
      userId: user.id,
    })

    user.photo = data[0].url
    await user.save()

    return user
  })
}
