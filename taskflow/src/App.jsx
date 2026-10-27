import { useState } from 'react';
import './App.css';

function App() {
const [tasks, setTasks] = useState([
{ id: 1, title: 'Learn React Basics', completed: true },
{ id: 2, title: 'Build TaskFlow Dashboard', completed: false },
{ id: 3, title: 'Learn AWS Lambda', completed: false },
]);

const [title, setTitle] = useState('');
const [filter, setFilter] = useState('All');

const addTask = (e) => {
e.preventDefault();

if (!title.trim()) return;

setTasks([
  ...tasks,
  {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  },
]);

setTitle('');

};

const toggleTask = (id) => {
setTasks(
tasks.map((task) =>
task.id === id
? { ...task, completed: !task.completed }
: task
)
);
};

const deleteTask = (id) => {
setTasks(tasks.filter((task) => task.id !== id));
};

const filteredTasks = tasks.filter((task) => {
if (filter === 'Completed') return task.completed;
if (filter === 'Pending') return !task.completed;
return true;
});

const completedCount = tasks.filter(
(task) => task.completed
).length;

return (
<div className="app">
<aside className="sidebar">
<h2 className="brand">✦ TaskFlow</h2>

    <p className="menu-label">WORKSPACE</p>

    <div className="menu-item active">▦ Dashboard</div>
    <div className="menu-item">✓ My Tasks</div>
    <div className="menu-item">⚙ Settings</div>

    <div className="sidebar-bottom">
      <div className="avatar">S</div>
      <div>
        <strong>Student</strong>
        <p>Personal Workspace</p>
      </div>
    </div>
  </aside>

  <main className="main">
    <header className="topbar">
      <span>Workspace / Dashboard</span>
      <span className="date">Your productivity space ✨</span>
    </header>

    <section className="welcome">
      <div>
        <p className="eyebrow">YOUR WORKSPACE</p>
        <h1>Good day! 👋</h1>
        <p>Stay organized and get things done.</p>
      </div>

      <div className="welcome-icon">✦</div>
    </section>

    <section className="stats">
      <div className="stat-card">
        <span className="stat-icon purple">▦</span>
        <p>Total Tasks</p>
        <h2>{tasks.length}</h2>
        <small>All your tasks</small>
      </div>

      <div className="stat-card">
        <span className="stat-icon green">✓</span>
        <p>Completed</p>
        <h2>{completedCount}</h2>
        <small>Tasks finished</small>
      </div>

      <div className="stat-card">
        <span className="stat-icon orange">◷</span>
        <p>Pending</p>
        <h2>{tasks.length - completedCount}</h2>
        <small>Tasks remaining</small>
      </div>
    </section>

    <section className="task-section">
      <div className="section-heading">
        <div>
          <h2>My Tasks</h2>
          <p>Manage your daily activities</p>
        </div>
      </div>

      <form className="add-task" onSubmit={addTask}>
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">+ Add Task</button>
      </form>

      <div className="filters">
        {['All', 'Pending', 'Completed'].map((item) => (
          <button
            key={item}
            className={filter === item ? 'filter active-filter' : 'filter'}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div className="task-row" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <span className={task.completed ? 'task-done' : ''}>
              {task.title}
            </span>

            <span className={task.completed ? 'status done' : 'status pending'}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>

            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              ✕
            </button>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="empty-state">No tasks found. Add a new task!</p>
        )}
      </div>
    </section>

    <footer>TaskFlow · Make every day productive.</footer>
  </main>
</div>

);
}

export default App;