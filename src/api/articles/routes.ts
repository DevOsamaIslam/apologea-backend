import commentController from './controllers/actions/comment.controller'
import likeController from './controllers/actions/like.controller'
import { createArticle } from './controllers/articles/create.controller'
import { getAll, getOneById } from './controllers/articles/fetch.controller'
import search from './controllers/articles/search.controller'
import update from './controllers/articles/update.controller'
import { Router } from 'express'
import ensureFilters from 'api/middleware/ensureFilters'
import { protectedRoute, permissioned } from 'api/middleware/auth'
import affirmController from './controllers/actions/affirm.controller'
import deleteController from './controllers/articles/delete.controller'
import updateController from './controllers/articles/update.controller'

const router = Router()

// Article routes

router.get('/', ensureFilters, getAll)

router.get('/search', search)

router.get('/@:id', protectedRoute, getOneById)

router.post('/', protectedRoute, permissioned(2), createArticle)

router.patch('/', protectedRoute, permissioned(2), updateController)

router.delete('/', protectedRoute, permissioned(2), deleteController)

// Action Routes

router.patch('/like', protectedRoute, likeController)

router.patch('/affirm', protectedRoute, affirmController)

router.patch('/comment', protectedRoute, commentController)

export default router
