const API = 'http://localhost:3001/api';

export async function getTasks() {
  const res = await fetch(`${API}/tasks`);
  return res.json();
}

export async function createTask(text) {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
}

export async function getStats() {
  const res = await fetch(`${API}/stats`);
  return res.json();
}

export async function recordPomodoro(duration = 25, taskId = null) {
  const res = await fetch(`${API}/stats/pomodoro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ duration, taskId })
  });
  return res.json();
}
