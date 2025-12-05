import z from 'zod'

export const NotificationTypes = z.enum([
  'newArticle',
  'newDebate',
  'challengeAccepted',
  'response',
])

export const NOTIFICATION_TYPES = NotificationTypes.enum

export const NotificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: NotificationTypes,
  data: z.date(),
  readAt: z.date().optional(),
})

export type TNotification = z.infer<typeof NotificationSchema>
