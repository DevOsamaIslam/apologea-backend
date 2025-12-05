# Socket Architecture Documentation

## Overview

The socket system has been refactored using OOP principles to provide a clean, maintainable, and extensible architecture. The system uses composition over inheritance and follows the single responsibility principle.

## Architecture Components

### 1. **ConnectionManager** (`ConnectionManager.ts`)
**Responsibility**: Manages connection lifecycle, authentication, and user-to-socket mapping.

**Key Features**:
- Handles user authentication
- Manages socket-user mappings
- Tracks connected users
- Handles connection/disconnection events

**Methods**:
- `handleConnection(socket: Socket)`: Sets up new connections
- `handleAuthentication(socket: Socket, userId: string)`: Authenticates users
- `handleDisconnection(socket: Socket)`: Cleans up disconnected users
- `getUserSocketId(userId: string)`: Gets socket ID for user
- `isUserConnected(userId: string)`: Checks if user is online
- `getConnectedUsers()`: Returns list of connected users

### 2. **MessageManager** (`MessageManager.ts`)
**Responsibility**: Handles all message communication patterns.

**Key Features**:
- Send messages to specific users
- Broadcast messages to all users
- Room-based messaging
- User room management

**Methods**:
- `sendToUser(userId, type, data)`: Send to specific user
- `broadcast(type, data)`: Broadcast to all users
- `broadcastToRoom(room, type, data)`: Broadcast to room
- `joinRoom(userId, room)`: Add user to room
- `leaveRoom(userId, room)`: Remove user from room

### 3. **MessageHandler** (`MessageHandler.ts`)
**Responsibility**: Base class for extensible message handling.

**Key Features**:
- Abstract base class for all message handlers
- Provides utility methods for message handling
- Enforces consistent handler interface

**Usage**:
```typescript
class MyHandler extends MessageHandler<MyDataType> {
  constructor() {
    super('my-message-type')
  }
  
  async handle(socket: Socket, data: MyDataType): Promise<void> {
    // Handle the message
  }
}
```

### 4. **MessageHandlerRegistry** (`MessageHandlerRegistry.ts`)
**Responsibility**: Manages registration and dispatching of message handlers.

**Key Features**:
- Register/unregister message handlers
- Route messages to appropriate handlers
- Error handling for message processing

**Methods**:
- `register(messageType, handler)`: Register a handler
- `unregister(messageType)`: Remove a handler
- `handleMessage(socket, type, data)`: Dispatch message to handler

### 5. **Specific Message Handlers** (`handlers/`)
**Responsibility**: Handle specific message types with business logic.

**Available Handlers**:
- `NewArticleHandler`: Handles new article notifications
- `NewDebateHandler`: Handles new debate notifications
- `ChallengedHandler`: Handles challenge notifications
- `NewResponseHandler`: Handles new response notifications

## Usage Examples

### Basic Setup
```typescript
import { socketManager } from './app/socket'

// Initialize socket server
const server = http.createServer(app)
socketManager.initialize(server)
```

### Sending Messages
```typescript
// Send to specific user
socketManager.sendToUser('user123', 'notification', { message: 'Hello!' })

// Broadcast to all users
socketManager.broadcast('new-article', { articleId: '123', title: 'New Article' })

// Send to room
socketManager.broadcastToRoom('debate-123', 'new-response', { responseId: '456' })
```

### Custom Message Handler
```typescript
import { MessageHandler } from './app/socket/MessageHandler'

class CustomHandler extends MessageHandler<CustomData> {
  constructor() {
    super('custom-message')
  }
  
  async handle(socket: Socket, data: CustomData): Promise<void> {
    // Your custom logic here
    socket.emit('custom-response', { processed: true })
  }
}

// Register the handler
socketManager.registerHandler('custom-message', new CustomHandler())
```

### Room Management
```typescript
// Add user to room
socketManager.joinRoom('user123', 'debate-456')

// Remove user from room
socketManager.leaveRoom('user123', 'debate-456')
```

## Architecture Benefits

### 1. **Single Responsibility Principle**
- Each class has one clear responsibility
- Easy to understand and maintain
- Changes in one area don't affect others

### 2. **Composition Over Inheritance**
- Uses composition to combine functionality
- More flexible than inheritance hierarchies
- Easy to add new features without modifying existing code

### 3. **Extensibility**
- New message handlers can be added easily
- New communication patterns can be added to MessageManager
- New connection features can be added to ConnectionManager

### 4. **Testability**
- Each component can be tested in isolation
- Mock dependencies for unit testing
- Clear interfaces for testing

### 5. **Maintainability**
- Clear separation of concerns
- Consistent patterns across the codebase
- Well-documented interfaces

## Migration Guide

### From Old to New Architecture

**Old Way**:
```typescript
// Direct handler registration
socketManager.registerHandler('type', (socket, data) => {
  // handler logic
})
```

**New Way**:
```typescript
// Create handler class
class MyHandler extends MessageHandler<DataType> {
  async handle(socket: Socket, data: DataType): Promise<void> {
    // handler logic
  }
}

// Register handler
socketManager.registerHandler('type', new MyHandler())
```

## File Structure
```
src/app/socket/
├── index.ts                 # Main SocketManager (facade)
├── ConnectionManager.ts     # Connection lifecycle management
├── MessageManager.ts        # Message communication
├── MessageHandler.ts        # Base handler class
├── MessageHandlerRegistry.ts # Handler registration & dispatch
├── handlers/                # Specific message handlers
│   ├── NewArticleHandler.ts
│   ├── NewDebateHandler.ts
│   ├── ChallengedHandler.ts
│   ├── NewResponseHandler.ts
│   └── index.ts
└── README.md               # This documentation
```

## Best Practices

1. **Create new handlers** by extending `MessageHandler<T>`
2. **Use dependency injection** for handler dependencies
3. **Handle errors gracefully** in message handlers
4. **Log appropriately** for debugging
5. **Test handlers independently** before integration
6. **Use TypeScript types** for all message data
7. **Follow naming conventions** for consistency

## Future Enhancements

- Add middleware support for message processing
- Implement rate limiting
- Add message validation
- Support for message acknowledgments
- Add connection pooling for high-traffic scenarios
- Implement message queuing for reliability