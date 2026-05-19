# Todo List App - Frontend Documentation

## Overview
Mobile-first web frontend for the Todo List application built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
frontend/
├── index.html      # HTML structure
├── styles.css      # Styling (mobile-first, responsive)
└── script.js       # Client-side logic and API integration
```

## Features

### Core Functionality
- ✅ Create, read, update, delete tasks
- 🏷️ Filter tasks by status (All, Today, Upcoming, Done)
- 🎯 Task tags (Work, Todo, Personal, Urgent)
- ⏰ Due time tracking
- 💾 Real-time API integration
- 📱 Responsive mobile design

### UI Components

#### Header
- Current date display
- Task counter (remaining vs. completed)
- Tab navigation for filtering

#### Task Cards
- Checkbox for completion toggle
- Task title
- Category tag with color-coding
- Due time display
- Delete button

#### Add Task Section
- Text input for new tasks
- Quick action buttons (Due date, Tag, Priority)
- Add button with plus icon

#### Navigation Bar
- Bottom navigation with 4 tabs (Tasks, Calendar, Alerts, Profile)
- Tab selection indicator

## HTML Structure

The app follows a mobile-first responsive layout:

```html
<div class="app-container">
  <div class="status-bar">...</div>
  <header class="header">...</header>
  <main class="task-list" id="taskList">...</main>
  <section class="add-area">...</section>
  <nav class="nav-bar">...</nav>
</div>
```

## CSS Architecture

### Design System

**Colors:**
- Background: `#F0EFEA`
- Text Primary: `#1A1A18`
- Text Secondary: `#7A7870`
- Border: `#E2E0D9`
- Dark: `#111111`
- White: `#FFFFFF`

**Tag Colors:**
- Work: Green (#D6EAD7, #2D6B30)
- Todo: Blue (#DCE4F5, #2A4A9E)
- Personal: Orange (#FFE8D6, #8B4513)
- Urgent: Red (#FFD6D6, #8B0000)

**Typography:**
- Primary Font: DM Sans
- Heading Font: 42dot Sans
- Font Sizes: 10px - 32px

### Responsive Breakpoints

**Mobile (< 420px):**
- Full-width design
- Optimized spacing and touch targets
- Hidden labels on option buttons

**Desktop (≥ 420px):**
- Wider layout
- Visible labels on buttons
- Enhanced spacing

### Key CSS Classes

```css
.app-container      /* Main app wrapper */
.status-bar         /* Top status bar */
.header             /* Header section */
.tabs               /* Tab navigation */
.task-list          /* Task container */
.task-card          /* Individual task */
.checkbox           /* Task checkbox */
.task-body          /* Task content */
.task-title         /* Task title text */
.task-meta          /* Task metadata */
.tag                /* Category tag */
.task-time          /* Due time */
.add-area           /* Add task section */
.add-input          /* Input field */
.add-btn            /* Add button */
.options-row        /* Quick options */
.opt-btn            /* Option buttons */
.nav-bar            /* Bottom navigation */
.nav-item           /* Navigation item */
```

## JavaScript API

### Configuration
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Main Functions

#### `fetchTasks()`
Retrieves all tasks from the API and renders them.

```javascript
fetchTasks();
```

#### `addNewTask()`
Creates a new task from the input field.

```javascript
addNewTask();
```

#### `deleteTask(id)`
Deletes a task by ID with confirmation.

```javascript
deleteTask('task-id');
```

#### `toggleTask(id)`
Toggles task completion status.

```javascript
toggleTask('task-id');
```

#### `renderTasks()`
Renders tasks to the DOM based on current filter.

```javascript
renderTasks();
```

#### `filterTasks()`
Filters tasks based on selected tab.

```javascript
const filtered = filterTasks();
```

#### `updateCounts()`
Updates remaining and completed task counters.

```javascript
updateCounts();
```

### Event Listeners

**Add Button Click:**
```javascript
addBtn.addEventListener('click', addNewTask);
```

**Enter Key in Input:**
```javascript
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewTask();
});
```

**Tab Click:**
```javascript
tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});
```

**Checkbox Click (inline):**
```html
<div class="checkbox" onclick="toggleTask('${task.id}')">
```

**Delete Button Click (inline):**
```html
<button class="more-btn" onclick="deleteTask('${task.id}')">
```

## API Integration

### Base URL
```javascript
http://localhost:5000/api
```

### Endpoints Used

```javascript
GET /api/tasks              // Fetch all tasks
POST /api/tasks             // Create new task
PATCH /api/tasks/:id/toggle // Toggle completion
DELETE /api/tasks/:id       // Delete task
```

### Fetch Examples

**Get all tasks:**
```javascript
fetch('http://localhost:5000/api/tasks')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Create a task:**
```javascript
fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Task',
    tag: 'Work',
    status: 'pending',
    completed: false
  })
}).then(res => res.json());
```

## Component Rendering

### Task Card Template

```html
<div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
  <div class="checkbox" onclick="toggleTask('${task.id}')">
    ${task.completed ? checkmarkSVG : ''}
  </div>
  <div class="task-body">
    <div class="task-title">${task.title}</div>
    <div class="task-meta">
      <span class="tag ${task.tag.toLowerCase()}">${task.tag}</span>
      ${task.dueTime ? `<span class="task-time">${task.dueTime}</span>` : ''}
    </div>
  </div>
  <button class="more-btn" onclick="deleteTask('${task.id}')">...</button>
</div>
```

### Empty State
```html
<div class="empty-state">
  <div class="empty-state-icon">📝</div>
  <div class="empty-state-text">No tasks yet. Create one to get started!</div>
</div>
```

## Filtering Logic

**All:** Shows all tasks

**Today:** Shows uncompleted tasks created today

**Upcoming:** Shows uncompleted tasks with future dates

**Done:** Shows completed tasks

## Keyboard Shortcuts

- `Enter` in input: Create new task
- `Tab` navigation: Navigate through interface elements

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- **Lazy DOM updates:** Only re-render when needed
- **Event delegation:** Where applicable
- **CSS animations:** Hardware-accelerated
- **Image optimization:** Inline SVGs for icons

## Accessibility Features

- Semantic HTML elements
- ARIA labels (can be added)
- Keyboard navigation support
- Color contrast compliance
- Focus indicators

## Security Considerations

- HTML escaping: `escapeHtml()` prevents XSS
- Input validation: Empty task check
- CORS enabled for API communication

## Troubleshooting

### Tasks Not Loading
1. Verify backend is running on `http://localhost:5000`
2. Check browser console for errors
3. Ensure CORS_ORIGIN includes frontend URL

### Add Task Not Working
1. Check input field has text
2. Verify network tab in DevTools
3. Ensure API endpoint is correct

### Styling Issues
1. Clear browser cache
2. Check styles.css is linked
3. Verify responsive breakpoints

## Development Tips

### Adding a New Tab Filter
1. Add `<button class="tab" data-filter="new-filter">Label</button>`
2. Update `filterTasks()` function logic
3. Add corresponding CSS if needed

### Changing Colors
Edit the color variables in `styles.css`:
```css
fill_EZU7KI: #F0EFEA      /* Background */
fill_NS87VM: #1A1A18      /* Text */
fill_WER36J: #E2E0D9      /* Border */
```

### Custom Styling for Task Tags
Add new class to `styles.css`:
```css
.tag.custom-tag {
    background-color: #your-color;
    color: #text-color;
}
```

## Deployment

### Local Testing
```bash
# Option 1: Open directly
open frontend/index.html

# Option 2: Simple HTTP server
cd frontend
python -m http.server 3000
```

### Production Deployment
1. Update `API_BASE_URL` to production API endpoint
2. Deploy to static hosting (Vercel, Netlify, GitHub Pages)
3. Ensure CORS is configured on backend

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Local storage fallback
- [ ] Drag-and-drop reordering
- [ ] Task search functionality
- [ ] Due date picker
- [ ] Task notifications
- [ ] Export tasks as CSV
- [ ] PWA capabilities

## Support

For issues or questions, refer to the main README.md or backend documentation.
