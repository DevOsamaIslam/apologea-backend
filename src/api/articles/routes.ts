import { getAll, getOneById } from './crud/fetch.controller'
import search from './crud/search.controller'
import { Router } from 'express'
import ensureFilters from 'api/middleware/ensureFilters'
import { protectedRoute, permissioned } from 'api/middleware/auth'
import deleteController from './crud/delete.controller'
import updateController from './crud/update.controller'
import createController, { populateFake } from './crud/create.controller'
import likeController from './actions/like.controller'
import affirmController from './actions/affirm.controller'
import commentController from './actions/comment.controller'

const router = Router()

// Article routes

router.get('/', ensureFilters, getAll)

router.get('/search', search)

router.get('/@:id', protectedRoute, getOneById)

router.post('/', protectedRoute, permissioned(2), createController)

router.post('/fake/:count', populateFake)

router.patch('/', protectedRoute, permissioned(2), updateController)

router.delete('/', protectedRoute, permissioned(2), deleteController)

// Action Routes

router.patch('/like', protectedRoute, likeController)

router.patch('/affirm', protectedRoute, affirmController)

router.patch('/comment', protectedRoute, commentController)

export default router
