# Quick Reference - Taskly

## ⚡ Quick Start (30 seconds)

```bash
# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Frontend (in new terminal)
cd frontend && npx http-server

# Browser
# Visit: http://localhost:8080
```

## 📁 Project Structure

```
Todolist/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── app.ts       # Express app
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Data types
│   │   └── routes/      # API routes
│   ├── .env             # Config
│   └── package.json     # Dependencies
│
├── frontend/            # HTML/CSS/JS UI
│   ├── index.html       # Main page
│   ├── styles.css       # Styling
│   └── script.js        # Logic
│
├── README.md            # Main docs
└── SETUP_GUIDE.md       # Installation
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/status/:status` | Filter by status |
| GET | `/api/tasks/tag/:tag` | Filter by tag |
| GET | `/api/today` | Today's tasks |
| GET | `/api/health` | Health check |

## 🎯 Frontend Features

- ✅ Create/Read/Update/Delete tasks
- ✅ Filter by status (All, Today, Done)
- ✅ Tags (Work, Personal, Urgent, Todo)
- ✅ Calendar view
- ✅ Alerts/Notifications
- ✅ User profile
- ✅ Settings
- ✅ Responsive design

## 🛠️ Common Commands

### Backend
```bash
cd backend

npm install           # Install deps
npm run dev          # Dev server
npm run build        # TypeScript build
npm start            # Run production
```

### Frontend
```bash
cd frontend

npx http-server      # Start server
npx http-server -p 9000  # Custom port
```

## ⚙️ Configuration

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (script.js)
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 📝 Task Model

```javascript
{
  id: 1,
  name: "Task name",
  tag: "work",        // work|personal|urgent|todo
  done: false,        // true when completed
  date: "2026-05-19", // YYYY-MM-DD
  createdAt: "2026-05-19T10:00:00Z",
  updatedAt: "2026-05-19T10:00:00Z"
}
```

## 🔗 Request Examples

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New task",
    "tag": "work",
    "date": "2026-05-20"
  }'
```

### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "done": true,
    "tag": "personal"
  }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change `PORT` in `.env` |
| Tasks not loading | Check `API_URL` in `script.js` |
| CORS error | Verify `CORS_ORIGIN` in `.env` |
| npm install fails | Delete `node_modules`, try again |
| Styles not loading | Clear browser cache |

## 📱 URLs

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:8080` |
| Backend API | `http://localhost:5000` |
| API Health | `http://localhost:5000/api/health` |

## 🎨 CSS Variables

```css
--color-primary: #1a1a1a;
--color-secondary: #626262;
--color-background: #ffffff;
--color-border: #e0e3e8;
--color-info: #1976d2;
--color-warning: #f57c00;
--color-danger: #d32f2f;
--color-success: #388e3c;
```

## 🔑 Key JavaScript Functions

```javascript
// Task operations
fetchTasks()              // Load tasks from API
addTask()                // Create new task
toggleTask(id)           // Mark done/pending
deleteTask(id)           // Remove task

// UI operations
showPage(page, el)       // Switch pages
renderTasks()            // Redraw task list
updateCounts()           // Update statistics
setFilter(filter, el)    // Apply filter

// Calendar
renderCal()              // Draw calendar
changeMonth(dir)         // Switch month

// Alerts
renderAlerts()           // Show notifications
markAllRead()            // Mark as read
```

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "typescript": "^5.0.2",
  "ts-node": "^10.9.1"
}
```

### Frontend
- Vanilla JavaScript (no dependencies)
- Tabler Icons (CDN)

## 🚀 Deployment Checklist

- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Add user authentication
- [ ] Update CORS origin to production URL
- [ ] Build backend: `npm run build`
- [ ] Deploy backend to cloud (Heroku, Railway, etc.)
- [ ] Deploy frontend to static host (Netlify, Vercel, etc.)
- [ ] Set up CI/CD pipeline
- [ ] Configure HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Add error tracking (Sentry)

## 📚 Documentation Files

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Installation instructions
- `ARCHITECTURE.md` - System design
- `backend/README.md` - API documentation
- `frontend/README.md` - UI documentation

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with clear messages
5. Push and create pull request

## 📞 Support

- Check README.md files
- Review code comments
- Check browser console (F12)
- Review terminal output
- Test with curl/Postman

## 💡 Tips

- Press `F12` in browser to open developer tools
- Use `Ctrl+Shift+K` to access browser console
- Use `npm run dev` for auto-reload
- Use `curl` to test API endpoints
- Check `.env` files for configuration
- Review `script.js` for frontend logic
- Review `taskController.ts` for backend logic

## 🎓 Learning Resources

- Express.js: https://expressjs.com
- TypeScript: https://www.typescriptlang.org
- REST API: https://restfulapi.net
- MDN Web Docs: https://developer.mozilla.org

---

**Version:** 1.0.0  
**Last Updated:** May 19, 2026  
**License:** MIT
