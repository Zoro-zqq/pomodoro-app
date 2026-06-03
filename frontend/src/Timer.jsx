import { useState, useEffect, useRef } from 'react';

const POMODORO = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

export default function Timer({ onComplete }) {
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(POMODORO);
  const [running, setRunning] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const intervalRef = useRef(null);

  const modes = {
    pomodoro: { label: '专注', seconds: POMODORO, color: '#e74c3c' },
    shortBreak: { label: '短休息', seconds: SHORT_BREAK, color: '#2ecc71' },
    longBreak: { label: '长休息', seconds: LONG_BREAK, color: '#3498db' },
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            handleTimerEnd();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleTimerEnd() {
    if (mode === 'pomodoro') {
      const newCount = pomodoros + 1;
      setPomodoros(newCount);
      onComplete?.(25);
      if (newCount % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('pomodoro');
    }
  }

  function switchMode(newMode) {
    setMode(newMode);
    setTimeLeft(modes[newMode].seconds);
    setRunning(false);
  }

  function toggle() {
    if (timeLeft === 0) {
      setTimeLeft(modes[mode].seconds);
    }
    setRunning(!running);
  }

  function reset() {
    setRunning(false);
    setTimeLeft(modes[mode].seconds);
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const { label, color } = modes[mode];

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
        {Object.entries(modes).map(([key, m]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              background: mode === key ? m.color : '#eee',
              color: mode === key ? '#fff' : '#333',
              fontWeight: mode === key ? 'bold' : 'normal',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div style={{
        fontSize: 96,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color,
        margin: '20px 0',
      }}>
        {minutes}:{seconds}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={toggle} style={{
          padding: '12px 40px',
          fontSize: 18,
          borderRadius: 8,
          border: 'none',
          background: color,
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}>
          {running ? '暂停' : timeLeft === 0 ? '重新开始' : '开始'}
        </button>
        <button onClick={reset} style={{
          padding: '12px 24px',
          fontSize: 18,
          borderRadius: 8,
          border: '1px solid #ddd',
          background: '#fff',
          cursor: 'pointer',
        }}>
          重置
        </button>
      </div>

      <p style={{ marginTop: 12, color: '#666' }}>
        今日番茄: {pomodoros} 个
      </p>
    </div>
  );
}
