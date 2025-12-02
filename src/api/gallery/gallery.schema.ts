import { z } from 'zod'

export const GallerySchema = z.object({
  userId: z.string(),
  url: z.string(),
})

export const CreateGalleryItemSchema = GallerySchema.pick({ url: true })

export type TCreateGalleryItemPayload = z.infer<typeof CreateGalleryItemSchema>
