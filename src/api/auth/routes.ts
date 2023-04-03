import { Router } from 'express'
import { protectedRoute } from 'middleware/auth.middleware'
import fetchUserController from './control/fetch-user/fetchUser.controller'
import loginController from './control/login/login.controller'
import registerController from './control/register/register.controller'
import forgotController from './control/reset/forgot.controller'
import resetController from './control/reset/reset.controller'
import verifyTokenController from './control/reset/verifyToken.controller'

const router = Router()

router.get('/', protectedRoute, fetchUserController)

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/forgot', forgotController)

router.post('/verify-token', verifyTokenController)

router.post('/reset', resetController)

export default router
