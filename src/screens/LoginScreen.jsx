import { useState } from 'react';
import { signIn, signUp } from '../lib/auth';
import { useToast } from '../components/Toast';

export default function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const handleSubmit = async () => {
    if (!phone || !password) { showToast('請填寫手機號碼與密碼', 'warning'); return; }
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn({ phone, password });
        showToast('登入成功！', 'success');
        onLogin();
      } else {
        if (password.length < 6) { showToast('密碼至少 6 位', 'warning'); setLoading(false); return; }
        await signUp({ phone, password, name, referredBy: referral || null });
        showToast('註冊成功！請重新登入', 'success');
        setMode('login');
      }
    } catch (e) {
      const msg = e.message?.includes('Invalid login') ? '手機號碼或密碼錯誤'
        : e.message?.includes('already registered') ? '此號碼已註冊，請直接登入'
        : e.message || '發生錯誤，請稍後再試';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #f5f8f0 0%, #eef5e8 100%)' }}>
      <div className="status-bar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#333"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#333"/></svg>
        </span>
      </div>

      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, marginBottom: 28 }}>
        <div style={{ width: 76, height: 76, marginBottom: 12 }}>
          <svg viewBox="0 0 80 80" fill="none">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8bc34a"/><stop offset="100%" stopColor="#2d7a3a"/>
              </linearGradient>
            </defs>
            <path d="M15 38c0-14 11-25 25-22 4 1 7 3 9 6" stroke="url(#lg)" strokeWidth="7" strokeLinecap="round" fill="none"/>
            <path d="M65 42c0 14-11 25-25 22-4-1-7-3-9-6" stroke="url(#lg)" strokeWidth="7" strokeLinecap="round" fill="none"/>
            <circle cx="56" cy="14" r="5" fill="url(#lg)"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 900, color: '#2d5a1b', letterSpacing: 4, margin: 0 }}>曲線管理</h1>
        <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Powered by Nutrilite</p>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', margin: '0 28px 20px', background: '#e8f0e8', borderRadius: 30, padding: 3 }}>
        {['login','register'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ flex: 1, padding: '9px', borderRadius: 26, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, background: mode === m ? '#fff' : 'transparent', color: mode === m ? '#2d7a3a' : '#888', boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
            {m === 'login' ? '登入' : '註冊'}
          </button>
        ))}
      </div>

      {/* Form */}
      <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mode === 'register' && (
          <div className="input-field" style={{ background: '#fff', border: '1.5px solid #dce8d0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            <input placeholder="姓名" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}

        <div className="input-field" style={{ background: '#fff', border: '1.5px solid #dce8d0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18" strokeWidth="3"/></svg>
          <input type="tel" placeholder="09xxxxxxxx" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>

        <div className="input-field" style={{ background: '#fff', border: '1.5px solid #dce8d0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <input type="password" placeholder="請輸入密碼（至少6位）" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        {mode === 'register' && (
          <div className="input-field" style={{ background: '#fff', border: '1.5px solid #dce8d0' }}>
            <input type="tel" placeholder="輸入推薦人電話（選填）" value={referral} onChange={e => setReferral(e.target.value)} style={{ textAlign: 'center', color: '#888' }} />
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}
          style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}>
          {loading ? '處理中...' : mode === 'login' ? '登入' : '完成註冊'}
        </button>
      </div>

      {/* Bottom logos */}
      <div style={{ marginTop: 'auto', padding: '24px 0 40px', display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2d7a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="white"><path d="M14 4C9 4 5 8 5 13c0 3 1.5 5.5 4 7v3l3-1.5c.6.1 1.3.2 2 .2 5 0 9-4 9-9s-4-9-9-9z"/></svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#2d7a3a' }}>NUTRILITE™</div>
        </div>
      </div>

      {/* Veggie decorations */}
      <div style={{ position: 'absolute', bottom: 40, left: -10, opacity: 0.25, pointerEvents: 'none' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="#5cb85c"><ellipse cx="20" cy="40" rx="15" ry="30" transform="rotate(-20 20 40)"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: 30, right: -5, opacity: 0.2, pointerEvents: 'none' }}>
        <svg width="70" height="90" viewBox="0 0 70 90" fill="#e88080"><ellipse cx="35" cy="50" rx="20" ry="35"/></svg>
      </div>
    </div>
  );
}
