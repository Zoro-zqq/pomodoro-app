import { useState, useEffect } from 'react';
import { getStats } from './api';

export default function Stats() {
  const [stats, setStats] = useState({ totalPomodoros: 0, totalFocusMinutes: 0 });

  useEffect(() => { loadStats(); }, []);

  async function loadStats() {
    const data = await getStats();
    setStats(data);
  }

  return (
    <div style={{
      background: '#f8f9fa', borderRadius: 12, padding: 16, marginTop: 20
    }}>
      <h3 style={{ margin: '0 0 12px', color: '#333' }}>今日统计</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#e74c3c' }}>
            {stats.totalPomodoros}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>番茄完成</div>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#2ecc71' }}>
            {stats.totalFocusMinutes}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>专注分钟</div>
        </div>
      </div>
    </div>
  );
}
