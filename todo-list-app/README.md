# Todo List App - Full Stack

A modern, mobile-first todo list application built with Node.js/Express backend and vanilla HTML/CSS/JavaScript frontend, designed based on a Figma prototype.

## Project Structure

```
Todolist/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── app.ts          # Express application setup
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Data models
│   │   └── routes/         # API routes
│   ├── package.json        # Dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── .env                # Environment variables
└── frontend/               # HTML/CSS/JavaScript frontend
    ├── index.html          # Main HTML file
    ├── styles.css          # Styling
    └── script.js           # Client-side logic
```

## Features

### Frontend
- 📱 Mobile-first responsive design (390px - iPhone width)
- ✅ Task management (create, read, update, delete)
- 🏷️ Task filtering (All, Today, Upcoming, Done)
- 🎨 Modern, clean UI based on Figma design
- ⚡ Real-time task updates
- 🎯 Task tags (Work, Todo, Personal, Urgent)
- ⏰ Due time tracking
- 💾 Persistent API integration

### Backend
- 🚀 Express.js REST API
- 📦 In-memory task storage
- 🔍 Task filtering and search
- ✨ TypeScript for type safety
- 🛡️ CORS enabled for frontend integration
- 📝 Complete CRUD operations

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

The server will run on `http://localhost:5000`

#### Backend Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports filters) |
| GET | `/api/tasks/:id` | Get a specific task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion |
| GET | `/api/health` | Health check |

### Frontend Setup

1. **Open the frontend**
   - Simply open `frontend/index.html` in a web browser, or
   - Use a local server:
   ```bash
   cd frontend
   python -m http.server 3000
   # or
   npx http-server -p 3000
   ```

2. **Access the app**
   - Open `http://localhost:3000` in your browser

## API Examples

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "tag": "Work",
    "dueTime": "3:00 PM",
    "priority": "high"
  }'
```

### Toggle Task Status
```bash
curl -X PATCH http://localhost:5000/api/tasks/{taskId}/toggle
```

### Delete a Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/{taskId}
```

## Task Object Schema

```typescript
{
  id: string;                    // UUID
  title: string;                 // Task title
  description?: string;          // Optional description
  tag: 'Work' | 'Todo' | 'Personal' | 'Urgent';
  dueDate?: string;             // Optional due date
  dueTime?: string;             // Optional due time (e.g., "3:00 PM")
  priority?: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  completed: boolean;
  createdAt: string;            // ISO timestamp
  updatedAt: string;            // ISO timestamp
}
```

## Styling & Design

The frontend is styled according to the Figma design with:
- **Color Palette**: 
  - Background: #F0EFEA
  - Text: #1A1A18
  - Accent: #E2E0D9
  - Tag colors: Green (Work), Blue (Todo), Orange (Personal), Red (Urgent)

- **Responsive breakpoints**:
  - Mobile-first design
  - Optimized for 390px width (iPhone)
  - Scales up to desktop

## Development

### Add a New Feature

1. **Backend**: Add route in `src/routes/` and handler in `src/controllers/`
2. **Frontend**: Update HTML, CSS, and JavaScript accordingly

### Building for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
# Deploy to any static hosting service
```

## Environment Variables

### Backend (.env)
```
PORT=5000                              # Server port
NODE_ENV=development                   # Environment
CORS_ORIGIN=http://localhost:3000     # Frontend URL
```

## Future Enhancements

- [ ] User authentication
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real-time updates with WebSockets
- [ ] Calendar view
- [ ] Recurring tasks
- [ ] Task notifications
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Task sharing and collaboration

## Technologies Used

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **UUID Generation**: uuid library

### Frontend
- **HTML5** for structure
- **CSS3** for styling
- **Vanilla JavaScript** for interactivity
- **Fetch API** for HTTP requests

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ based on Figma design**
