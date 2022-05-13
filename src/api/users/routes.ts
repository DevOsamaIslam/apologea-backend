import { Router } from 'express'
import updateController from './controllers/update.controller'
import getUser from './controllers/view.controller'
import deleteController from './controllers/delete.controller'

const router = Router()

router.get('/', getUser)

router.get('/:id', getUser)

router.patch('/:id', updateController)

router.delete('/:id', deleteController)

export default router
