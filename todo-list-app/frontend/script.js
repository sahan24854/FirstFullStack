// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
let currentFilter = 'all';
let tasksData = [];

// DOM Elements
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tabButtons = document.querySelectorAll('.tab');
const remainingCountEl = document.getElementById('remaining-count');
const doneCountEl = document.getElementById('done-count');

// Event Listeners
addBtn.addEventListener('click', addNewTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewTask();
});

tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});

// Fetch tasks from API
async function fetchTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const result = await response.json();
        tasksData = result.data || [];
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        showError('Failed to load tasks');
    }
}

// Add new task
async function addNewTask() {
    const title = taskInput.value.trim();
    if (!title) {
        showError('Please enter a task');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                tag: 'Todo',
                status: 'pending',
                completed: false,
                dueTime: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                }),
            }),
        });

        if (!response.ok) throw new Error('Failed to create task');

        const result = await response.json();
        tasksData.push(result.data);
        taskInput.value = '';
        renderTasks();
        showSuccess('Task added successfully');
    } catch (error) {
        console.error('Error adding task:', error);
        showError('Failed to add task');
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete task');

        tasksData = tasksData.filter(task => task.id !== id);
        renderTasks();
        showSuccess('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task');
    }
}

// Toggle task completion
async function toggleTask(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
            method: 'PATCH',
        });

        if (!response.ok) throw new Error('Failed to toggle task');

        const result = await response.json();
        const taskIndex = tasksData.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasksData[taskIndex] = result.data;
        }
        renderTasks();
    } catch (error) {
        console.error('Error toggling task:', error);
        showError('Failed to update task');
    }
}

// Render tasks
function renderTasks() {
    const filteredTasks = filterTasks();

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div class="empty-state-text">No tasks yet. Create one to get started!</div>
            </div>
        `;
        updateCounts();
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => `
        <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="checkbox" onclick="toggleTask('${task.id}')">
                ${task.completed ? '<svg class="checkbox-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
            </div>
            <div class="task-body">
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-meta">
                    <span class="tag ${task.tag.toLowerCase()}">${task.tag}</span>
                    ${task.dueTime ? `<span class="task-time">${task.dueTime}</span>` : ''}
                </div>
            </div>
            <button class="more-btn" onclick="deleteTask('${task.id}')">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="2" fill="currentColor"/>
                    <circle cx="10" cy="4" r="2" fill="currentColor"/>
                    <circle cx="10" cy="16" r="2" fill="currentColor"/>
                </svg>
            </button>
        </div>
    `).join('');

    updateCounts();
}

// Filter tasks
function filterTasks() {
    const today = new Date().toDateString();

    return tasksData.filter(task => {
        switch (currentFilter) {
            case 'today':
                return !task.completed && new Date(task.createdAt).toDateString() === today;
            case 'upcoming':
                return !task.completed && new Date(task.createdAt) > new Date();
            case 'done':
                return task.completed;
            case 'all':
            default:
                return true;
        }
    });
}

// Update task counts
function updateCounts() {
    const remaining = tasksData.filter(t => !t.completed).length;
    const done = tasksData.filter(t => t.completed).length;
    remainingCountEl.textContent = remaining;
    doneCountEl.textContent = done;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show error message
function showError(message) {
    // Simple alert - you can replace with a toast notification library
    console.error(message);
}

// Show success message
function showSuccess(message) {
    console.log(message);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Todo List App Initialized');
    fetchTasks();
});
