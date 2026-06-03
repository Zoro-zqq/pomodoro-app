# API 规范

## 任务管理

### GET /api/tasks
返回今日任务列表
```json
[{ "id": "uuid", "text": "写代码", "completed": false, "createdAt": "ISO8601" }]
```

### POST /api/tasks
创建任务
```json
{ "text": "写代码" }
→ { "id": "uuid", "text": "写代码", "completed": false }
```

### PATCH /api/tasks/:id
更新任务状态
```json
{ "completed": true }
→ { "id": "uuid", "text": "写代码", "completed": true }
```

### DELETE /api/tasks/:id
删除任务 → 204

## 统计

### GET /api/stats
```json
{ "totalPomodoros": 3, "totalFocusMinutes": 75, "date": "2026-06-03" }
```

### POST /api/stats/pomodoro
记录一个番茄
```json
{ "duration": 25 }
→ { "totalPomodoros": 4, "totalFocusMinutes": 100 }
```
