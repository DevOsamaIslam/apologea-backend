import deleteController from './controllers/delete.controller'
import { getPublishers, getPublisherById } from './controllers/fetch.controller'
import followController from './controllers/follow.controller'
import updateController from './controllers/update.controller'
import { Router } from 'express'
import { permissioned, protectedRoute } from 'api/middleware/auth'
import ensureFilters from 'api/middleware/ensureFilters'

const publisherRoutes = Router()

publisherRoutes.get('/', ensureFilters, getPublishers)

publisherRoutes.get('/@:id', protectedRoute, getPublisherById)

publisherRoutes.patch('/follow', protectedRoute, followController)

publisherRoutes.patch('/@:id', protectedRoute, permissioned(2), updateController)

publisherRoutes.delete('/@:id', protectedRoute, permissioned(2), deleteController)

export default publisherRoutes
