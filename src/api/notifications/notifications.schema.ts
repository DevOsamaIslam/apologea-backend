import z from 'zod'

export const NotificationTypes = z.enum([
  'newArticle',
  'newDebate',
  'challengeAccepted',
  'response',
])

export type TNotificationType = z.infer<typeof NotificationTypes>

export const NOTIFICATION_TYPES = NotificationTypes.enum

export const NotificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: NotificationTypes,
  data: z.any(),
  readAt: z.date().optional(),
})

export type TNotification = z.infer<typeof NotificationSchema>

export const CreateNotificationSchema = NotificationSchema.omit({ id: true })

export type TCreateNotification = z.infer<typeof CreateNotificationSchema>
