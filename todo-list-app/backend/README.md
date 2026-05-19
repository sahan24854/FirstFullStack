# Todo List App - Backend Documentation

## Overview
RESTful API backend for the Todo List application built with Express.js and TypeScript.

## Project Structure

```
backend/
├── src/
│   ├── app.ts                 # Main application file
│   ├── controllers/
│   │   └── taskController.ts  # Task business logic
│   ├── models/
│   │   └── Task.ts           # Task model and in-memory storage
│   └── routes/
│       └── taskRoutes.ts      # Task API routes
├── package.json
├── tsconfig.json
└── .env
```

## Dependencies

### Production
- `express`: Web framework
- `cors`: Cross-Origin Resource Sharing
- `dotenv`: Environment variable management
- `uuid`: Unique identifier generation

### Development
- `typescript`: Type-safe JavaScript
- `ts-node`: Run TypeScript directly
- `@types/*`: Type definitions
- `jest`: Testing framework

## Running the Server

### Development
```bash
npm install
npm run dev
```

The server starts on `http://localhost:5000`

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Tasks

#### Get All Tasks
```
GET /api/tasks
```

**Query Parameters:**
- `status`: Filter by status (pending|completed)
- `tag`: Filter by tag (Work|Todo|Personal|Urgent)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Task title",
      "tag": "Work",
      "dueTime": "3:00 PM",
      "status": "pending",
      "completed": false,
      "createdAt": "2024-05-06T10:00:00Z",
      "updatedAt": "2024-05-06T10:00:00Z"
    }
  ],
  "count": 1
}
```

#### Get Task by ID
```
GET /api/tasks/:id
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "New task",
  "tag": "Work",
  "dueTime": "3:00 PM",
  "priority": "high",
  "description": "Optional description"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": { /* task object */ }
}
```

#### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "tag": "Todo",
  "dueTime": "4:00 PM"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Toggle Task Status
```
PATCH /api/tasks/:id/toggle
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated task with toggled status */ }
}
```

#### Health Check
```
GET /api/health
```

## Task Model

```typescript
interface Task {
  id: string;                              // UUID
  title: string;                           // Required
  description?: string;                    // Optional
  tag: 'Work' | 'Todo' | 'Personal' | 'Urgent';  // Required
  dueDate?: string;                        // Optional
  dueTime?: string;                        // Optional (e.g., "3:00 PM")
  priority?: 'low' | 'medium' | 'high';    // Optional
  status: 'pending' | 'completed';         // Defaults to 'pending'
  completed: boolean;                      // Defaults to false
  createdAt: string;                       // ISO timestamp
  updatedAt: string;                       // ISO timestamp
}
```

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error description"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (missing required fields)
- `404`: Not Found
- `500`: Internal Server Error

## Example Usage

### cURL Examples

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "tag": "Work",
    "dueTime": "5:00 PM",
    "priority": "high"
  }'
```

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Filter tasks:**
```bash
curl "http://localhost:5000/api/tasks?status=pending&tag=Work"
```

**Update a task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "status": "completed"
  }'
```

**Toggle task:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID/toggle
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

## Configuration

### Environment Variables (.env)

```env
PORT=5000                              # Server port
NODE_ENV=development                   # Environment mode
CORS_ORIGIN=http://localhost:3000     # Allowed frontend URL
```

### CORS Configuration

The API is configured to accept requests from the frontend URL specified in `CORS_ORIGIN`. Update this when deploying to production.

## Architecture

### Models (Task.ts)
- Defines Task interface and TaskModel class
- Handles all data operations
- Uses in-memory storage (can be replaced with database)

### Controllers (taskController.ts)
- Receives HTTP requests
- Validates input
- Calls model methods
- Returns JSON responses

### Routes (taskRoutes.ts)
- Maps HTTP methods to controller functions
- Defines API endpoints

### App (app.ts)
- Initializes Express application
- Sets up middleware (CORS, JSON parsing)
- Mounts routes
- Starts server

## Future Improvements

- [ ] Replace in-memory storage with database (MongoDB/PostgreSQL)
- [ ] Add authentication (JWT)
- [ ] Add input validation (joi, yup)
- [ ] Add logging (winston, morgan)
- [ ] Add unit tests
- [ ] Add rate limiting
- [ ] Add request caching
- [ ] Deploy to cloud (Heroku, AWS, etc.)

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
- Check CORS_ORIGIN in .env matches frontend URL
- Ensure cors middleware is properly configured

### Module Not Found
```bash
npm install
npm run build
```

## Support

For questions or issues, refer to the main README.md in the project root.
