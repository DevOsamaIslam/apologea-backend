import deleteController from './delete/delete.controller'
import { getPublishers, getPublisherById } from './profile/fetch.controller'
import followController from './actions.follow/follow.controller'
import updateController from './update/update.controller'
import { Router } from 'express'
import { permissioned, protectedRoute } from 'middleware/auth'
import ensureFilters from 'middleware/filters.middleware'

const publisherRoutes = Router()

publisherRoutes.get('/', ensureFilters, getPublishers)

publisherRoutes.get('/@:userId', protectedRoute, getPublisherById)

publisherRoutes.patch('/follow/@:userId', protectedRoute, followController)

publisherRoutes.patch('/@:userId', protectedRoute, permissioned(2), updateController)

publisherRoutes.delete('/@:userId', protectedRoute, permissioned(2), deleteController)

export default publisherRoutes
