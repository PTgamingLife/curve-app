import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddRecordModal from '../components/AddRecordModal';
import { fetchMeasurements, addMeasurement } from '../lib/measurements';
import { useToast } from '../components/Toast';

function toDisplayRecord(r, prev) {
  const fmt = (n) => (n >= 0 ? '+' : '') + n.toFixed(1);
  return {
    date: r.measured_at?.replace(/-/g, '.') || '',
    weight: parseFloat(r.weight),
    wDelta: prev ? fmt(parseFloat(r.weight) - parseFloat(prev.weight)) : '—',
    fat: parseFloat(r.body_fat),
    fDelta: prev ? fmt(parseFloat(r.body_fat) - parseFloat(prev.body_fat)) : '—',
    muscle: parseFloat(r.muscle_mass),
    mDelta: prev ? fmt(parseFloat(r.muscle_mass) - parseFloat(prev.muscle_mass)) : '—',
    highlight: false,
  };
}

export default function RecordsScreen({ onNav, userId }) {
  const [tab, setTab] = useState('月');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const showToast = useToast();

  useEffect(() => { if (userId) load(); }, [userId]);

  const load = async () => {
    setLoading(true);
    try {
      const raw = await fetchMeasurements(userId);
      setRecords(raw.map((r, i) => toDisplayRecord(r, raw[i + 1] || null)));
    } catch { showToast('載入紀錄失敗', 'error'); }
    finally { setLoading(false); }
  };

  const handleSave = async ({ weight, fat, muscle, note }) => {
    try {
      await addMeasurement(userId, { weight, body_fat: fat, muscle_mass: muscle, note });
      showToast('紀錄儲存成功！✓', 'success');
      await load();
    } catch { showToast('儲存失敗，請稍後再試', 'error'); }
  };

  return (
    <div className="screen fade-in" style={{ background: '#f4f8f4' }}>
      {showModal && <AddRecordModal onClose={() => setShowModal(false)} onSave={handleSave} />}
      {/* Status Bar */}
      <div className="status-bar" style={{ background: 'linear-gradient(180deg,#e8f5e9,transparent)' }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#333"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#333"/></svg>
        </span>
      </div>

      {/* Profile Header */}
      <div style={{ padding: '4px 20px 16px', background: 'linear-gradient(180deg,#e8f5e9,#f4f8f4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#c8e6c9', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="#2d7a3a"><circle cx="15" cy="11" r="5"/><path d="M5 26c0-5.5 4.5-10 10-10s10 4.5 10 10"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>黎瑞 (Hilbert)</div>
              <span style={{ background: '#f5e6b0', color: '#a07800', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>黃金會員</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#888' }}>Nutrilite 黃金會員</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c518"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span style={{ fontSize: 12, color: '#a07800', fontWeight: 700 }}>黃金會員</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="搜索" style={{ border: 'none', outline: 'none', fontSize: 15, color: '#aaa', background: 'transparent', width: '100%', fontFamily: 'inherit' }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1a3a22', margin: '12px 0 14px' }}>曲線管理 - 個人紀錄</h2>

        {/* Tab */}
        <div style={{ display: 'flex', background: '#e8f0e8', borderRadius: 30, padding: 3, marginBottom: 16 }}>
          {['週', '月', '年'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: '8px', borderRadius: 26, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: tab === t ? 700 : 400, background: tab === t ? '#fff' : 'transparent', color: tab === t ? '#2d7a3a' : '#666', boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
            >{t}</button>
          ))}
        </div>

        {/* Chart */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: '#222', marginBottom: 12, fontSize: 15 }}>趨勢追蹤 ({tab})</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999' }} />
              <YAxis tick={{ fontSize: 10, fill: '#999' }} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend iconType="line" wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="weight" stroke="#2d7a3a" strokeWidth={2.5} dot={{ r: 3 }} name="體重 kg" />
              <Line type="monotone" dataKey="muscle" stroke="#2196f3" strokeWidth={2.5} dot={{ r: 3 }} name="肌肉 kg" />
              <Line type="monotone" dataKey="fat" stroke="#8bc34a" strokeWidth={2.5} dot={{ r: 3 }} name="體脂 %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* History list */}
        <div className="section-title">歷史紀錄列表</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {records.map((r, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: r.highlight ? '2px solid #2196f3' : '1.5px solid #e8e8e8', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontWeight: 700, color: '#222', marginBottom: 6, fontSize: 14 }}>{r.date}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 13, flexWrap: 'wrap' }}>
                <span>體重 <b>{r.weight}kg</b> <span style={{ color: '#e53935' }}>↑{r.wDelta}</span></span>
                <span>體脂 <b>{r.fat}%</b> <span style={{ color: '#43a047' }}>↓{r.fDelta.replace('-','')}</span></span>
                <span>肌肉 <b>{r.muscle}kg</b> <span style={{ color: '#e53935' }}>↑{r.mDelta}</span></span>
              </div>
            </div>
          ))}
        </div>

        {/* Add record button */}
        <button className="btn-primary" style={{ marginTop: 16, letterSpacing: 1 }} onClick={() => setShowModal(true)}>
          + 新增量測紀錄
        </button>

        {/* Invite */}
        <div className="card" style={{ marginTop: 12, background: '#e8f5ff', border: '1.5px solid #bbdefb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: '#333' }}>邀請好友</span>
            <span style={{ color: '#2d7a3a', fontWeight: 700, fontSize: 14 }}>66%</span>
          </div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>已推薦好友數量：2/3</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '66%' }}/></div>
          <button onClick={() => onNav('referral')} style={{ marginTop: 10, background: 'transparent', border: 'none', color: '#1976d2', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>立即邀請 →</button>
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
          <button key={item.id} className={`nav-item ${item.id === 'records' ? 'active' : ''}`} onClick={() => onNav(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
