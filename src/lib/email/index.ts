import { TUserDocument } from 'api/users/model/User.Model.js'
import { TUser } from 'api/users/users.schema.js'
import { NO_REPLY_EMAIL, RESEND_API } from 'app/settings'
import { Resend } from 'resend'
import { resetPasswordTemplate } from './templates/reset-password.template'
import { verificationSuccessTemplate } from './templates/verification-success.template'
import { verifyEmailTemplate } from './templates/verify-email.template'

class EmailDispatcher {
  private resend: Resend
  private from: string

  constructor() {
    this.resend = new Resend(RESEND_API)
    this.from = NO_REPLY_EMAIL
  }

  private async send(to: string, subject: string, html: string) {
    const data = await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    })

    return data
  }

  sendVerifyEmail(params: { user: TUserDocument; token: string }) {
    const { user, token } = params

    return this.send(
      user.email,
      'Verify your email',
      verifyEmailTemplate({ username: user.username, userId: user.id, token }),
    )
  }

  sendVerificationSuccess(params: { user: TUserDocument }) {
    const { user } = params

    return this.send(
      user.email,
      'Email Verified Successfully',
      verificationSuccessTemplate({ username: user.username }),
    )
  }

  sendResetPassword(params: { user: TUser; token: string }) {
    const { user, token } = params

    return this.send(
      user.email,
      'Reset your password',
      resetPasswordTemplate({ userName: user.username, token }),
    )
  }
}

export { EmailDispatcher }
