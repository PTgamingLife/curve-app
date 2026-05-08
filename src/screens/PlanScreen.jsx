import { useState } from 'react';

const goals = [
  { label: '降低體脂', target: '目標：15%', current: 18.2, targetVal: 15, unit: '%', color: '#e67e22' },
  { label: '增加肌肉', target: '目標：48kg', current: 45.1, targetVal: 48, unit: 'kg', color: '#2196f3' },
  { label: '控制體重', target: '目標：65kg', current: 68.5, targetVal: 65, unit: 'kg', color: '#2d7a3a' },
];

const mealPlan = [
  { time: '早餐', items: ['燕麥片 + 牛奶', '水煮蛋 x2', 'Nutrilite 蛋白粉'], icon: '🌅', kcal: 480 },
  { time: '午餐', items: ['糙米飯', '雞胸肉', '蔬菜沙拉'], icon: '☀️', kcal: 620 },
  { time: '晚餐', items: ['地瓜', '鮭魚', '花椰菜'], icon: '🌙', kcal: 520 },
  { time: '點心', items: ['Nutrilite 纖維飲', '堅果一把'], icon: '🍎', kcal: 180 },
];

const exercises = [
  { day: '週一', type: '有氧運動', detail: '慢跑 30 分鐘', done: true },
  { day: '週二', type: '重量訓練', detail: '胸背 45 分鐘', done: true },
  { day: '週三', type: '休息恢復', detail: '伸展 15 分鐘', done: false },
  { day: '週四', type: '有氧運動', detail: '騎腳踏車 40 分鐘', done: false },
  { day: '週五', type: '重量訓練', detail: '腿部 45 分鐘', done: false },
];

export default function PlanScreen({ onNav }) {
  const [section, setSection] = useState('目標');

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
      <div style={{ padding: '4px 20px 0', background: 'linear-gradient(180deg,#e8f5e9,#f4f8f4)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1a3a22', margin: '8px 0 14px' }}>健康計劃</h2>

        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
          {['目標', '飲食', '運動'].map(s => (
            <button key={s} onClick={() => setSection(s)}
              style={{ padding: '8px 22px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, flexShrink: 0, background: section === s ? '#2d7a3a' : '#e8f0e8', color: section === s ? '#fff' : '#555', transition: 'all 0.2s' }}
            >{s}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 16px' }}>

        {/* 目標 */}
        {section === '目標' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', border: '1.5px solid #c8e6c9' }}>
              <div style={{ fontWeight: 700, color: '#2d7a3a', marginBottom: 4, fontSize: 15 }}>🎯 本月計劃目標</div>
              <div style={{ fontSize: 13, color: '#555' }}>持續 30 天，達成體脂 15% · 肌肉 48kg</div>
            </div>

            {goals.map((g, i) => {
              const range = Math.abs(g.targetVal - (g.unit === '%' ? 30 : g.unit === 'kg' && g.label === '增加肌肉' ? 40 : 80));
              const progress = Math.min(100, Math.max(0,
                g.targetVal < g.current
                  ? Math.round(((g.current - g.targetVal) / (g.current - g.targetVal + 3)) * 100 * (1 - (g.current - g.targetVal) / (g.current - g.targetVal + 3)))
                  : Math.round((g.current / g.targetVal) * 95)
              ));
              const pct = g.targetVal < g.current
                ? Math.round(100 - ((g.current - g.targetVal) / (g.unit === 'kg' ? 5 : 5)) * 100)
                : Math.round((g.current / g.targetVal) * 100);

              return (
                <div key={i} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>{g.label}</div>
                      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{g.target}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: g.color }}>{g.current}{g.unit}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>目標 {g.targetVal}{g.unit}</div>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: 10 }}>
                    <div className="progress-fill" style={{ width: `${Math.min(95, Math.max(20, pct))}%`, background: `linear-gradient(90deg, ${g.color}88, ${g.color})` }}/>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 5, textAlign: 'right' }}>
                    {g.targetVal < g.current ? `還差 ${(g.current - g.targetVal).toFixed(1)}${g.unit}` : `距目標 ${(g.targetVal - g.current).toFixed(1)}${g.unit}`}
                  </div>
                </div>
              );
            })}

            <button className="btn-primary">編輯目標</button>
          </div>
        )}

        {/* 飲食 */}
        {section === '飲食' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: '#555' }}>今日總熱量</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#2d7a3a' }}>1,800 kcal</span>
            </div>
            <div className="progress-bar" style={{ height: 10, marginBottom: 4 }}>
              <div className="progress-fill" style={{ width: '72%' }}/>
            </div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>已攝取 1,300 / 目標 1,800 kcal</div>

            {mealPlan.map((meal, i) => (
              <div key={i} className="card" style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 22 }}>{meal.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>{meal.time}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#888' }}>{meal.kcal} kcal</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {meal.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 13, color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4caf50', flexShrink: 0 }}/>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button className="btn-outline">編輯飲食計劃</button>
          </div>
        )}

        {/* 運動 */}
        {section === '運動' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg,#e3f2fd,#e8f5fe)', border: '1.5px solid #bbdefb', padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: '#1565c0', marginBottom: 4 }}>本週完成</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#1976d2' }}>2</span>
                <span style={{ fontSize: 14, color: '#555' }}>/ 5 天</span>
              </div>
              <div className="progress-bar" style={{ marginTop: 8, height: 8 }}>
                <div className="progress-fill" style={{ width: '40%', background: 'linear-gradient(90deg,#42a5f5,#1976d2)' }}/>
              </div>
            </div>

            {exercises.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 14, padding: '14px 16px', border: ex.done ? '1.5px solid #c8e6c9' : '1px solid #eee', opacity: ex.done ? 1 : 0.75 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: ex.done ? '#e8f5e9' : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: ex.done ? '2px solid #4caf50' : '2px solid #ddd' }}>
                  {ex.done ? <span style={{ fontSize: 18, color: '#4caf50' }}>✓</span> : <span style={{ fontSize: 13, fontWeight: 700, color: '#bbb' }}>{i + 1}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: ex.done ? '#222' : '#777' }}>{ex.day} · {ex.type}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{ex.detail}</div>
                </div>
                {!ex.done && (
                  <button style={{ background: '#e8f5e9', border: '1.5px solid #a5d6a7', borderRadius: 12, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#2d7a3a', cursor: 'pointer', fontFamily: 'inherit' }}>開始</button>
                )}
              </div>
            ))}

            <button className="btn-primary">編輯運動計劃</button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {[
          { id: 'home', label: '首頁', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
          { id: 'records', label: '紀錄', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
          { id: 'plan', label: '計劃', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
          { id: 'profile', label: '個人', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
        ].map(item => (
          <button key={item.id} className={`nav-item ${item.id === 'plan' ? 'active' : ''}`} onClick={() => onNav(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
