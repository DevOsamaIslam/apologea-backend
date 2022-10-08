import loginController from './control/login/login.controller'
import registerController from './control/register/register.controller'
import forgotController from './control/reset/forgot.controller'
import resetController from './control/reset/reset.controller'
import verifyTokenController from './control/reset/verifyToken.controller'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (req: Request, res: Response) => res.status(StatusCodes.OK).send('Auth'))

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/forgot', forgotController)

router.post('/verify-token', verifyTokenController)

router.post('/reset', resetController)

export default router
