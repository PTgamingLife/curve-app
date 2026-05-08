const referrals = [
  { name: '李華', date: '2023.10.25', status: '已完成首次測量', statusColor: '#e8a020', statusBg: '#fff3e0' },
  { name: '張偉', date: '2023.10.20', status: '已註冊', statusColor: '#2d7a3a', statusBg: '#e8f5e9' },
];

const shareApps = [
  { name: 'WeChat', color: '#07c160', icon: '💬' },
  { name: 'LINE', color: '#00b900', icon: '🟢' },
  { name: 'Nutri', color: '#2d7a3a', icon: '🌿' },
  { name: 'Weibo', color: '#e6162d', icon: '🔴' },
  { name: '分享', color: '#888', icon: '↗️' },
];

export default function ReferralScreen({ onBack, onNav }) {
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

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 20px 16px', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#222' }}>曲線管理 推薦系統</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
        {/* Referral code card */}
        <div style={{ background: 'linear-gradient(135deg, #2d7a3a 0%, #4caf50 60%, #8bc34a 100%)', borderRadius: 20, padding: '24px 20px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          {/* Background deco */}
          <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.15 }}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="white">
              <circle cx="50" cy="50" r="45"/>
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#a8e6b0', fontSize: 13, fontWeight: 700 }}>NUTRILITE®</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#f5e6b0', letterSpacing: 1, lineHeight: 1.1 }}>
                NUTRI-<br/>FRIEND-777
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 8 }}>我的專屬推薦碼</div>
            </div>
            {/* Trophy icon */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" fill="rgba(255,255,255,0.15)"/>
                <text x="40" y="52" textAnchor="middle" fontSize="36" fill="#f5c518">🔥</text>
              </svg>
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, background: '#f5c518', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🌿</div>
            </div>
          </div>
        </div>

        {/* My referrals */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-title">我的推薦紀錄</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {referrals.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < referrals.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? '#f8d7b0' : '#c8e6c9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {i === 0 ? '👩' : '👦'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>登名日期：{r.date}</div>
                </div>
                <span style={{ background: r.statusBg, color: r.statusColor, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 14, whiteSpace: 'nowrap' }}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">推薦進度</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#2d7a3a' }}>2/3</span> 完成推薦，再邀請 1 人即可獲得小禮物
              </div>
              <div className="progress-bar" style={{ height: 10 }}>
                <div className="progress-fill" style={{ width: '66%' }}/>
              </div>
            </div>
            <div style={{ fontSize: 36 }}>🎁</div>
          </div>
        </div>

        {/* Share icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          {shareApps.map(app => (
            <button key={app.name} style={{ width: 48, height: 48, borderRadius: '50%', background: '#f0f0f0', border: '1.5px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, cursor: 'pointer' }}>
              {app.icon}
            </button>
          ))}
        </div>

        <button className="btn-primary" style={{ marginBottom: 12, background: 'linear-gradient(135deg, #3d8b40, #1e6b2e)' }}>
          分享推薦碼
        </button>

        <button className="btn-outline">
          輸入推薦人電話
        </button>
      </div>
    </div>
  );
}
