# Frontend - To-Do List UI

A beautiful, responsive task management interface built from Figma design.

## Quick Start

1. Open `index.html` in your browser or use a local server:

```bash
npx http-server
```

2. Visit `http://localhost:8080`

## Features

### Dashboard
- View all tasks with status
- Statistics (total, completed, in progress)
- Quick task filtering
- Add new tasks

### Calendar
- Monthly calendar view
- Task indicators on dates
- Navigate between months
- View upcoming tasks

### Alerts
- Notification center
- Different alert types (Info, Warning, Success, Danger)
- Mark notifications as read

### Profile
- User information
- Task statistics
- Settings management
- Toggle preferences

## File Structure

- `index.html` - Main application template
- `styles.css` - All CSS styling with CSS variables
- `script.js` - Application logic and API integration

## API Integration

The frontend communicates with the backend API:

```javascript
const API_URL = 'http://localhost:5000/api';
```

### Key Functions

- `fetchTasks()` - Fetch all tasks from API
- `addTask()` - Create a new task
- `toggleTask(id)` - Mark task as done/pending
- `deleteTask(id)` - Delete a task

## Styling

Uses CSS custom properties for theming:

```css
--color-background-primary: #ffffff;
--color-text-primary: #1a1a1a;
--color-text-info: #1976d2;
/* ... more variables */
```

## Responsive Design

- Desktop: Full layout with sidebar
- Tablet: Adjusted grid layout
- Mobile: Collapsible sidebar, stack layout

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

No build tools required - vanilla HTML/CSS/JavaScript.

To modify styles:
1. Edit `styles.css`
2. Changes apply immediately in browser

To add features:
1. Update HTML in `index.html`
2. Add JavaScript in `script.js`
3. Follow existing patterns for consistency
