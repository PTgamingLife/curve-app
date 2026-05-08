import { useState } from 'react';

const stats = [
  { label: '量測次數', value: '24', unit: '次' },
  { label: '推薦好友', value: '2', unit: '人' },
  { label: '挑戰積分', value: '1,800', unit: '分' },
];

const menuItems = [
  { icon: '📊', label: '我的量測紀錄', screen: 'records' },
  { icon: '🎯', label: '健康目標設定', screen: 'plan' },
  { icon: '👥', label: '推薦系統', screen: 'referral' },
  { icon: '🏆', label: '知識挑戰排名', screen: 'ranking' },
  { icon: '🔔', label: '推播通知設定', screen: null },
  { icon: '🔒', label: '隱私與安全', screen: null },
  { icon: '📞', label: '聯絡客服', screen: null },
];

export default function ProfileScreen({ onNav, onLogout }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="screen fade-in" style={{ background: '#f4f8f4' }}>
      {/* Status bar */}
      <div className="status-bar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#333"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#333"/></svg>
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Profile hero */}
        <div style={{ background: 'linear-gradient(160deg, #2d7a3a 0%, #4caf50 100%)', padding: '20px 20px 32px', position: 'relative', overflow: 'hidden' }}>
          {/* Deco circles */}
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }}/>
          <div style={{ position: 'absolute', right: 20, bottom: -40, width: 100, height: 100, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }}/>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#c8e6c9', border: '3px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 }}>
              👩
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>黎瑞 (Hilbert)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ background: '#f5c518', color: '#5d4037', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>⭐ 黃金會員</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>09xx-xxx-xxx</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: '12px 0', backdropFilter: 'blur(4px)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership card */}
        <div style={{ margin: '-16px 20px 16px', background: 'linear-gradient(135deg,#fff8e1,#fffde7)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '1.5px solid #ffe082' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>Nutrilite 推薦碼</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#a07800', letterSpacing: 1 }}>NUTRI-FRIEND-777</div>
            </div>
            <button style={{ background: '#f5c518', border: 'none', borderRadius: 12, padding: '7px 14px', fontSize: 12, fontWeight: 700, color: '#5d4037', cursor: 'pointer', fontFamily: 'inherit' }}
              onClick={() => onNav('referral')}>分享</button>
          </div>
        </div>

        {/* Menu list */}
        <div style={{ margin: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {menuItems.map((item, i) => (
            <button key={i}
              onClick={() => item.screen && onNav(item.screen)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #f0f0f0', cursor: item.screen ? 'pointer' : 'default', textAlign: 'left', fontFamily: 'inherit', width: '100%' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#222' }}>{item.label}</span>
              {item.label === '推播通知設定' ? (
                <div onClick={e => { e.stopPropagation(); setNotifications(n => !n); }}
                  style={{ width: 44, height: 24, borderRadius: 12, background: notifications ? '#4caf50' : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 2, left: notifications ? 22 : 2, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
                </div>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              )}
            </button>
          ))}
        </div>

        {/* App version */}
        <div style={{ textAlign: 'center', padding: '16px', color: '#bbb', fontSize: 12 }}>
          曲線管理 v1.0.0 · Powered by Nutrilite
        </div>

        {/* Logout */}
        <div style={{ padding: '0 20px 24px' }}>
          <button onClick={onLogout}
            style={{ width: '100%', padding: '14px', borderRadius: 30, border: '1.5px solid #ffcdd2', background: '#fff', color: '#e53935', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            登出
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {[
          { id: 'home', label: '首頁', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
          { id: 'records', label: '紀錄', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
          { id: 'plan', label: '計劃', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
          { id: 'profile', label: '個人', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
        ].map(item => (
          <button key={item.id} className={`nav-item ${item.id === 'profile' ? 'active' : ''}`} onClick={() => onNav(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
