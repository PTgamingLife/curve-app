export default function HomeScreen({ onNav }) {
  const bmi = 22.5;
  const metrics = [
    { label: '體重', value: '68.5', unit: 'kg', color: '#2d7a3a', trend: '+0.5' },
    { label: '體脂', value: '18.2', unit: '%', color: '#e67e22', trend: '-0.3' },
    { label: '肌肉', value: '45.1', unit: 'kg', color: '#2980b9', trend: '+0.5' },
  ];

  return (
    <div className="screen fade-in" style={{ background: 'linear-gradient(180deg, #e8f5e9 0%, #f9fdf9 120px)' }}>
      {/* Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#333"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/></svg>
          <svg width="16" height="12" viewBox="0 0 24 12" fill="#333"><path d="M12 2.5C8.3 2.5 5.2 3.8 3.2 5.7L1 3.5C3.6 1.3 7.1 0 12 0s8.4 1.3 11 3.5l-2.2 2.2C18.8 3.8 15.7 2.5 12 2.5zm0 7.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#333"/></svg>
        </span>
      </div>

      {/* Header */}
      <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#c8e6c9,#66bb6a)', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="#fff"><circle cx="15" cy="11" r="5"/><path d="M5 26c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#fff"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>黎瑞 (Hilbert)</div>
            <div style={{ display: 'inline-block', background: '#f5e6b0', color: '#a07800', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>黃金會員</div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: '#e53935', borderRadius: '50%' }}/>
        </div>
      </div>

      {/* Search */}
      <div style={{ margin: '0 20px 16px', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input placeholder="搜索" style={{ border: 'none', outline: 'none', fontSize: 15, color: '#aaa', background: 'transparent', width: '100%', fontFamily: 'inherit' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Today summary */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #2d7a3a, #4caf50)', color: '#fff', padding: '20px' }}>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>今日體況 · 2023.10.26</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8 }}>
            {metrics.map(m => (
              <div key={m.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{m.value}<span style={{ fontSize: 13, fontWeight: 400 }}>{m.unit}</span></div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{m.label}</div>
                <div style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '1px 6px', marginTop: 3 }}>
                  {m.trend.startsWith('+') ? '↑' : '↓'} {m.trend.replace(/[+-]/, '')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BMI Card */}
        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: '#333' }}>BMI 指數</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#2d7a3a' }}>{bmi}</span>
          </div>
          <div style={{ position: 'relative', height: 10, background: 'linear-gradient(90deg, #64b5f6, #81c784, #ffb74d, #e57373)', borderRadius: 10 }}>
            <div style={{ position: 'absolute', left: `${((bmi-15)/(40-15))*100}%`, top: -4, width: 18, height: 18, background: '#fff', border: '3px solid #2d7a3a', borderRadius: '50%', transform: 'translateX(-50%)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999', marginTop: 5 }}>
            <span>過輕</span><span>正常</span><span>過重</span><span>肥胖</span>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <div className="section-title">快速功能</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📊', label: '記錄體況', screen: 'records' },
              { icon: '🎯', label: '健康計劃', screen: 'plan' },
              { icon: '🏆', label: '知識挑戰', screen: 'quiz' },
              { icon: '👥', label: '推薦好友', screen: 'referral' },
            ].map(item => (
              <button key={item.label} onClick={() => onNav(item.screen)}
                style={{ background: '#f8fdf8', border: '1.5px solid #d4edda', borderRadius: 14, padding: '18px 12px', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#2d7a3a' }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Invite progress */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #fffde7, #fff8e1)', border: '1.5px solid #ffe082' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: '#333' }}>邀請好友</span>
            <button onClick={() => onNav('referral')} style={{ fontSize: 12, color: '#2d7a3a', background: 'transparent', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>立即邀請 →</button>
          </div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>已推薦好友數量：2/3 &nbsp; <span style={{ color: '#2d7a3a', fontWeight: 700 }}>66%</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '66%' }}/></div>
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
          <button key={item.id} className={`nav-item ${item.id === 'home' ? 'active' : ''}`} onClick={() => onNav(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
