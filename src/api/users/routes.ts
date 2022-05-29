import deleteController from './controllers/delete.controller'
import getUser, { getUserById } from './controllers/fetch.controller'
import followController from './controllers/follow.controller'
import updateController from './controllers/update.controller'
import { Router } from 'express'

const router = Router()

router.get('/', getUser)

router.get('/@:id', getUserById)

router.patch('/follow', followController)

router.patch('/@:id', updateController)

router.delete('/@:id', deleteController)

export default router
