import { runTransaction } from '@helpers'
import { UserModel } from './model/User.Model'
import { APOLOGIES_QUOTA } from 'app/settings'

export default () => {
  const today = new Date()

  runTransaction(async () => {
    const users = await UserModel.find()
    users.forEach(user => {
      // reset the monthly quota
      if (today.getDay() === 1) {
        user.apologiaQuota = APOLOGIES_QUOTA
      }

      user.save()
    })
  })
}
