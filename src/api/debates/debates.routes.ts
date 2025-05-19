import { PaginationSchema } from '@constants'
import { Router } from 'express'
import { validateRequest } from 'middleware/request.middleware'
import debatesControllers from './debates.controllers'
import { createDebateSchema, updateDebateSchema } from './debates.schemas'
import { protectedRoute } from 'middleware/auth.middleware'

const debatesRouter = Router()

debatesRouter.post('/', validateRequest(PaginationSchema), debatesControllers.getAll)

debatesRouter.post('/create', protectedRoute, validateRequest(createDebateSchema), debatesControllers.create)

debatesRouter.post('/:slug', validateRequest(PaginationSchema), debatesControllers.getOne)

debatesRouter.patch('/:id', protectedRoute, validateRequest(updateDebateSchema), debatesControllers.update)

debatesRouter.delete('/:id', protectedRoute, debatesControllers.delete)

export default debatesRouter
