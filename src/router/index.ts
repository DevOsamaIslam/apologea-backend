import { IReturnHandler } from '#lib/types'
import authRoutes from '../api/auth/routes'
import blogRoutes from '../api/blogs/routes'
import userRoutes from '../api/users/routes'
import { NextFunction, Request, Response, Router } from 'express'

// import debateRoutes from '../api/debate/routes'

const router = Router()

// router.use(sanitizeRequest)

router.use('/auth', authRoutes)

router.use('/users', userRoutes)

router.use('/blogs', blogRoutes)

// router.use('/debates', authRoutes)

router.use(
	(pack: IReturnHandler, _req: Request, res: Response, next: NextFunction) => {
		const { statusCode, data, feedback } = pack
		next
		return res.status(statusCode).json({ data, feedback })
	}
)

export default router
