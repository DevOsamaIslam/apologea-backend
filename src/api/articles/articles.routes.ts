import { PaginationSchema } from '@constants'
import { Router } from 'express'
import { validateRequest } from 'middleware/request.middleware'
import articlesControllers from './articles.controllers'
import { createArticleSchema, updateArticleSchema } from './articles.schema'
import { protectedRoute } from 'middleware/auth.middleware'

const articlesRouter = Router()

articlesRouter.post('/', validateRequest(PaginationSchema), articlesControllers.getAll)

articlesRouter.post('/create', protectedRoute, validateRequest(createArticleSchema), articlesControllers.create)

articlesRouter.post('/:slug', validateRequest(PaginationSchema), articlesControllers.getOne)

articlesRouter.patch('/:id', protectedRoute, validateRequest(updateArticleSchema), articlesControllers.update)

articlesRouter.delete('/:id', protectedRoute, articlesControllers.delete)

export default articlesRouter
