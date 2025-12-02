import { PaginationSchema } from '@constants'
import express from 'express'
import { protectedRoute } from 'middleware/auth.middleware'
import { validateRequest } from 'middleware/request.middleware'
import articlesControllers from './articles.controllers'
import { createArticleSchema, updateArticleSchema } from './articles.schema'

const articlesRouter = express.Router()

articlesRouter.post('/', validateRequest(PaginationSchema), articlesControllers.getAll)

articlesRouter.post(
  '/create',
  protectedRoute,
  validateRequest(createArticleSchema),
  articlesControllers.create,
)

articlesRouter.post('/:slug', validateRequest(PaginationSchema), articlesControllers.getOne)

articlesRouter.patch(
  '/:id',
  protectedRoute,
  validateRequest(updateArticleSchema),
  articlesControllers.update,
)

articlesRouter.delete('/:id', protectedRoute, articlesControllers.delete)

export default articlesRouter
