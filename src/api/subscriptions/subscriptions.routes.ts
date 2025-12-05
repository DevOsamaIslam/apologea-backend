import { Router } from 'express'
import { protectedRoute } from '../../middleware/auth.middleware'
import { createSubscriptionController } from './create/create.controller'
import { fetchSubscriptionsController } from './fetch/fetch.controller'
import { updateSubscriptionController } from './update/update.controller'
import { deleteSubscriptionController } from './delete/delete.controller'

const router = Router()

router.post('/', protectedRoute, createSubscriptionController)
router.get('/', protectedRoute, fetchSubscriptionsController)
router.put('/:id', protectedRoute, updateSubscriptionController)
router.delete('/:id', protectedRoute, deleteSubscriptionController)

export { router as subscriptionRoutes }
