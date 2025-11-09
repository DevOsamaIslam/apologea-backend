import { Router } from 'express'
import { protectedRoute } from '../../middleware/auth.middleware'

const router = Router()

// router.post('/', protectedRoute, createSubscriptionController)
// router.get('/', protectedRoute, fetchSubscriptionsController)
// router.put('/:id', protectedRoute, updateSubscriptionController)
// router.delete('/:id', protectedRoute, deleteSubscriptionController)

export { router as subscriptionRoutes }
