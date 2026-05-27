const API_URL = 'http://localhost:5000/api';

let tasks = [];
let alerts = [];
let userSessionContext = null;
let currentFilter = 'all';
let calYear = 2026;
let calMonth = 4;

const localizationMatrix = {
  en: {
    logo: "To-Do List", menu_label: "Menu", nav_tasks: "Tasks", nav_calendar: "Calendar",
    nav_alerts: "Alerts", nav_profile: "Profile", nav_settings: "Settings",
    table_task: "Task", table_tag: "Tag", table_date: "Due Date", table_actions: "Actions",
    stat_total: "Total tasks", stat_completed: "Completed", stat_progress: "In progress", stat_due: "Due today",
    section_all_tasks: "All tasks", section_upcoming: "Upcoming tasks", btn_add: "Add",
    weekly_summary_title: "Weekly Performance Summary", profile_edit_title: "Modify Profile Details",
    label_name: "Display Name", label_bio: "Short Bio", custom_tags_title: "Workspace Tag Personalization",
    setting_mode: "Interface Display Mode", setting_color: "Palette Configuration Tint", setting_lang: "Active Localization Engine"
  },
  si: {
    logo: "කාර්ය ලැයිස්තුව", menu_label: "මෙනුව", nav_tasks: "කාර්යයන්", nav_calendar: "දින දර්ශනය",
    nav_alerts: "නිවේදන", nav_profile: "ගිණුම", nav_settings: "සැකසුම්",
    table_task: "කාර්යය", table_tag: "ටැග් එක", table_date: "අවසාන දිනය", table_actions: "ක්‍රියාකාරකම්",
    stat_total: "මුළු කාර්යයන්", stat_completed: "නිමකල ඒවා", stat_progress: "සිදුකෙරෙමින් පවතින", stat_due: "අද දිනට නියමිත",
    section_all_tasks: "සියලුම කාර්යයන්", section_upcoming: "මීළඟට නියමිත කාර්යයන්", btn_add: "එකතු කරන්න",
    weekly_summary_title: "සතිපතා කාර්ය සාධන සාරාංශය", profile_edit_title: "පරිශීලක විස්තර වෙනස් කරන්න",
    label_name: "ප්‍රදර්ශන නාමය", label_bio: "කෙටි ජීව දත්ත", custom_tags_title: "ටැග් පුද්ගලීකරණය",
    setting_mode: "දර්ශන ප්‍රකාරය", setting_color: "වර්ණ තේමාව තෝරන්න", setting_lang: "භාෂාව වෙනස් කරන්න"
  }
};

// 1. SECURITY & ACCESS PASS ENGINE PIPELINES
async function requestOtpToken() {
  const email = document.getElementById('auth-email').value.trim();
  if (!email) return alert("Please enter a valid email address.");

  try {
    const res = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      document.getElementById('otp-request-zone').style.display = 'none';
      document.getElementById('otp-verification-zone').style.display = 'block';
    } else {
      alert("Failed to send OTP. Please try again.");
    }
  } catch (err) {
    console.error("Auth server connection fault:", err);
    mockFallbackAuthentication(email);
  }
}

async function verifyOtpToken() {
  const email = document.getElementById('auth-email').value.trim();
  const otp = document.getElementById('auth-otp').value.trim();

  try {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    if (res.ok) {
      const data = await res.json();
      userSessionContext = data.user;
      completeSessionInitialization();
    } else {
      alert("Invalid validation token code.");
    }
  } catch (err) {
    alert("Backend unreached. Applying immediate local offline workspace session.");
    mockFallbackAuthentication(email);
  }
}

function mockFallbackAuthentication(email) {
  userSessionContext = {
    id: "offline_user", email: email,
    profile: { name: email.split('@')[0], bio: "Local baseline sandbox instance execution." },
    settings: { theme: 'light', colorTheme: 'default', language: 'en' },
    tags: [
      { id: "t1", name: "Work", color: "work" },
      { id: "t2", name: "Personal", color: "personal" },
      { id: "t3", name: "Urgent", color: "urgent" },
      { id: "t4", name: "Todo", color: "todo" }
    ]
  };
  completeSessionInitialization();
}

function completeSessionInitialization() {
  document.getElementById('auth-overlay').style.display = 'none';
  
  // Load settings configurations onto workspace DOM trees
  applyTheme(userSessionContext.settings.theme);
  applyPalette(userSessionContext.settings.colorTheme);
  applyLanguage(userSessionContext.settings.language);
  renderCustomTagsControlPanel();
  populateTaskCreationTagDropdown();

  // Draw user details context arrays
  document.getElementById('user-avatar').textContent = userSessionContext.profile.name.substring(0,2).toUpperCase();
  document.getElementById('user-name').textContent = userSessionContext.profile.name;
  document.getElementById('user-email').textContent = userSessionContext.email;
  
  document.getElementById('profile-avatar-display').textContent = userSessionContext.profile.name.substring(0,2).toUpperCase();
  document.getElementById('profile-name-display').textContent = userSessionContext.profile.name;
  document.getElementById('profile-bio-display').textContent = userSessionContext.profile.bio;
  document.getElementById('profile-email-display').textContent = userSessionContext.email;

  document.getElementById('edit-profile-name').value = userSessionContext.profile.name;
  document.getElementById('edit-profile-bio').value = userSessionContext.profile.bio;

  fetchTasks();
  fetchAlertsAndNotifications();
  fetchWeeklySummaryStream();
}

async function persistUserSessionContext() {
  if (!userSessionContext || userSessionContext.id === 'offline_user') return;
  try {
    await fetch(`${API_URL}/auth/users/${userSessionContext.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: userSessionContext.profile,
        settings: userSessionContext.settings,
        tags: userSessionContext.tags
      })
    });
  } catch (err) {
    console.error("Failed to persist user settings:", err);
  }
}

// 2. CORE UTILITY DATA STREAM CALLS
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks?userId=${userSessionContext.id}`);
    tasks = await response.json();
  } catch (error) {
    // If backend is configured to use mock data arrays, load baseline mocks scoped to active context tags
    tasks = [
      { id: 1, name: 'Complete UI implementation review', tagId: userSessionContext.tags[2].id, done: false, date: '2026-05-20' },
      { id: 2, name: 'Prepare project documentation portfolio', tagId: userSessionContext.tags[0].id, done: false, date: '2026-05-24' },
      { id: 3, name: 'Clean workspace environment directories', tagId: userSessionContext.tags[1].id, done: true, date: '2026-05-19' }
    ];
  }
  renderTasks();
  updateCounts();
}

function renderTasks() {
  const list = document.getElementById('task-list');
  let filtered = tasks;

  if (currentFilter === 'today') {
    const todayStr = new Date().toISOString().split('T')[0];
    filtered = tasks.filter(t => !t.done && t.date === todayStr);
  } else if (currentFilter === 'done') {
    filtered = tasks.filter(t => t.done);
  }

  if (filtered.length === 0) {
    list.innerHTML = '<div class="task-row"><div style="flex: 1; text-align: center; padding: 1rem; color: var(--color-text-tertiary);">No tasks found</div></div>';
    return;
  }

  list.innerHTML = filtered.map(t => {
    const associatedTag = userSessionContext.tags.find(tag => tag.id === t.tagId) || { name: 'Todo', color: 'todo' };
    return `
      <div class="task-row">
        <div class="check ${t.done ? 'done' : ''}" onclick="toggleTask(${t.id})" title="Mark as done">
          ${t.done ? '<i class="ti ti-check"></i>' : ''}
        </div>
        <div class="task-name ${t.done ? 'done' : ''}">${escapeHtml(t.name)}</div>
        <span class="tag ${associatedTag.color}">${associatedTag.name}</span>
        <div class="task-date">${formatDate(t.date)}</div>
        <div class="task-actions">
          <button class="icon-btn" onclick="deleteTask(${t.id})" title="Delete task">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function addTask() {
  const input = document.getElementById('task-input');
  const tagSelect = document.getElementById('task-tag-select');
  const dateSelect = document.getElementById('task-date-select');
  
  const name = input.value.trim();
  if (!name) return alert('Please specify a valid task name.');

  const defaultToday = new Date().toISOString().split('T')[0];
  const newTask = {
    id: Date.now(),
    name,
    tagId: tagSelect.value,
    done: false,
    date: dateSelect.value || defaultToday,
    userId: userSessionContext.id
  };

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    if (response.ok) {
      const added = await response.json();
      tasks.push(added);
    }
  } catch (err) {
    tasks.push(newTask); // Fallback optimization drop
  }

  input.value = '';
  renderTasks();
  updateCounts();
  if(document.getElementById('page-calendar').classList.contains('active')) renderCal();
}

async function toggleTask(id) {
  const t = tasks.find(task => task.id === id);
  if (!t) return;
  t.done = !t.done;
  
  try {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t)
    });
  } catch (err) {}
  
  renderTasks();
  updateCounts();
}

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/tasks/${id}?userId=${userSessionContext.id}`, { method: 'DELETE' });
  } catch (err) {}
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  updateCounts();
  if(document.getElementById('page-calendar').classList.contains('active')) renderCal();
}

// 3. WORKSPACE DICTIONARY TRANSLATOR INJECTOR
function applyLanguage(lang) {
  userSessionContext.settings.language = lang;
  const tokenDictionary = localizationMatrix[lang] || localizationMatrix['en'];
  
  document.querySelectorAll('[data-loc]').forEach(element => {
    const translationToken = element.getAttribute('data-loc');
    if (tokenDictionary[translationToken]) {
      element.textContent = tokenDictionary[translationToken];
    }
  });
  document.getElementById('lang-select-dropdown').value = lang;
  persistUserSessionContext();
}

// 4. INTERFACE ENVIRONMENT PREFERENCES MANAGEMENT
function applyTheme(theme) {
  userSessionContext.settings.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  
  document.getElementById('theme-btn-light').classList.remove('active');
  document.getElementById('theme-btn-dark').classList.remove('active');
  document.getElementById(`theme-btn-${theme}`).classList.add('active');
  persistUserSessionContext();
}

function applyPalette(palette) {
  userSessionContext.settings.colorTheme = palette;
  document.documentElement.setAttribute('data-color-theme', palette);
  persistUserSessionContext();
}

// 5. CUSTOM TAG LOGIC HANDLERS
function populateTaskCreationTagDropdown() {
  const select = document.getElementById('task-tag-select');
  select.innerHTML = userSessionContext.tags.map(tag => 
    `<option value="${tag.id}">${tag.name}</option>`
  ).join('');
}

function renderCustomTagsControlPanel() {
  const container = document.getElementById('custom-tags-current-list');
  container.innerHTML = userSessionContext.tags.map(tag => 
    `<span class="tag ${tag.color}" style="font-size:12px; padding:4px 10px;">${tag.name}</span>`
  ).join('');
}

function createUserCustomTag() {
  const nameInput = document.getElementById('new-tag-name-input');
  const colorSelect = document.getElementById('new-tag-color-select');
  const name = nameInput.value.trim();

  if(!name) return alert("Please specify a label identifier for custom tags.");

  const newTag = {
    id: 'tag_' + Date.now(),
    name: name,
    color: colorSelect.value
  };

  userSessionContext.tags.push(newTag);
  nameInput.value = '';
  
  renderCustomTagsControlPanel();
  populateTaskCreationTagDropdown();
  renderTasks();
  persistUserSessionContext();
}

// 6. PROFILE MODIFICATION PANEL
function saveProfileChanges() {
  const newName = document.getElementById('edit-profile-name').value.trim();
  const newBio = document.getElementById('edit-profile-bio').value.trim();

  if(!newName) return alert("Profile name tracking string cannot be empty.");

  userSessionContext.profile.name = newName;
  userSessionContext.profile.bio = newBio;

  document.getElementById('user-name').textContent = newName;
  document.getElementById('profile-name-display').textContent = newName;
  document.getElementById('profile-bio-display').textContent = newBio;
  
  alert("Profile metadata metrics updated safely.");
  persistUserSessionContext();
}

// 7. NOTIFICATIONS CENTER WIDGET WITH EXPLICIT DYNAMIC PALETTE COLORING
async function fetchAlertsAndNotifications() {
  try {
    const response = await fetch(`${API_URL}/alerts?userId=${userSessionContext.id}`);
    alerts = await response.json();
  } catch (error) {
    alerts = [
      { id: 1, title: 'Task Due Soon', desc: 'Complete UI review component deadline approaching', associatedTagId: userSessionContext.tags[2].id },
      { id: 2, title: 'Document Portfolio Lifecycle', desc: 'Portfolio assembly assigned to scope', associatedTagId: userSessionContext.tags[0].id }
    ];
  }
  renderAlertNotifications();
}

function renderAlertNotifications() {
  const container = document.getElementById('alert-list');
  const unreadCount = alerts.length;
  document.getElementById('alerts-badge').textContent = unreadCount;

  container.innerHTML = alerts.map(alert => {
    const matchedTag = userSessionContext.tags.find(t => t.id === alert.associatedTagId) || { color: 'todo' };
    return `
      <div class="alert-item unread">
        <div class="alert-icon" style="background: var(--tag-${matchedTag.color}-bg); color: var(--tag-${matchedTag.color}-txt)">
          <i class="ti ti-bell"></i>
        </div>
        <div class="alert-body">
          <div class="alert-title">${alert.title}</div>
          <div class="alert-desc">${alert.desc}</div>
        </div>
      </div>
    `;
  }).join('');
}

function markAllRead() {
  alerts = [];
  document.getElementById('alert-list').innerHTML = '<div style="text-align:center; padding:2rem; color:var(--color-text-tertiary);">No new notifications caught.</div>';
  document.getElementById('alerts-badge').textContent = '0';
}

// 8. WEEKLY DATA ANALYTICS METRIC STREAM
function fetchWeeklySummaryStream() {
  const textNode = document.getElementById('weekly-summary-text');
  const totalCount = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;
  const efficiencyRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  textNode.innerHTML = `You have logged <strong>${totalCount} active tasks</strong> this tracking week. Your workspace validation resolution efficiency rate is hovering at <strong>${efficiencyRate}% complete</strong>. Keep processing system milestones!`;
}

// 9. DYNAMIC CALENDAR ARCHITECTURE INTERFACE MATRIX
function renderCal() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('cal-month-title').textContent = months[calMonth] + ' ' + calYear;

  const grid = document.getElementById('cal-grid');
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
  const totalDaysCount = new Date(calYear, calMonth + 1, 0).getDate();

  let htmlElementsBuffer = '';

  for (let i = 0; i < firstDayIndex; i++) {
    const dateNum = new Date(calYear, calMonth, -firstDayIndex + i + 1).getDate();
    htmlElementsBuffer += `<div class="cal-cell other-month">${dateNum}</div>`;
  }

  for (let d = 1; d <= totalDaysCount; d++) {
    const formattedDateString = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const targetedDayTasks = tasks.filter(t => t.date === formattedDateString);

    let dotsMarkup = '';
    if (targetedDayTasks.length > 0) {
      dotsMarkup = '<div class="cal-dots-strip">' + targetedDayTasks.map(t => {
        const tagRef = userSessionContext.tags.find(tag => tag.id === t.tagId) || { color: 'todo' };
        return `<span class="cal-dot-indicator ${tagRef.color}"></span>`;
      }).join('') + '</div>';
    }

    htmlElementsBuffer += `<div class="cal-cell">${d}${dotsMarkup}</div>`;
  }

  grid.innerHTML = htmlElementsBuffer;
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCal();
}

function renderUpcomingTasks() {
  const container = document.getElementById('upcoming-tasks');
  const upcoming = tasks.filter(t => !t.done).sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, 5);

  if(upcoming.length === 0) {
    container.innerHTML = '<div class="task-row"><div style="flex:1; text-align:center; color:var(--color-text-tertiary);">Clear horizon ahead.</div></div>';
    return;
  }
  container.innerHTML = upcoming.map(t => {
    const tagRef = userSessionContext.tags.find(tag => tag.id === t.tagId) || { name: 'Todo', color: 'todo' };
    return `
      <div class="task-row">
        <div class="task-name">${escapeHtml(t.name)}</div>
        <span class="tag ${tagRef.color}">${tagRef.name}</span>
        <div class="task-date">${formatDate(t.date)}</div>
      </div>
    `;
  }).join('');
}

// 10. SYSTEM APPLICATION NAVIGATOR CONTROLLER
function showPage(pageId, navElement) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  document.getElementById('page-' + pageId).classList.add('active');
  if(navElement) navElement.classList.add('active');

  if (pageId === 'calendar') { renderCal(); renderUpcomingTasks(); }
  if (pageId === 'profile') { fetchWeeklySummaryStream(); }
}

function updateCounts() {
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pending = total - done;

  document.getElementById('total-count').textContent = total;
  document.getElementById('done-count').textContent = done;
  document.getElementById('done-percent').textContent = total > 0 ? Math.round((done / total) * 100) + '% done' : '0% done';
  document.getElementById('progress-count').textContent = pending;
  document.getElementById('tasks-badge').textContent = pending;

  document.getElementById('p-total').textContent = total;
  document.getElementById('p-done').textContent = done;
  document.getElementById('p-rate').textContent = total > 0 ? Math.round((done / total) * 100) + '%' : '0%';
}

function setFilter(f, el) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderTasks();
}

function handleKey(e) { if (e.key === 'Enter') addTask(); }
function formatDate(dStr) { return new Date(dStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

// Automatically bypass the OTP screen on page load
window.addEventListener('DOMContentLoaded', () => {
    mockFallbackAuthentication('developer@local.host');
});