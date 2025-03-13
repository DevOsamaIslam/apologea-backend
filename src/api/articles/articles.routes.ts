import { PaginationSchema } from '@constants'
import { Router } from 'express'
import { validateRequest } from 'middleware/request.middleware'
import articlesControllers from './articles.controllers'
import { createArticleSchema, updateArticleSchema } from './articles.schemas'
import { protectedRoute } from 'middleware/auth.middleware'

const articlesRouter = Router()

articlesRouter.post('/', validateRequest(PaginationSchema), articlesControllers.getAll)

articlesRouter.post('/create', protectedRoute, validateRequest(createArticleSchema), articlesControllers.create)

articlesRouter.post('/:slug', validateRequest(PaginationSchema), articlesControllers.getOne)

articlesRouter.patch('/:id', protectedRoute, validateRequest(updateArticleSchema), articlesControllers.update)

export default articlesRouter
