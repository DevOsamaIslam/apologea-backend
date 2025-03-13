import express, { Router } from 'express'
import { loginController } from './auth/login.controller'
import { RegisterUserController } from './auth/register.controller'
import { getOneUserController, getUsersController } from './fetch/fetch.controller'
import { updateUserController } from './update/update.controller'
import { loginInput, registrationInput } from './users.schema'
import { deleteUserController } from './delete/delete.controller'
import { protectedRoute } from 'middleware/auth.middleware'
import { validateRequest } from 'middleware/request.middleware'
import { pingController } from './auth/ping.controller'

export const userRouter = Router()

// get all users
userRouter.get('/', protectedRoute, getUsersController)

userRouter.get('/ping', protectedRoute, pingController)

// get single user
userRouter
  .use(express.json())
  .route('/:username')
  .post(protectedRoute, getOneUserController)
  .patch(protectedRoute, updateUserController)
  .delete(protectedRoute, deleteUserController)

// register user
userRouter.use(express.json()).post('/', validateRequest(registrationInput), RegisterUserController)

userRouter.use(express.json()).post('/login', validateRequest(loginInput), loginController)
