# General Project Instructions

## Project Overview
This is a Node.js/TypeScript backend application. The application follows a modular architecture with clear separation of concerns.

## Technology Stack
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with JWT
- **Validation**: Zod
- **File Upload**: express-fileupload
- **Development**: TypeScript
- **Build**: TypeScript compiler with tsc-alias

## Project Structure
```
src/
├── app/                    # Application core configuration
├── client/                 # Frontend React application
├── lib/                    # Shared libraries and utilities
│   ├── constants/         # Application constants
│   ├── helpers/           # Helper functions
│   └── types/             # TypeScript type definitions
├── middleware/            # Express middleware
└── modules/               # Feature modules
    ├── [module-name]/     # Individual modules
    │   ├── [module-name].routes.ts
    │   ├── create/
    │   ├── delete/
    │   ├── fetch/
    │   ├── model/
    │   ├── types.ts
    │   └── update/
```

## Development Environment
- **Development Server**: `npm run dev` - Runs with ts-node-dev for hot reload
- **Debug Mode**: `npm run dev:debug` - Runs with debugging on port 4500
- **Build**: `npm run build:dev` or `npm run build:prod` - TypeScript compilation
- **Start**: `npm start` - Runs compiled JavaScript
- **Linting**: `npm run lint` - ESLint checking

## Environment Configuration
- Development and production environments are configured
- Environment variables are loaded via dotenv in development

## Database
- MongoDB with Mongoose ODM
- Schema-based modeling with proper TypeScript types
- Pagination support via mongoose-paginate-v2
- Transaction support for data consistency

## Authentication
- JWT-based authentication using Passport.js
- Protected routes middleware
- Session management with session: false for stateless API

## API Architecture
- RESTful API design
- Consistent response structure with status codes, data, and feedback
- Error handling with custom ServerError class
- Request validation using Zod schemas

## File Organization
- Modular structure with clear separation of concerns
- Controllers handle HTTP requests and responses
- Services contain business logic and database operations
- Models define database schemas and types
- Routes define API endpoints