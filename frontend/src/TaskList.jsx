import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => { loadTasks(); }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;
    await createTask(input.trim());
    setInput('');
    loadTasks();
  }

  async function handleToggle(task) {
    await updateTask(task.id, { completed: !task.completed });
    loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div>
      <h3 style={{ margin: '0 0 12px' }}>今日任务</h3>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="添加任务..."
          style={{
            flex: 1, padding: '8px 12px', borderRadius: 6,
            border: '1px solid #ddd', fontSize: 14
          }}
        />
        <button type="submit" style={{
          padding: '8px 16px', borderRadius: 6, border: 'none',
          background: '#e74c3c', color: '#fff', cursor: 'pointer'
        }}>
          添加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center' }}>暂无任务</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 0', borderBottom: '1px solid #f0f0f0'
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <span style={{
                flex: 1,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#999' : '#333'
              }}>
                {task.text}
              </span>
              <button onClick={() => handleDelete(task.id)} style={{
                border: 'none', background: 'none', color: '#e74c3c',
                cursor: 'pointer', fontSize: 16, padding: '2px 6px'
              }}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
