import { TUser } from 'api/users/users.schema'

declare module 'express-serve-static-core' {
  export interface Request {
    user: TUser
  }
}
