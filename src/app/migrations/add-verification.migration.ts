import { UserModel } from '@api/users/model/User.Model'
import { runTransaction } from '@helpers'

export default () => {
  runTransaction(async () => {
    const users = await UserModel.find()
    users.forEach(user => {
      if (!user.verification) {
        user.verification = {
          verifiedAt: null,
          code: null,
          lastTry: null,
        }
        user.save()
      }
    })
  })
}
