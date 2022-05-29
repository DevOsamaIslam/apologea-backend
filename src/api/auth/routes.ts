import loginController from './controllers/login.controller'
import registerController from './controllers/register.controller'
import forgotController from './controllers/reset/forgot.controller'
import resetController from './controllers/reset/reset.controller'
import verifyTokenController from './controllers/reset/verifyToken.controller'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (req: Request, res: Response) =>
	res.status(StatusCodes.OK).send('Auth')
)

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/forgot', forgotController)

router.post('/verify-token', verifyTokenController)

router.post('/reset', resetController)

export default router
