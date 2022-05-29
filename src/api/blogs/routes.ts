import affirmController from './controllers/actions/affirm.controller'
import commentController from './controllers/actions/comment.controller'
import likeController from './controllers/actions/like.controller'
import create from './controllers/articles/create.controller'
import _Delete from './controllers/articles/delete.controller'
import { getAll, getOneById } from './controllers/articles/fetch.controller'
import search from './controllers/articles/search.controller'
import update from './controllers/articles/update.controller'
import { Router } from 'express'

const router = Router()

// Blog routes

router.get('/', getAll)

router.get('/search', search)

router.get('/@:id', getOneById)

router.post('/', create)

router.patch('/', update)

router.delete('/', _Delete)

// Action Routes

router.patch('/like', likeController)

router.patch('/affirm', affirmController)

router.patch('/comment', commentController)

export default router
