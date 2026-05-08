import { useState, useEffect } from 'react';
import { fetchRanking } from '../lib/measurements';

const AVATARS = ['👩','👨','🧑','👦','👧','🧔','👱','🧕'];

const others = [
  { rank: 4, name: 'David Liu', score: 11800, trend: '↑', up: true, photo: '👦' },
  { rank: 4, name: 'Emily Zhang', score: 11800, trend: '↑', up: true, photo: '👧' },
  { rank: 5, name: 'Frank Lin', score: 11800, trend: '↑', up: false, photo: '🧔' },
  { rank: 6, name: '你\nWilliam Johnson', score: 11800, trend: '↑', up: true, photo: '🧑', isMe: true },
  { rank: 7, name: 'Emily Lun', score: 11800, trend: '↑', up: true, photo: '👩' },
];

export default function RankingScreen({ onNav, userId }) {
  const [tab, setTab] = useState('本月總分榜');
  const [liveRanking, setLiveRanking] = useState([]);

  useEffect(() => {
    fetchRanking().then(data => {
      if (data?.length) setLiveRanking(data);
    }).catch(() => {});
  }, []);

  const rankData = liveRanking.length >= 3
    ? liveRanking.map((r, i) => ({ rank: i + 1, name: r.name || r.phone || '用戶', score: r.total_score || 0, photo: AVATARS[i % AVATARS.length], isMe: r.id === userId }))
    : null;

  const medalColors = ['#f5c518', '#b0bec5', '#cd7f32'];
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumPositions = [1, 0, 2];

  return (
    <div className="screen fade-in" style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #f9f9f9 200px)' }}>
      {/* Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#333"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#333"/></svg>
        </span>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', padding: '8px 20px', gap: 10 }}>
        {['本月總分榜', '上月進步榜'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: '11px', borderRadius: 24, border: t === tab ? 'none' : '2px solid #c8d8c8', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, background: t === tab ? 'linear-gradient(135deg, #2d7a3a, #4caf50)' : '#fff', color: t === tab ? '#fff' : '#555', transition: 'all 0.2s' }}
          >{t}</button>
        ))}
      </div>

      {/* Refer button */}
      <div style={{ padding: '0 20px 8px', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ border: '2px solid #2d7a3a', borderRadius: 20, padding: '7px 18px', background: '#fff', color: '#2d7a3a', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          推薦好友
        </button>
      </div>

      {/* Podium */}
      <div style={{ background: 'linear-gradient(180deg, #f5ecd0, #e8dfc8)', margin: '0 20px', borderRadius: 20, padding: '20px 16px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Sparkles */}
        <div style={{ position: 'absolute', top: 8, left: 20, fontSize: 16 }}>✨</div>
        <div style={{ position: 'absolute', top: 16, right: 30, fontSize: 12 }}>✦</div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 0 }}>
          {podiumOrder.map((person, i) => {
            const rankIdx = podiumPositions[i];
            const heights = [90, 110, 80];
            const medalEmojis = ['🥈', '🥇', '🥉'];

            return (
              <div key={person.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                {/* Medal */}
                <div style={{ fontSize: 24, marginBottom: 4 }}>{medalEmojis[i]}</div>
                {/* Avatar */}
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f0f0f0', border: `3px solid ${medalColors[rankIdx]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 4 }}>
                  {person.photo}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#333', textAlign: 'center', marginBottom: 2 }}>{person.name}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#333' }}>{person.score.toLocaleString()} 分</div>
                <div style={{ fontSize: 12, color: '#43a047', marginBottom: 6 }}>↑ {person.trend}</div>
                {/* Podium block */}
                <div style={{ width: '90%', height: heights[i], background: i === 1 ? 'linear-gradient(180deg, #f5c518, #e5a800)' : i === 0 ? 'linear-gradient(180deg, #c0c0c0, #a0a0a0)' : 'linear-gradient(180deg, #cd7f32, #b06820)', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.8)' }}>{rankIdx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px', marginTop: 12 }}>
        {others.map((person, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
            background: person.isMe ? '#e8f5e9' : '#fff',
            borderRadius: 12, marginBottom: 6,
            border: person.isMe ? '1.5px solid #a5d6a7' : '1px solid #f0f0f0',
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#888', width: 24, textAlign: 'center' }}>#{person.rank}</span>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{person.photo}</div>
            <div style={{ flex: 1 }}>
              {person.name.split('\n').map((line, li) => (
                <div key={li} style={{ fontSize: li === 0 ? 14 : 12, fontWeight: li === 0 ? 700 : 400, color: li === 0 ? '#222' : '#888' }}>{line}</div>
              ))}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{person.score.toLocaleString()} 分...</div>
              <div style={{ fontSize: 13, color: person.up ? '#43a047' : '#ef9a9a' }}>{person.up ? '↗' : '↘'}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom banner */}
      <div style={{ background: '#fff8e1', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #ffe082' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#5d4037' }}>推薦三人可獲得小禮物</span>
        <span style={{ fontSize: 28 }}>🎁</span>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {[
          { id: 'home', label: 'Dashboard', icon: '⊞' },
          { id: 'quiz', label: 'Challenge', icon: '🏅' },
          { id: 'ranking', label: 'Ranking', icon: '📊' },
          { id: 'profile', label: 'Account', icon: '👤' },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
        ].map(item => (
          <button key={item.id} className={`nav-item ${item.id === 'ranking' ? 'active' : ''}`} onClick={() => onNav(item.id)}
            style={{ fontSize: 20 }}>
            <span>{item.icon}</span>
            <span style={{ fontSize: 10 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
