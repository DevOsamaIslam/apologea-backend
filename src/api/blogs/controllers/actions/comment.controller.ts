import { NextFunction, Request, Response } from 'express'
import { returnHandler } from '#helpers'
import Blog from '../../model/Blog'

export default (req: Request, res: Response, next: NextFunction) => {
  let action = req.body.action === 'add' ? '$addToSet' : '$pull'
  Blog.findByIdAndUpdate(
    req.body.id,
    {
      [action]: {
        // @ts-ignore
        affirms: req.user.id,
      },
    },
    { new: true },
    (err, data) => {
      if (err) return next(returnHandler(500, err))
      if (!data) return next(returnHandler(404, null))
      return next(returnHandler(200, data))
    }
  )
}
