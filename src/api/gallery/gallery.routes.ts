import { Router } from 'express'
import { getAllController } from './fetch/fetch.controller'
import { uploadController } from './upload/create.controller'

export const galleryRouter = Router()

galleryRouter.post('/', getAllController)

galleryRouter.post('/upload', uploadController)
