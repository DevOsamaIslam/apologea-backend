import { uploadGalleryItemService } from 'api/gallery/upload/upload.service'
import { Request } from 'express'
import { runTransaction } from 'lib/helpers/transactions'
import { UserModel } from '../model/User.Model'
import { TRegistrationPayload } from '../users.schema'
import { hash } from 'bcrypt'
import { AUTH } from '@constants'
import { EmailDispatcher } from 'lib/email'

export async function registerUser(params: { input: TRegistrationPayload; req: Request }) {
  const { input, req } = params
  return runTransaction(async () => {
    input.password = await hash(input.password, AUTH.saltRounds)

    const user = new UserModel(input)

    if (req.files) {
      const data = await uploadGalleryItemService({
        req,
        fieldName: 'photo',
        userId: user._id.toString(),
      })

      user.photo = data[0]?.url
    }

    user.verification.code = crypto.randomUUID()
    user.verification.lastTry = new Date()

    await user.save()

    const dispatcher = new EmailDispatcher()

    await dispatcher.sendVerifyEmail({
      user,
      token: user.verification.code,
    })

    return user
  })
}
