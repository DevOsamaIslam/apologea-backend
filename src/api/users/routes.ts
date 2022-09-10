import deleteController from './controllers/delete.controller'
import { getPublishers, getPublisherById } from './controllers/fetch.controller'
import followController from './controllers/follow.controller'
import updateController from './controllers/update.controller'
import { Router } from 'express'

const publisherRoutes = Router()

publisherRoutes.get('/', getPublishers)

publisherRoutes.get('/@:id', getPublisherById)

publisherRoutes.patch('/follow', followController)

publisherRoutes.patch('/@:id', updateController)

publisherRoutes.delete('/@:id', deleteController)

export default publisherRoutes
