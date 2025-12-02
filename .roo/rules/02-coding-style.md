# Coding Style and Conventions

## TypeScript Configuration
- **Target**: ESNext (latest JavaScript version)
- **Module**: CommonJS
- **Strict Mode**: Enabled with `strict: true`
- **Source Maps**: Enabled for debugging
- **Declaration Files**: Not emitted (skipLibCheck enabled)
- **Type Roots**: Custom type definitions in `./src/lib/types` and `./node_modules/@types`

## Linting Rules (.eslintrc.js)
- **Environment**: ES2021 and Node.js
- **Parser**: @typescript-eslint/parser
- **Extensions**: ESLint recommended, TypeScript recommended, and Prettier
- **Custom Rules**:
  - `@typescript-eslint/no-unused-vars`: Warn (with ignoreRestSiblings)
  - `@typescript-eslint/no-var-requires`: Off
  - `@typescript-eslint/no-explicit-any`: Off

## Formatting Rules (.prettierrc)
- **Quotes**: Single quotes
- **Trailing Commas**: All
- **Print Width**: 100 characters
- **Tab Width**: 2 spaces
- **Semicolons**: No semicolons
- **Overrides**: Special handling for .prettierrc files

## File Naming Conventions
- **Files**: kebab-case (e.g., `user-schema.ts`)
- **Classes**: PascalCase (e.g., `UserService`)
- **Interfaces**: PascalCase with 'I' prefix (e.g., `IProps`)
- **Variables and Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_VERSION`)
- **Types**: PascalCase (e.g., `TUser`)
- **Enums**: PascalCase (e.g., `AccountTypes`)

## Import/Export Conventions
- **Imports**: Always use named imports with explicit paths
- **Relative Imports**: Use `../` for same directory imports
- **Absolute Imports**: Use `@/` alias for root-level imports
- **Export Style**: Use named exports for modules, default exports only for single-purpose files
- **Order**: 
  1. Node.js built-ins
  2. Third-party packages
  3. Internal imports
  4. Relative imports

## Module Architecture Pattern

### File Structure
```
src/modules/<moduleName>/
├── <moduleName>.routes.ts
├── create/
│   ├── create.controller.ts
│   └── create.service.ts
├── delete/
│   ├── delete.controller.ts
│   └── delete.service.ts
├── fetch/
│   ├── fetch.controller.ts
│   ├── fetch.service.ts
│   └── validation.ts
├── model/
│   ├── <ModuleName>.Model.ts
│   └── <ModuleName>.Schema.ts
├── types.ts
└── update/
    ├── update.controller.ts
    └── update.service.ts
```

### Controller Pattern
```typescript
import { RequestHandler } from 'express'
import { feedback, returnHandler } from '../../../lib/helpers'
import { StatusCodes } from 'http-status-codes'
import { ERROR, SUCCESS } from '../../../lib/constants/messages'
import { getService } from './fetch.service'

export const getController: RequestHandler = async (req, res, next) => {
  const [data, error] = await getService()

  if (error || !data?.length)
    return next(returnHandler(StatusCodes.NOT_FOUND, data, feedback('error', ERROR.SWR)))

  return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
```

### Service Pattern
```typescript
import { asyncHandler } from 'async-handler-ts'
import { Model } from '../model/Model'

export const getService = async () => {
  return await asyncHandler(Model.find())
}

export const getByIdService = async (id: string) => {
  return await asyncHandler(Model.findById(id))
}
```

### Schema Pattern
```typescript
import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose'
import { DB_SCHEMAS, DB_SCHEMA_TYPES } from '../../../lib/constants'

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

export type TUser = InferSchemaType<typeof UserSchema>
export type TUserDocument = HydratedDocument<TUser>
```

### Type Pattern
```typescript
import { z } from 'zod'
import { ZOD_SCHEMAS } from '../../lib/constants'

export const UserSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
})

export type TUserSchema = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.pick({
  firstName: true,
  email: true,
})

export type TCreateUser = z.infer<typeof CreateUserSchema>
```

## Database Patterns
- **Schema Definition**: Use Mongoose schemas with TypeScript types
- **Model Operations**: Use asyncHandler for error handling
- **Pagination**: Use mongoose-paginate-v2 plugin
- **References**: Use ObjectId with ref for relationships
- **Timestamps**: Enable timestamps for createdAt/updatedAt
- **Validation**: Use both Mongoose validation and Zod schemas

## Error Handling Patterns
```typescript
import { ServerError } from '../lib/types'
import { StatusCodes } from 'http-status-codes'

export const customError = new ServerError({
  message: 'Custom error message',
  statusCode: StatusCodes.BAD_REQUEST,
  type: 'error',
})
```

## Response Patterns
```typescript
import { returnHandler, feedback } from '../lib/helpers'
import { StatusCodes } from 'http-status-codes'

// Success response
returnHandler(StatusCodes.OK, data, feedback('success', 'Operation successful'))

// Error response
returnHandler(StatusCodes.NOT_FOUND, null, feedback('error', 'Resource not found'))
```

## Authentication Patterns
- **Protected Routes**: Use `protectedRoute` middleware
- **JWT Strategy**: Configure Passport with JWT strategy
- **Session Management**: Use `session: false` for stateless API

## File Upload Patterns
- **Middleware**: Use express-fileupload middleware
- **Validation**: Validate file types and sizes
- **Storage**: Store file paths in database, not files themselves

## Testing Patterns
- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API endpoints with database
- **E2E Tests**: Test complete user workflows

## Code Organization Principles
1. **Separation of Concerns**: Keep controllers, services, and models separate
2. **Single Responsibility**: Each file should have one clear purpose
3. **DRY Principle**: Reuse code through helper functions and constants
4. **Type Safety**: Use TypeScript for all data structures
5. **Error Handling**: Use asyncHandler and custom error classes
6. **Validation**: Validate all inputs with Zod schemas
7. **Consistency**: Follow established patterns across modules

## Best Practices
- Always use TypeScript types
- Validate all incoming data
- Handle errors gracefully
- Use pagination for large datasets
- Follow RESTful API design principles
- Keep business logic in services, not controllers
- Use constants for magic strings and numbers
- Document code with JSDoc comments
- Use meaningful variable and function names
- Keep functions small and focused