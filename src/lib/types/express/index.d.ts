import { TUserDocument } from 'api/users/model/Users.Model'

declare module 'express-serve-static-core' {
  export interface Request {
    user: TUserDocument
  }
}
