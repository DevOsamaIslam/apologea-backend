import { IReturnHandler } from '@types'
import articlesRouter from 'api/articles/articles.routes'
import debatesRouter from 'api/debates/debates.routes'
import { galleryRouter } from 'api/gallery/gallery.routes'
import { userRouter } from 'api/users/users.routes'
import { subscriptionRoutes } from 'api/subscriptions/subscriptions.routes'
import { NextFunction, Request, Response, Router } from 'express'
import { protectedRoute } from 'middleware/auth.middleware'

const router = Router()

router.use('/articles', articlesRouter)

router.use('/debates', debatesRouter)

router.use('/users', userRouter)

router.use('/gallery', protectedRoute, galleryRouter)

router.use('/subscriptions', subscriptionRoutes)

router.use((pack: IReturnHandler, _req: Request, res: Response, next: NextFunction) => {
  const { statusCode, data, feedback } = pack
  next
  const payload = { payload: data, feedback, statusCode }
  return res.status(statusCode).json(payload)
})

export default router
