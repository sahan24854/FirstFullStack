# To-Do List - Task Management App

A full-stack task management application with a modern UI built from Figma design.

## Project Structure

```
todolist/
├── frontend/           # React-based frontend application
│   ├── index.html     # Main HTML file
│   ├── styles.css     # CSS styles
│   ├── script.js      # JavaScript logic
│   └── README.md      # Frontend documentation
│
├── backend/           # Node.js/Express API server
│   ├── src/
│   │   ├── app.ts            # Express app setup
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Data models
│   │   └── routes/           # API routes
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   ├── tsconfig.json         # TypeScript config
│   └── README.md             # Backend documentation
│
└── README.md          # This file
```

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All, Today, Done)
- ✅ Tag management (Work, Personal, Urgent, Todo)
- ✅ Calendar view with task indicators
- ✅ Alerts and notifications
- ✅ User profile and settings
- ✅ Responsive design
- ✅ REST API backend
- ✅ TypeScript backend

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 3. Open Frontend

```bash
# Open frontend/index.html in your browser
# Or use a simple HTTP server:
cd frontend
npx http-server
```

The frontend will be available at `http://localhost:8080`

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/status/:status` - Get tasks by status (done/pending)
- `GET /api/tasks/tag/:tag` - Get tasks by tag
- `GET /api/today` - Get today's tasks
- `GET /api/health` - Health check

## Development

### Backend

- Built with Express.js
- TypeScript for type safety
- In-memory database (can be replaced with real DB)
- CORS enabled for frontend integration

### Frontend

- Vanilla JavaScript (no framework required)
- CSS3 for styling
- Responsive design
- Real-time UI updates

## Customization

### Backend Configuration

Edit `.env` file in the backend folder:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration

Update `API_URL` in `frontend/script.js`:

```javascript
const API_URL = 'http://localhost:5000/api';
```

## Design Reference

The UI is based on the Figma design with:
- Clean, modern interface
- Intuitive navigation
- Mobile-responsive layout
- Color-coded tags
- Visual feedback for interactions

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Task due date notifications
- [ ] Recurring tasks
- [ ] Task attachments
- [ ] Team collaboration
- [ ] Mobile app
- [ ] Dark mode

## License

MIT
