import { useEffect, useState } from 'react';
import { saveQuizScore } from '../lib/measurements';
import { useToast } from '../components/Toast';

export default function QuizResultScreen({ userId, score, correct, total, onNav }) {
  const [saved, setSaved] = useState(false);
  const showToast = useToast();
  const pct = Math.round((correct / total) * 100);

  const grade =
    pct >= 90 ? { label: 'S', color: '#f5c518', msg: '完美！你是營養達人！🏆' } :
    pct >= 70 ? { label: 'A', color: '#4caf50', msg: '優秀！繼續加油！💪' } :
    pct >= 50 ? { label: 'B', color: '#2196f3', msg: '不錯！多練習會更好！📚' } :
               { label: 'C', color: '#e67e22', msg: '繼續努力，下次更好！🌱' };

  useEffect(() => {
    if (!userId || saved) return;
    setSaved(true);
    saveQuizScore(userId, { score, correct_count: correct, total_questions: total })
      .then(() => showToast('積分已儲存！', 'success'))
      .catch(() => showToast('積分儲存失敗', 'error'));
  }, []);

  return (
    <div className="screen fade-in" style={{ background: 'linear-gradient(180deg,#e8f5e9,#fffde7)' }}>
      {/* Status bar */}
      <div className="status-bar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#333"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#333"/></svg>
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 28px', gap: 0 }}>

        {/* Title */}
        <div style={{ fontSize: 20, fontWeight: 900, color: '#1a3a22', marginBottom: 6 }}>挑戰完成！</div>
        <div style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>營養知識挑戰結果</div>

        {/* Grade circle */}
        <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 20 }}>
          <svg viewBox="0 0 140 140" width="140" height="140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#e8e8e8" strokeWidth="10"/>
            <circle cx="70" cy="70" r="60" fill="none" stroke={grade.color} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 60 * pct / 100} ${2 * Math.PI * 60}`}
              strokeLinecap="round" transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{grade.label}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{pct}%</div>
          </div>
        </div>

        {/* Message */}
        <div style={{ fontSize: 16, fontWeight: 700, color: '#2d3a2d', marginBottom: 24, textAlign: 'center' }}>{grade.msg}</div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 28, width: '100%' }}>
          {[
            { label: '答對題數', value: `${correct}/${total}`, color: '#4caf50' },
            { label: '獲得積分', value: `+${score}`, color: '#f5c518' },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Breakdown bar */}
        <div style={{ width: '100%', background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: '#4caf50', fontWeight: 700 }}>✓ 答對 {correct} 題</span>
            <span style={{ color: '#e53935', fontWeight: 700 }}>✕ 答錯 {total - correct} 題</span>
          </div>
          <div style={{ height: 10, background: '#ffcdd2', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#66bb6a,#2d7a3a)', borderRadius: 10, transition: 'width 1s ease' }}/>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn-primary" onClick={() => onNav('ranking')}>
            🏆 查看排名
          </button>
          <button className="btn-outline" onClick={() => onNav('quiz')}>
            再挑戰一次
          </button>
          <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', color: '#888', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', padding: '8px' }}>
            返回首頁
          </button>
        </div>
      </div>
    </div>
  );
}
