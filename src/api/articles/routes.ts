import { fetchAllArticlesController, fetchOneArticleByIdController, fetchTopArticlesController } from './read/fetch.controller'
import search from './read/search.controller'
import { Router } from 'express'
import ensureFilters from 'middleware/filters.middleware'
import { protectedRoute, permissioned } from 'middleware/auth.middleware'
import deleteController from './delete/delete.controller'
import updateController from './update/update.controller'
import createController, { populateFake } from './create/create.controller'
import likeController from './action.like/like.controller'
import affirmController from './action.affirm/affirm.controller'
import commentController from './action.comment/comment.controller'
import { ROLES } from '@constants'

const router = Router()

// /api/routes/

router.get('/', ensureFilters, fetchAllArticlesController)

router.get('/search', search)

router.get('/@:articleId', protectedRoute, fetchOneArticleByIdController)

router.get('/top', fetchTopArticlesController)

router.post('/', protectedRoute, permissioned(ROLES.PUBLISHER.permission), createController)

router.post('/fake/:count', protectedRoute, permissioned(ROLES.ADMIN.permission), populateFake)

router.patch('/@:articleId', protectedRoute, permissioned(ROLES.PUBLISHER.permission), updateController)

router.delete('/@:articleId', protectedRoute, permissioned(ROLES.PUBLISHER.permission), deleteController)

// Action Routes

router.patch('/like', protectedRoute, likeController)

router.patch('/affirm', protectedRoute, affirmController)

router.patch('/comment', protectedRoute, commentController)

export default router
