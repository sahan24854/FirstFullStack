# Architecture Documentation - Taskly

## System Overview

Taskly is a full-stack task management application with a clean separation between frontend and backend.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (Browser)                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  index.html - Structure & Layout                         │   │
│  │  styles.css - Visual Design (CSS Variables)              │   │
│  │  script.js  - Business Logic & API Integration           │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────────┬──────────────────────────────────────┘
                            │ HTTP REST API
                            │ JSON Data Exchange
┌───────────────────────────▼──────────────────────────────────────┐
│                  Backend (Node.js/Express)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  app.ts - Express Setup, Middleware, Routes             │   │
│  │  routes/taskRoutes.ts - API Endpoint Definitions        │   │
│  │  controllers/taskController.ts - Business Logic         │   │
│  │  models/Task.ts - TypeScript Interfaces                 │   │
│  │  In-Memory Storage - Task Database                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Components

1. **HTML Structure** (`index.html`)
   - Semantic HTML layout
   - Sidebar navigation
   - Main content area
   - Multiple pages (Tasks, Calendar, Alerts, Profile)

2. **Styling** (`styles.css`)
   - CSS custom properties for theming
   - Responsive grid layouts
   - Component-based styling
   - Mobile-first approach

3. **Logic** (`script.js`)
   - DOM manipulation
   - Event handling
   - API communication
   - State management (task array)

### Data Flow

```
User Interaction
    ↓
Event Handler (onClick, onKeyPress)
    ↓
JavaScript Function
    ↓
API Call (fetch)
    ↓
Backend Response
    ↓
Update UI (renderTasks, updateCounts)
    ↓
User Sees Changes
```

### API Integration Points

```javascript
// Key API endpoints used by frontend
GET  /api/tasks           // Fetch all tasks
POST /api/tasks           // Create new task
PUT  /api/tasks/:id       // Update task
DELETE /api/tasks/:id     // Delete task
```

## Backend Architecture

### Layered Structure

```
Routes Layer
    ↓
Controllers Layer
    ↓
Models/Data Layer
```

### Layer Descriptions

#### 1. Routes Layer (`src/routes/taskRoutes.ts`)
- Defines HTTP endpoints
- Handles request validation
- Calls appropriate controllers
- Returns JSON responses

```typescript
router.get('/tasks', (req, res) => {
  const tasks = TaskController.getAllTasks();
  res.json(tasks);
});
```

#### 2. Controllers Layer (`src/controllers/taskController.ts`)
- Contains business logic
- Manipulates data
- Enforces business rules

```typescript
static createTask(dto: CreateTaskDto): Task {
  const newTask = { ...dto, id: nextId++ };
  tasks.push(newTask);
  return newTask;
}
```

#### 3. Models Layer (`src/models/Task.ts`)
- TypeScript interfaces
- Type definitions
- Data contracts

```typescript
interface Task {
  id: number;
  name: string;
  tag: 'work' | 'personal' | 'urgent' | 'todo';
  done: boolean;
  date: string;
}
```

### Database Layer

Currently uses **in-memory storage** for simplicity:

```typescript
let tasks: Task[] = [
  { id: 1, name: 'Design review', ... },
  { id: 2, name: 'Submit report', ... }
];
```

**For production**, replace with a real database:

```typescript
// MongoDB example
const task = await Task.findById(id);
await task.save();
```

## Data Models

### Task Model

```typescript
{
  id: number;           // Unique identifier
  name: string;         // Task description
  tag: string;          // Category (work, personal, urgent, todo)
  done: boolean;        // Completion status
  date: string;         // Due date (YYYY-MM-DD)
  createdAt: string;    // Creation timestamp
  updatedAt: string;    // Last update timestamp
}
```

## Request/Response Flow

### Example: Create Task

**Request:**
```javascript
POST /api/tasks
Content-Type: application/json

{
  "name": "Fix login bug",
  "tag": "work",
  "date": "2026-05-22"
}
```

**Frontend → Backend:**
1. User enters task name
2. Frontend calls `addTask()`
3. Creates POST request with JSON data
4. Sends to `http://localhost:5000/api/tasks`

**Backend Processing:**
1. Route handler receives request
2. Validates input (name required)
3. Calls `TaskController.createTask()`
4. Adds to tasks array with new ID
5. Sets timestamps

**Response:**
```json
{
  "id": 6,
  "name": "Fix login bug",
  "tag": "work",
  "done": false,
  "date": "2026-05-22",
  "createdAt": "2026-05-19T10:30:00Z",
  "updatedAt": "2026-05-19T10:30:00Z"
}
```

**Frontend → Browser:**
1. Frontend receives response
2. Adds to local tasks array
3. Calls `renderTasks()`
4. Updates UI
5. User sees new task

## State Management

### Frontend State

```javascript
// Global variables
let tasks = [];           // All tasks
let currentFilter = 'all'; // Current filter
let calYear = 2026;       // Calendar year
let calMonth = 4;         // Calendar month
```

### Backend State

```typescript
let tasks: Task[] = [];   // All tasks
let nextId = 6;           // Next task ID
```

## Middleware Stack

### Frontend
- CORS handling (built into fetch)
- Error handling (try/catch)
- Loading states (visual feedback)

### Backend
```typescript
app.use(cors());                    // CORS
app.use(express.json());            // Parse JSON
app.use(requestLogging);            // Log requests
app.use('/api', taskRoutes);        // Route handling
app.use(errorHandler);              // Error handling
```

## API Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | GET /api/tasks |
| 201 | Created | POST /api/tasks |
| 400 | Bad Request | Missing required field |
| 404 | Not Found | GET /api/tasks/999 |
| 500 | Server Error | Internal error |

## Error Handling

### Frontend
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
  loadSampleTasks(); // Fallback
}
```

### Backend
```typescript
if (!task) {
  return res.status(404).json({ error: 'Task not found' });
}
```

## Scalability Considerations

### Current Limitations
- In-memory storage (lost on restart)
- Single server instance
- No authentication
- No data persistence

### Future Improvements

1. **Database**
   - Replace in-memory array with MongoDB/PostgreSQL
   - Add connection pooling
   - Implement indexes for performance

2. **Authentication**
   - Add JWT tokens
   - User sessions
   - Password hashing

3. **Caching**
   - Redis for frequent queries
   - Response caching

4. **API**
   - Pagination for large datasets
   - Rate limiting
   - Request validation middleware

5. **Deployment**
   - Docker containerization
   - Kubernetes orchestration
   - Load balancing

## Development Workflow

### Adding a Feature

1. **Design the UI**
   - Sketch in Figma
   - Determine CSS classes needed

2. **Update Frontend**
   - Add HTML in `index.html`
   - Add styles in `styles.css`
   - Add logic in `script.js`

3. **Update Backend** (if needed)
   - Add route in `taskRoutes.ts`
   - Add controller method
   - Add TypeScript types

4. **Test**
   - Manually test in browser
   - Test API with curl
   - Check console for errors

5. **Deploy**
   - Push to version control
   - Deploy to production

## Performance Optimization

### Frontend
- Lazy load images
- Minimize CSS/JS
- Use CSS variables for theming
- Debounce API calls

### Backend
- Cache frequently accessed data
- Use database indexes
- Implement pagination
- Add request rate limiting

## Security Considerations

### Current
- CORS enabled for local development
- Basic error handling

### Recommended for Production
- Input validation & sanitization
- SQL/NoSQL injection prevention
- HTTPS/TLS encryption
- API key authentication
- Rate limiting
- OWASP security headers

## Testing Strategy

### Frontend
- Manual UI testing
- Browser console testing
- API endpoint testing with curl

### Backend
- Unit tests for controllers
- Integration tests for routes
- End-to-end tests
- Load testing

## Deployment Architecture

```
┌─────────────────────────┐
│   Client Browser        │
└────────────┬────────────┘
             │ HTTPS
┌────────────▼────────────┐
│   Web Server            │
│   (Nginx/Apache)        │
│   ├─ Frontend (Static)  │
│   └─ /api → Backend     │
└────────────┬────────────┘
             │ HTTP
┌────────────▼────────────┐
│   Node.js/Express       │
│   (Port 5000)           │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   Database              │
│   (MongoDB/PostgreSQL)  │
└─────────────────────────┘
```

## Summary

Taskly follows a clean separation of concerns with:
- **Frontend**: Presentation and user interaction
- **Backend**: Business logic and data management
- **API**: JSON-based communication protocol

This architecture makes it easy to:
- Develop independently
- Scale separately
- Test thoroughly
- Maintain efficiently
- Extend features

The application can grow from a simple prototype to an enterprise solution with proper database integration, authentication, and deployment infrastructure.
