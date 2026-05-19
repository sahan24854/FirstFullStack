# Backend - Taskly API

Node.js/Express.js REST API for the Taskly task management application.

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server starts on `http://localhost:5000`

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Tasks Management

#### Get All Tasks
```
GET /api/tasks
Response: Task[]
```

#### Get Task by ID
```
GET /api/tasks/:id
Response: Task | { error: string }
```

#### Create Task
```
POST /api/tasks
Body: {
  name: string (required),
  tag?: 'work' | 'personal' | 'urgent' | 'todo',
  date?: string (YYYY-MM-DD)
}
Response: Task
```

#### Update Task
```
PUT /api/tasks/:id
Body: {
  name?: string,
  tag?: 'work' | 'personal' | 'urgent' | 'todo',
  done?: boolean,
  date?: string
}
Response: Task
```

#### Delete Task
```
DELETE /api/tasks/:id
Response: { message: string, id: number }
```

### Filters

#### Get Tasks by Status
```
GET /api/tasks/status/:status
Status: 'done' | 'pending'
Response: Task[]
```

#### Get Tasks by Tag
```
GET /api/tasks/tag/:tag
Response: Task[]
```

#### Get Today's Tasks
```
GET /api/today
Response: Task[]
```

#### Health Check
```
GET /api/health
Response: { status: string }
```

## Data Models

### Task
```typescript
interface Task {
  id: number;
  name: string;
  tag: 'work' | 'personal' | 'urgent' | 'todo';
  done: boolean;
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

## Project Structure

```
src/
├── app.ts              # Express application setup
├── controllers/
│   └── taskController.ts  # Business logic
├── models/
│   └── Task.ts         # TypeScript interfaces
└── routes/
    └── taskRoutes.ts   # API endpoint definitions
```

## Environment Variables

Create `.env` file in backend directory:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **uuid** - ID generation
- **typescript** - Type safety
- **ts-node** - TypeScript execution

## Development

### Setup

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

Uses ts-node to run TypeScript directly.

### Build for Production

```bash
npm run build
```

Compiles TypeScript to JavaScript in `dist/` folder.

### Start Production Server

```bash
npm start
```

Runs compiled JavaScript from `dist/app.js`.

## Features

- ✅ Full CRUD operations for tasks
- ✅ Task filtering by status and tag
- ✅ Today's tasks endpoint
- ✅ CORS configuration
- ✅ Error handling
- ✅ Request logging
- ✅ TypeScript support
- ✅ In-memory data storage

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication & authorization
- [ ] Input validation with schema validation
- [ ] Rate limiting
- [ ] Comprehensive error codes
- [ ] API documentation (Swagger)
- [ ] Unit tests
- [ ] Integration tests

## Architecture Notes

### Controllers
Business logic for task operations. Can be extended with validation, transformations, etc.

### Models
TypeScript interfaces for type safety and IDE support.

### Routes
API endpoint definitions and request/response handling.

### In-Memory Storage
Currently uses an array. In production, replace with a real database:

```typescript
// Example: Connect to MongoDB
import mongoose from 'mongoose';
const db = await mongoose.connect(process.env.MONGODB_URI);
```

## Error Handling

All errors return JSON responses with appropriate HTTP status codes:

```json
{
  "error": "Task not found"
}
```

## CORS Configuration

Allow frontend from specific origin:

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
```

Update `CORS_ORIGIN` in `.env` to allow access from different domains.

## Testing API

Use curl, Postman, or any HTTP client:

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"name": "New task", "tag": "work"}'

# Update task
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# Delete task
curl -X DELETE http://localhost:5000/api/tasks/1
```

## Performance Considerations

- In-memory storage is fast but limited to available RAM
- For production, use a database for persistence and scalability
- Add caching for frequently accessed data
- Implement pagination for large datasets
- Add request rate limiting

## Security Notes

- Add input validation for all endpoints
- Sanitize user inputs
- Add authentication and authorization
- Use HTTPS in production
- Validate and log all requests
- Consider using helmet.js for security headers
