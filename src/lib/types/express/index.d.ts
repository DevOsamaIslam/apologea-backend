import { TUserDocument } from 'api/users/model/User.Model'

declare module 'express-serve-static-core' {
  export interface Request {
    user: TUserDocument
  }
}
