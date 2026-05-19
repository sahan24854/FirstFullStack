# Design & Architecture Documentation

## 🎨 Design Overview

This Todo List App was built based on a Figma design with a modern, mobile-first approach.

### Design Specifications

**Device:** iPhone (390x844px)
**Design System:** Clean, minimalist interface
**Color Palette:**
- Background: `#F0EFEA` (Beige)
- Primary Text: `#1A1A18` (Near Black)
- Secondary Text: `#7A7870` (Gray)
- Borders: `#E2E0D9` (Light Gray)
- Success: `#D6EAD7` (Light Green)

### Key Design Features

1. **Status Bar**
   - Time display (9:41)
   - Signal strength and battery indicators

2. **Header Section**
   - Current date
   - "My Tasks" heading
   - Task counter (remaining/done)
   - Tab navigation (All, Today, Upcoming, Done)

3. **Task Cards**
   - Checkbox for completion
   - Task title
   - Category tag with distinct colors
   - Due time
   - Delete/more options button

4. **Add Task Section**
   - Text input field
   - Add button
   - Quick action buttons (Due date, Tag, Priority)

5. **Bottom Navigation**
   - 4 tabs: Tasks (active), Calendar, Alerts, Profile
   - Icon + label format

## 🏗️ Architecture

### Frontend Architecture

```
HTML (Structure)
    ↓
CSS (Styling)
    ↓
JavaScript (Logic)
    ↓
Fetch API (Communication)
    ↓
Express Backend
```

**Data Flow:**
```
User Input → JavaScript → Fetch API → Backend → Response → DOM Update
```

### Backend Architecture

```
Express App
    ├── Middleware
    │   ├── CORS
    │   ├── JSON Parser
    │   └── Error Handler
    ├── Routes
    │   └── /api/tasks
    ├── Controllers
    │   └── taskController.ts
    └── Models
        └── TaskModel (in-memory storage)
```

**Request Flow:**
```
HTTP Request → Route Handler → Controller → Model → Response
```

## 📊 Data Model

### Task Object

```typescript
interface Task {
  id: string;              // UUID (unique identifier)
  title: string;           // Task name (required)
  description?: string;    // Optional details
  tag: TagType;            // Category badge
  dueDate?: string;        // Optional date
  dueTime?: string;        // Optional time (e.g., "3:00 PM")
  priority?: Priority;     // Optional priority level
  status: Status;          // pending | completed
  completed: boolean;      // Completion flag
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}

type TagType = 'Work' | 'Todo' | 'Personal' | 'Urgent'
type Priority = 'low' | 'medium' | 'high'
type Status = 'pending' | 'completed'
```

### Tag Color Mapping

| Tag | Background | Text | Use Case |
|-----|-----------|------|----------|
| Work | #D6EAD7 | #2D6B30 | Work-related tasks |
| Todo | #DCE4F5 | #2A4A9E | General todo items |
| Personal | #FFE8D6 | #8B4513 | Personal tasks |
| Urgent | #FFD6D6 | #8B0000 | Urgent items |

## 🔌 API Design

### RESTful Endpoints

```
POST   /api/tasks           Create a new task
GET    /api/tasks           Get all tasks (filterable)
GET    /api/tasks/:id       Get specific task
PUT    /api/tasks/:id       Update task
DELETE /api/tasks/:id       Delete task
PATCH  /api/tasks/:id/toggle Toggle completion
```

### Status Codes

- `200` OK - Successful retrieval
- `201` Created - Task successfully created
- `400` Bad Request - Invalid input
- `404` Not Found - Resource not found
- `500` Server Error - Internal error

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* resource */ },
  "count": 1
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🎯 Component Breakdown

### Frontend Components

#### 1. Status Bar
- **Purpose**: Display system status
- **Elements**: Time, Signal, Battery
- **Interactivity**: None (static)

#### 2. Header
- **Purpose**: Show date, title, and counters
- **Elements**: Date, Title, Task count
- **Interactivity**: Display dynamic counts

#### 3. Tab Navigation
- **Purpose**: Filter tasks by status
- **Elements**: 4 tab buttons
- **Interactivity**: Click to filter, highlight active tab

#### 4. Task List
- **Purpose**: Display tasks
- **Elements**: Task cards
- **Interactivity**: Click checkbox to toggle, click delete to remove

#### 5. Task Card
- **Purpose**: Display individual task
- **Elements**: Checkbox, Title, Tag, Time, More button
- **Interactivity**: Checkbox toggles completion, buttons trigger actions

#### 6. Add Task Section
- **Purpose**: Create new tasks
- **Elements**: Input, Add button, Option buttons
- **Interactivity**: Type, click buttons to create/configure

#### 7. Navigation Bar
- **Purpose**: App navigation
- **Elements**: 4 nav items with icons
- **Interactivity**: Click to switch views (placeholder)

### Backend Components

#### 1. Express App (app.ts)
- Initializes server
- Sets up middleware
- Mounts routes
- Starts listening

#### 2. Routes (taskRoutes.ts)
- Maps HTTP methods to handlers
- Defines API endpoints
- Request validation

#### 3. Controllers (taskController.ts)
- Handles requests
- Calls model methods
- Formats responses
- Error handling

#### 4. Models (Task.ts)
- Defines Task interface
- Implements TaskModel class
- In-memory storage logic
- CRUD operations

## 🔄 User Workflows

### Create Task
```
User types in input
    ↓
Clicks + button or presses Enter
    ↓
JavaScript validates input
    ↓
POST /api/tasks
    ↓
Controller creates task
    ↓
Model adds to storage
    ↓
Response sent back
    ↓
Task added to DOM
    ↓
Input cleared
    ↓
Counts updated
```

### Complete Task
```
User clicks checkbox
    ↓
JavaScript calls toggleTask()
    ↓
PATCH /api/tasks/:id/toggle
    ↓
Controller toggles status
    ↓
Model updates task
    ↓
Response sent back
    ↓
Task marked as completed
    ↓
Counts updated
```

### Filter Tasks
```
User clicks tab
    ↓
JavaScript stores filter
    ↓
renderTasks() called
    ↓
filterTasks() applies filter
    ↓
Filtered tasks rendered
    ↓
Counts updated
```

## 🛠️ Tech Stack Decisions

### Why Express.js?
- Lightweight and flexible
- Large ecosystem
- Easy to learn
- Great for rapid development

### Why TypeScript?
- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Catches errors at compile time

### Why Vanilla JavaScript (Frontend)?
- No build dependencies needed
- Lightweight and fast
- Direct control over DOM
- Easy to understand and modify

### Why In-Memory Storage?
- No database setup needed
- Fast for prototyping
- Easy to replace with DB later
- Good for learning

## 📈 Scalability Considerations

### Current Limitations
- Data lost on server restart
- No persistence layer
- Single-process
- No authentication

### Future Scalability
1. **Database Integration**
   - Replace TaskModel with database queries
   - Use MongoDB, PostgreSQL, or similar

2. **Authentication**
   - Add JWT token validation
   - User-specific tasks
   - Secure endpoints

3. **Caching**
   - Redis for frequently accessed data
   - Reduce database queries

4. **Load Balancing**
   - Multiple server instances
   - Distribution across servers

5. **Microservices**
   - Separate concerns
   - Independent scaling
   - Better maintainability

## 🧪 Testing Strategy

### Frontend Testing
- Manual UI testing
- Responsive design testing
- Cross-browser testing
- API integration testing

### Backend Testing
- Unit tests for models
- Integration tests for routes
- Error handling tests
- Performance tests

## 🔐 Security Considerations

### Current Implementation
- CORS enabled for frontend
- Input validation on title
- HTML escaping for XSS prevention

### Production Hardening
- Add rate limiting
- Implement authentication
- Add input sanitization
- Use HTTPS
- Add request logging
- Implement CSRF protection

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 420px (main design)
- **Tablet**: 420px - 768px (scales up)
- **Desktop**: > 768px (full expansion)

### Design Philosophy
- Mobile-first approach
- Touch-friendly buttons (min 44px)
- Readable font sizes
- Adequate spacing

## 🎨 CSS Architecture

### Organization
```
Global Styles
├── Reset and Defaults
├── Color Variables (in comments)
└── Responsive Mixins

Layout Components
├── App Container
├── Status Bar
├── Header
├── Task List
└── Navigation

Interactive Elements
├── Buttons
├── Inputs
├── Tabs
└── Cards

States
├── Hover
├── Active
├── Completed
└── Disabled

Responsive
├── Mobile First
├── Tablet Adjustments
└── Desktop Adjustments
```

## 🚀 Performance Optimization

### Frontend
- Minimal JavaScript
- CSS animations (GPU accelerated)
- Lazy DOM updates
- Efficient event delegation

### Backend
- In-memory storage (fast)
- Minimal middleware
- Async operations
- Proper error handling

## 📝 Code Standards

### Naming Conventions
- **Classes**: PascalCase (TaskModel)
- **Functions**: camelCase (getTasks)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL)
- **Files**: kebab-case (task-routes.ts)

### Code Organization
- One responsibility per component
- Clear separation of concerns
- Comments for complex logic
- Consistent formatting

## 🔄 Git Workflow

Suggested commit structure:
```
feat: Add task creation
fix: Fix CORS issue
docs: Update README
style: Format code
refactor: Improve error handling
test: Add unit tests
```

## 📚 Learning Resources

### Frontend
- DOM Manipulation
- Fetch API
- CSS Grid & Flexbox
- Responsive Design

### Backend
- Express.js
- TypeScript
- RESTful API Design
- Error Handling

### Full Stack
- Client-Server Architecture
- HTTP/HTTPS
- APIs and Integration
- Deployment

---

This documentation provides a comprehensive understanding of the application's design and architecture. Use it as a reference when extending or modifying the codebase.
