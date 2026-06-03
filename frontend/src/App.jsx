import Timer from './Timer';
import TaskList from './TaskList';
import Stats from './Stats';
import { recordPomodoro } from './api';
import './App.css';

export default function App() {
  async function handlePomodoroComplete(duration) {
    await recordPomodoro(duration);
  }

  return (
    <div className="app">
      <header>
        <h1>🍅 番茄钟</h1>
        <p className="subtitle">专注每一刻</p>
      </header>
      <main>
        <Timer onComplete={handlePomodoroComplete} />
        <TaskList />
        <Stats />
      </main>
    </div>
  );
}
