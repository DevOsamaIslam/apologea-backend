# Patterns and Conventions

## API Response Structure

All API responses follow a consistent structure:

```typescript
{
  statusCode: number,
  data: unknown,
  feedback: {
    type: 'success' | 'error' | 'warning',
    message: string
  }
}
```

## Error Handling

- Use `asyncHandler` wrapper for async operations in controllers.
- Create custom `ServerError` class for application errors
- Pass errors to `next()` function in controllers
- Use `errorHandler` middleware for consistent error responses

## Database Operations

- Use Mongoose models for all database operations
- Implement pagination with `mongoose-paginate-v2`
- Use transactions for data consistency with `runTransaction`
- Select specific fields with `.select()` to avoid sensitive data exposure

## Request Validation

- Use Zod schemas for all input validation
- Apply validation middleware with `validateRequest`
- Create separate schemas for create, update, and query operations
- Use `PaginationSchema` for all list endpoints

## Authentication Flow

1. User sends credentials to login endpoint
2. Passport JWT strategy validates credentials
3. JWT token is generated and returned
4. Protected routes use `protectedRoute` middleware
5. User data is attached to request object

## File Organization Patterns

### Module Structure

Each module follows the same structure:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define database schemas
- **Types**: Define TypeScript types and validation schemas

### Helper Functions

- **Response Helpers**: `returnHandler`, `feedback`
- **Error Handling**: `errorHandler`, `asyncHandler`
- **Database Helpers**: `runTransaction`
- **Validation Helpers**: Zod schemas and validators

## Code Patterns

### 1. Controller Pattern

```typescript
export const getController: RequestHandler = async (req, res, next) => {
  const [data, error] = await getService()

  if (error || !data?.length)
    return next(returnHandler(StatusCodes.NOT_FOUND, data, feedback('error', ERROR.SWR)))

  return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
```

### 2. Service Pattern

```typescript
export const getService = async () => {
  return await asyncHandler(Model.find())
}

export const getByIdService = async (id: string) => {
  return await asyncHandler(Model.findById(id).select('-password -__v'))
}
```

### 3. Update Service with Transaction

```typescript
export const updateUserService = async ({ userId, profile }: IProps) => {
  return runTransaction(async () => {
    const user = await UserModel.findById(userId)

    if (!user)
      throw new ServerError({
        message: 'User not found',
        statusCode: StatusCodes.BAD_REQUEST,
        type: 'error',
      })

    // Update logic here
    await user.save()
    return user
  })
}
```

### 4. Route Definition Pattern

```typescript
export const userRouter = Router()

// Get all users with pagination
userRouter.get('/', protectedRoute, validateRequest(PaginationSchema), getUsersController)

// Get single user, update, and delete
userRouter
  .use(express.json())
  .route('/@:userId')
  .get(protectedRoute, getOneUserController)
  .patch(protectedRoute, validateRequest(UpdateUserSchema), updateUserController)
  .delete(protectedRoute, deleteUserController)
```

## Database Schema Patterns

### 1. Basic Schema

```typescript
export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  account: {
    type: DB_SCHEMA_TYPES.account,
  },
})
```

### 2. Schema with References

```typescript
export const BillSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: DB_SCHEMAS.user,
      required: true,
    },
    issuedTo: {
      type: mongoose.Types.ObjectId,
      ref: DB_SCHEMAS.tenant,
      required: true,
    },
    charges: [
      {
        description: {
          type: String,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)
```

## Type Definition Patterns

### 1. Zod Schema

```typescript
export const UserSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: ZOD_SCHEMAS.password,
})

export const CreateUserSchema = UserSchema.pick({
  firstName: true,
  email: true,
})

export type TCreateUser = z.infer<typeof CreateUserSchema>
```

### 2. Mongoose Schema Types

```typescript
export type TUser = InferSchemaType<typeof UserSchema>
export type TUserDocument = HydratedDocument<TUser>
```

## Middleware Patterns

### 1. Protected Route Middleware

```typescript
export const protectedRoute: RequestHandler = (req, res, next) => {
  passport.authenticate(
    AUTH.method,
    (error: unknown, user: unknown, info: unknown, status: unknown) => {
      if (!user)
        return next(
          returnHandler(StatusCodes.UNAUTHORIZED, info, feedback('warning', WARNING.unauthorized)),
        )
      req.login(user, { session: false })
      return next()
    },
  )(req, res, next)
}
```

### 2. Request Validation Middleware

```typescript
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return next(
        returnHandler(
          StatusCodes.BAD_REQUEST,
          null,
          feedback('error', result.error.errors[0].message),
        ),
      )
    }
    req.body = result.data
    next()
  }
}
```

## Constants Organization

- **App Constants**: Application-wide configuration
- **Auth Constants**: Authentication-related settings
- **Schema Constants**: Database schema types and names
- **Message Constants**: Success and error messages
- **Zod Constants**: Reusable Zod validation schemas
- **Unit Constants**: Unit-related constants and enums

## Performance Considerations

- Use pagination for all list endpoints
- Select only necessary fields with `.select()`
- Use indexes for frequently queried fields
- Implement proper error handling to avoid database leaks
- Use transactions for data consistency

## Security Practices

- Never expose sensitive data like passwords in responses
- Use HTTPS in production
- Validate all user inputs
- Use parameterized queries to prevent injection
- Implement proper authentication and authorization
