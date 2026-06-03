# 番茄钟架构设计

## 整体架构
- 前端: React + Vite (http://localhost:5173)
- 后端: Node.js + Express (http://localhost:3001)
- 通信: REST API

## 组件设计

### 前端组件
- `Timer` - 核心计时器（专注/休息状态切换）
- `TaskList` - 任务列表（增删改）
- `Stats` - 今日统计

### 后端模块
- `routes/tasks.js` - 任务 CRUD
- `routes/stats.js` - 统计接口
- `data/` - JSON 文件存储
