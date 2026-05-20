# Setup Guide - To-Do List Full-Stack Application

Complete setup instructions for running the To-Do List task management application.

## Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- A modern web browser
- A terminal/command prompt

## Installation Steps

### 1. Verify Node.js Installation

```bash
node --version
npm --version
```

Should output version numbers like `v18.x.x` and `8.x.x`

### 2. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

This installs:
- express (web framework)
- cors (cross-origin support)
- dotenv (environment variables)
- typescript (type safety)
- ts-node (TypeScript runner)

### 3. Verify Backend Installation

```bash
npm run build
```

Should compile TypeScript without errors.

## Running the Application

### Terminal 1: Start the Backend API Server

```bash
cd backend
npm run dev
```

You should see:

```
╔════════════════════════════════════════╗
║     To-Do List API Server                  ║
║     Running on port 5000               ║
║     Environment: development           ║
║                                        ║
║     http://localhost:5000              ║
║                                        ║
║     Frontend: http://localhost:3000    ║
╚════════════════════════════════════════╝
```

### Terminal 2: Serve the Frontend

```bash
cd frontend
npx http-server
```

Or if http-server is not installed:

```bash
npm install -g http-server
http-server
```

You should see:

```
Starting up http-server, serving .
Available on:
  http://localhost:8080
```

### 3. Open in Browser

Visit `http://localhost:8080` in your web browser.

You should now see the To-Do List interface with:
- Sidebar navigation
- Tasks page (active by default)
- Calendar, Alerts, and Profile sections
- Sample tasks loaded from the API

## Testing the Application

### Test Task Operations

1. **View Tasks**: See the sample tasks in the main dashboard
2. **Add Task**: Type in the input field and press Enter or click "Add"
3. **Complete Task**: Click the checkbox next to any task
4. **Delete Task**: Click the trash icon on any task
5. **Filter Tasks**: Use All/Today/Done buttons
6. **View Calendar**: Click Calendar in sidebar, see task indicators
7. **View Alerts**: Click Alerts to see notifications
8. **View Profile**: Click Profile to see stats and settings

### API Testing (optional)

In a new terminal, test API endpoints:

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Get health status
curl http://localhost:5000/api/health

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Task","tag":"work"}'

# Update a task
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/1
```

## Project Structure

```
Todolist/
├── backend/
│   ├── src/
│   │   ├── app.ts                    # Main app
│   │   ├── controllers/
│   │   │   └── taskController.ts    # Task logic
│   │   ├── models/
│   │   │   └── Task.ts              # Types
│   │   └── routes/
│   │       └── taskRoutes.ts        # Routes
│   ├── .env                          # Config
│   ├── package.json                  # Dependencies
│   └── tsconfig.json                 # TS config
│
├── frontend/
│   ├── index.html                    # Main page
│   ├── styles.css                    # Styles
│   ├── script.js                     # Logic
│   └── README.md
│
├── README.md                         # Main docs
└── .gitignore
```

## Common Issues & Solutions

### Issue: "Cannot find module 'express'"

**Solution:**
```bash
cd backend
npm install
```

### Issue: Backend runs but frontend shows "Tasks not loaded"

**Solution:**
1. Check if backend is running on `http://localhost:5000`
2. Open browser console (F12) to check for errors
3. Verify CORS_ORIGIN in `backend/.env` is set to frontend URL

### Issue: Port 5000 already in use

**Solution:**
Change PORT in `backend/.env`:
```env
PORT=5001
```

Also update `API_URL` in `frontend/script.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### Issue: Port 8080 already in use

**Solution:**
```bash
cd frontend
npx http-server -p 8081
```

### Issue: Tasks not persisting after refresh

**Note:** This is expected. Backend uses in-memory storage. For persistence, connect a database.

## Production Deployment

### Build Backend

```bash
cd backend
npm run build
```

Outputs compiled code to `dist/` folder.

### Start Production Server

```bash
npm start
```

### Serve Frontend

Use any static file server (nginx, Apache, GitHub Pages, Netlify, Vercel):

```bash
# Option 1: Simple HTTP server
cd frontend
npx http-server

# Option 2: Deploy to Netlify (requires account)
# Drag and drop frontend folder to Netlify.com

# Option 3: GitHub Pages (for static hosting only)
# Need separate backend server (Heroku, Railway, etc.)
```

## Environment Variables

### Backend (.env)

```env
# Server port
PORT=5000

# Environment
NODE_ENV=development

# CORS origin (frontend URL)
CORS_ORIGIN=http://localhost:3000
```

### Frontend (script.js)

```javascript
// Change this if backend is on different URL
const API_URL = 'http://localhost:5000/api';
```

## Customization

### Change API Port

1. Edit `backend/.env`: `PORT=3001`
2. Edit `frontend/script.js`: `const API_URL = 'http://localhost:3001/api'`
3. Restart both servers

### Change Frontend Port

1. Stop current server (Ctrl+C)
2. Run: `npx http-server -p 9000`
3. Open: `http://localhost:9000`

### Add New Features

See individual README.md files in:
- `backend/README.md` - Add API endpoints
- `frontend/README.md` - Add UI components

## Next Steps

### For Development

1. Explore the code structure
2. Modify styles in `frontend/styles.css`
3. Add new features in `frontend/script.js`
4. Add API endpoints in `backend/src/routes/taskRoutes.ts`

### For Production

1. Add database (MongoDB/PostgreSQL)
2. Add authentication
3. Set up CI/CD pipeline
4. Deploy backend and frontend
5. Set up monitoring and logging

## Support

- Check `README.md` files in each folder
- Review inline code comments
- Check browser console for errors (F12)
- Check terminal output for API errors

## Quick Reference Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Run in development
npm run build       # Build for production
npm start           # Run production build

# Frontend
cd frontend
npx http-server     # Start local server
npx http-server -p PORT  # Specify port

# Utilities
node --version      # Check Node.js
npm --version       # Check npm
curl [URL]          # Test API endpoints
```

## Architecture Diagram

```
Browser
   |
   |-- index.html (loads)
   |-- styles.css (loads)
   |-- script.js (loads)
   |
   |-- API calls to Backend
   |
   v
Backend Server (Port 5000)
   |
   ├-- Express App
   ├-- CORS Middleware
   ├-- Request Logger
   ├-- Routes Handler
   ├-- Controllers (Business Logic)
   └-- In-Memory Database
```

Enjoy using To-Do List! 🎉
