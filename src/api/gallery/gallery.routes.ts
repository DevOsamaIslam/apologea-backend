import { Router } from 'express'
import galleryControllers from './gallery.controllers'

export const galleryRouter = Router()

galleryRouter.post('/', galleryControllers.getAll)

galleryRouter.post('/upload', galleryControllers.upload)
