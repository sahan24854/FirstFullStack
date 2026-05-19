const API_URL = 'http://localhost:5000/api';

let tasks = [];
let alerts = [];
let currentFilter = 'all';
let calYear = 2026;
let calMonth = 4;

const pageTitles = {
  tasks: 'My Tasks',
  calendar: 'Calendar',
  alerts: 'Alerts',
  profile: 'Profile'
};

const sampleAlerts = [
  { id: 1, type: 'warn', title: 'Task due soon', desc: 'Submit project report is due in 2 hours', time: '10 minutes ago', unread: true },
  { id: 2, type: 'info', title: 'Reminder set', desc: 'Design review meeting tomorrow at 10am', time: '1 hour ago', unread: true },
  { id: 3, type: 'success', title: 'Task completed', desc: 'Buy groceries marked as done', time: '3 hours ago', unread: true },
  { id: 4, type: 'danger', title: 'Task overdue', desc: 'Call dentist was due yesterday', time: 'Yesterday', unread: false },
  { id: 5, type: 'info', title: 'New task added', desc: 'Team standup added to your task list', time: '2 days ago', unread: false },
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
  renderAlerts();
  renderCal();
});

// PAGE NAVIGATION
function showPage(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  el.classList.add('active');
  document.getElementById('pageTitle').textContent = pageTitles[page];
  
  if (page === 'calendar') {
    renderCal();
    renderUpcomingTasks();
  }
}

// FETCH TASKS FROM API
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    tasks = await response.json();
    renderTasks();
    updateCounts();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    loadSampleTasks();
  }
}

// LOAD SAMPLE TASKS (fallback if API is down)
function loadSampleTasks() {
  tasks = [
    { id: 1, name: 'Design review meeting', tag: 'work', done: false, date: '2026-05-19' },
    { id: 2, name: 'Submit project report', tag: 'urgent', done: false, date: '2026-05-20' },
    { id: 3, name: 'Buy groceries', tag: 'personal', done: true, date: '2026-05-18' },
    { id: 4, name: 'Team standup', tag: 'work', done: false, date: '2026-05-21' },
    { id: 5, name: 'Fix login bug', tag: 'todo', done: false, date: '2026-05-22' },
  ];
  renderTasks();
  updateCounts();
}

// RENDER TASKS
function renderTasks() {
  const list = document.getElementById('task-list');
  let filtered = tasks;
  
  if (currentFilter === 'today') {
    const today = new Date().toISOString().split('T')[0];
    filtered = tasks.filter(t => !t.done && t.date === today);
  } else if (currentFilter === 'done') {
    filtered = tasks.filter(t => t.done);
  }
  
  if (filtered.length === 0) {
    list.innerHTML = '<div class="task-row"><div style="flex: 1; text-align: center; padding: 1rem; color: var(--color-text-tertiary);">No tasks found</div></div>';
    return;
  }
  
  list.innerHTML = filtered.map(t => `
    <div class="task-row">
      <div class="check ${t.done ? 'done' : ''}" onclick="toggleTask(${t.id})" title="Mark as done">
        ${t.done ? '<i class="ti ti-check"></i>' : ''}
      </div>
      <div class="task-name ${t.done ? 'done' : ''}">${escapeHtml(t.name)}</div>
      <span class="tag ${t.tag}">${t.tag}</span>
      <div class="task-date">${formatDate(t.date)}</div>
      <div class="task-actions">
        <button class="icon-btn" onclick="deleteTask(${t.id})" title="Delete task" aria-label="Delete task">
          <i class="ti ti-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// TOGGLE TASK
async function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  task.done = !task.done;
  
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    
    if (response.ok) {
      renderTasks();
      updateCounts();
    }
  } catch (error) {
    console.error('Error updating task:', error);
    renderTasks();
  }
}

// DELETE TASK
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
      updateCounts();
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// ADD TASK
async function addTask() {
  const input = document.getElementById('task-input');
  const name = input.value.trim();
  
  if (!name) {
    alert('Please enter a task name');
    return;
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  const newTask = {
    name,
    tag: 'todo',
    done: false,
    date: today
  };
  
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    
    if (response.ok) {
      const addedTask = await response.json();
      tasks.push(addedTask);
      input.value = '';
      renderTasks();
      updateCounts();
    }
  } catch (error) {
    console.error('Error adding task:', error);
    // Add to local list as fallback
    newTask.id = Math.max(...tasks.map(t => t.id), 0) + 1;
    tasks.push(newTask);
    input.value = '';
    renderTasks();
    updateCounts();
  }
}

// HANDLE KEY PRESS
function handleKey(e) {
  if (e.key === 'Enter') addTask();
}

// FOCUS ADD INPUT
function focusAdd() {
  document.getElementById('task-input').focus();
}

// SET FILTER
function setFilter(f, el) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderTasks();
}

// UPDATE COUNTS
function updateCounts() {
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pending = total - done;
  
  document.getElementById('total-count').textContent = total;
  document.getElementById('done-count').textContent = done;
  document.getElementById('done-percent').textContent = total > 0 ? Math.round((done / total) * 100) + '% done' : '0% done';
  document.getElementById('progress-count').textContent = pending;
  
  document.getElementById('p-total').textContent = total;
  document.getElementById('p-done').textContent = done;
  document.getElementById('p-rate').textContent = total > 0 ? Math.round((done / total) * 100) + '%' : '0%';
  
  const badge = document.getElementById('tasks-badge');
  if (badge) badge.textContent = pending;
  
  // Due today count
  const today = new Date().toISOString().split('T')[0];
  const dueToday = tasks.filter(t => !t.done && t.date === today).length;
  document.getElementById('due-today').textContent = dueToday;
}

// CALENDAR
function renderCal() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-month-title').textContent = months[calMonth] + ' ' + calYear;
  
  const grid = document.getElementById('cal-grid');
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  
  let html = '';
  
  for (let i = 0; i < firstDay; i++) {
    const d = new Date(calYear, calMonth, -firstDay + i + 1).getDate();
    html += `<div class="cal-cell other-month">${d}</div>`;
  }
  
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasTask = tasks.some(t => t.date === dateStr);
    
    html += `<div class="cal-cell ${isToday ? 'today' : ''} ${hasTask ? 'has-task' : ''}">${d}</div>`;
  }
  
  grid.innerHTML = html;
}

// CHANGE MONTH
function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  if (calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  renderCal();
}

// RENDER UPCOMING TASKS
function renderUpcomingTasks() {
  const container = document.getElementById('upcoming-tasks');
  const upcoming = tasks
    .filter(t => !t.done)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
  
  if (upcoming.length === 0) {
    container.innerHTML = '<div class="task-row"><div style="flex: 1; text-align: center; padding: 1rem; color: var(--color-text-tertiary);">No upcoming tasks</div></div>';
    return;
  }
  
  container.innerHTML = upcoming.map(t => `
    <div class="task-row">
      <div class="check" onclick="toggleTask(${t.id})" title="Mark as done"></div>
      <div class="task-name">${escapeHtml(t.name)}</div>
      <span class="tag ${t.tag}">${t.tag}</span>
      <div class="task-date">${formatDate(t.date)}</div>
    </div>
  `).join('');
}

// ALERTS
function renderAlerts() {
  const container = document.getElementById('alert-list');
  container.innerHTML = sampleAlerts.map(alert => `
    <div class="alert-item ${alert.unread ? 'unread' : ''}">
      <div class="alert-icon ${alert.type}">
        ${getAlertIcon(alert.type)}
      </div>
      <div class="alert-body">
        <div class="alert-title">${alert.title}</div>
        <div class="alert-desc">${alert.desc}</div>
        <div class="alert-time">${alert.time}</div>
      </div>
      ${alert.unread ? '<div class="alert-dot"></div>' : ''}
    </div>
  `).join('');
  
  const unreadCount = sampleAlerts.filter(a => a.unread).length;
  const badge = document.getElementById('alerts-badge');
  if (badge) badge.textContent = unreadCount;
}

function getAlertIcon(type) {
  const icons = {
    'warn': '<i class="ti ti-clock"></i>',
    'info': '<i class="ti ti-bell"></i>',
    'success': '<i class="ti ti-check"></i>',
    'danger': '<i class="ti ti-alert-circle"></i>',
  };
  return icons[type] || '<i class="ti ti-info-circle"></i>';
}

function markAllRead() {
  sampleAlerts.forEach(alert => alert.unread = false);
  renderAlerts();
}

// UTILITIES
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
