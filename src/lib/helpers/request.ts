import { decode } from 'decode-formdata'
import { NextFunction, Request } from 'express'

export const sanitizeRequest = (req: Request, _res: Response, next: NextFunction) => {
  // sanitize request body
  Object.keys(req.body).forEach((key: string) => {
    req.body[key] = ''
  })
  // sanitize request params
  Object.keys(req.params).forEach((key: string) => {
    req.body[key] = ''
  })
  // sanitize request query
  Object.keys(req.query).forEach((key: string) => {
    req.body[key] = ''
  })

  next()
}

export const decodeFormData = (data: Record<string, any>) => {
  const result: Record<string, any> = {}

  for (const flatKey in data) {
    const value = data[flatKey]
    const path = flatKey
      // split by brackets or dot notation; you might use regex
      .replace(/\]/g, '')
      .split(/\.|\[/)

    let cur = result
    for (let i = 0; i < path.length; i++) {
      const part = path[i]
      const next = path[i + 1]
      const isIndex = /^\d+$/.test(next)

      if (i === path.length - 1) {
        // last: assign
        if (part === '') continue
        cur[part] = value
      } else {
        // not last: ensure object or array
        if (!cur[part]) {
          cur[part] = isIndex ? [] : {}
        }
        cur = cur[part]
      }
    }
  }

  return result
}
