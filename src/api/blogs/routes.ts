import { Router } from 'express'
import create from './controllers/articles/create.controller'
import _Delete from './controllers/articles/delete.controller'
import { getAll, getOneById } from './controllers/articles/fetch.controller'
import search from './controllers/articles/search.controller'
import update from './controllers/articles/update.controller'

const router = Router()

router.get('/', getAll)

router.get('/search', search)

router.get('/:id', getOneById)

router.post('/', create)

router.patch('/', update)

router.delete('/', _Delete)

export default router
