import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import loginController from './controllers/login.controller'
import registerController from './controllers/register.controller'

const router = Router()

router.get('/', (req: Request, res: Response) =>
	res.status(StatusCodes.OK).send('Auth')
)

router.post('/register', registerController)

router.post('/login', loginController)

export default router
