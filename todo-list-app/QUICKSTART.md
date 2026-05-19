# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Run Backend Only (Fastest)

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:5000`

### Option 2: Full Stack Setup

#### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

#### Terminal 2: Frontend
```bash
cd frontend

# Using Python
python -m http.server 3000

# OR using Node.js
npx http-server -p 3000

# OR using Node.js (if http-server not installed)
npx -p http-server http-server -p 3000
```

Open `http://localhost:3000` in your browser

## 📁 Project Structure

```
Todolist/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── app.ts       # Main server
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Data models
│   │   └── routes/      # API routes
│   ├── package.json
│   └── .env
│
└── frontend/            # HTML/CSS/JS
    ├── index.html       # Main page
    ├── styles.css       # Styling
    └── script.js        # Logic
```

## 🔧 Environment Setup

### Backend .env
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 📝 First Task

1. Open the app in your browser
2. Type "My first task" in the input
3. Press Enter or click the + button
4. Click the checkbox to mark as done
5. Click the ⋮ button to delete

## 🧪 Test the API

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","tag":"Work","status":"pending","completed":false}'

# Check health
curl http://localhost:5000/api/health
```

## 🎨 Customize

### Change Colors (frontend/styles.css)
```css
fill_EZU7KI: #F0EFEA      /* Background */
fill_NS87VM: #1A1A18      /* Text */
```

### Change Port (backend/.env)
```env
PORT=8000  # Change from 5000 to 8000
CORS_ORIGIN=http://localhost:3000  # Update frontend URL if needed
```

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in `.env` or kill process using `lsof -i :5000` |
| CORS error | Check `CORS_ORIGIN` matches frontend URL in `.env` |
| Tasks not loading | Ensure backend is running and API_BASE_URL in script.js is correct |
| Module not found | Run `npm install` in backend directory |

## 📚 Next Steps

1. **Read the docs:**
   - `README.md` - Full project overview
   - `backend/README.md` - API documentation
   - `frontend/README.md` - Frontend guide

2. **Explore the code:**
   - Backend: `backend/src/app.ts`
   - Frontend: `frontend/script.js`

3. **Build on it:**
   - Add user authentication
   - Connect to a database
   - Add recurring tasks
   - Implement dark mode

## 🎯 API Endpoints Quick Reference

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle complete |

## 💡 Tips

- The backend stores tasks in memory (lost on restart)
- Add a database in `src/models/Task.ts` for persistence
- Use `npm run build` to compile TypeScript before production
- Frontend works offline in terms of UI, but API calls need backend

## 🤝 Need Help?

Check the detailed documentation:
- Backend errors → `backend/README.md`
- Frontend issues → `frontend/README.md`
- General questions → `README.md`

---

**Enjoy building with your Todo List App!** 🎉
