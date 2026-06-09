import { NO_REPLY_EMAIL } from 'app/settings'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)

export interface ISendEmailOptions {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (options: ISendEmailOptions) => {
  const { to, subject, html } = options

  const data = await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to,
    subject,
    html,
  })

  return data
}
