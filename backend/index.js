const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_DIR = path.join(__dirname, 'data');

app.use(cors());
app.use(express.json());

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// 读取 JSON 文件
function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// 写入 JSON 文件
function writeJSON(filename, data) {
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

// 获取今天的日期字符串
function today() {
  return new Date().toISOString().split('T')[0];
}

// ======== 任务 API ========

app.get('/api/tasks', (req, res) => {
  const tasks = readJSON('tasks.json').filter(t => t.date === today());
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = readJSON('tasks.json');
  const task = {
    id: uuidv4(),
    text: req.body.text,
    completed: false,
    date: today(),
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  writeJSON('tasks.json', tasks);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const tasks = readJSON('tasks.json');
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: '任务不存在' });
  tasks[idx].completed = req.body.completed ?? tasks[idx].completed;
  writeJSON('tasks.json', tasks);
  res.json(tasks[idx]);
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readJSON('tasks.json');
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: '任务不存在' });
  tasks.splice(idx, 1);
  writeJSON('tasks.json', tasks);
  res.status(204).send();
});

// ======== 统计 API ========

app.get('/api/stats', (req, res) => {
  const sessions = readJSON('sessions.json').filter(s => s.date === today());
  const totalPomodoros = sessions.length;
  const totalFocusMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
  res.json({ totalPomodoros, totalFocusMinutes, date: today() });
});

app.post('/api/stats/pomodoro', (req, res) => {
  const sessions = readJSON('sessions.json');
  const session = {
    id: uuidv4(),
    taskId: req.body.taskId || null,
    duration: req.body.duration || 25,
    date: today(),
    completedAt: new Date().toISOString()
  };
  sessions.push(session);
  writeJSON('sessions.json', sessions);

  const todaySessions = sessions.filter(s => s.date === today());
  res.status(201).json({
    totalPomodoros: todaySessions.length,
    totalFocusMinutes: todaySessions.reduce((sum, s) => sum + s.duration, 0)
  });
});

app.listen(PORT, () => {
  console.log(`🍅 番茄钟后端运行在 http://localhost:${PORT}`);
});
