import { useState, useEffect } from 'react';

const questions = [
  {
    q: '以下哪種營養素最適合增肌？',
    options: ['A.蛋白質', 'B.碳水化合物', 'C.脂肪', 'D.維生素'],
    answer: 0,
  },
  {
    q: '每日建議飲水量大約是多少？',
    options: ['A.500ml', 'B.1000ml', 'C.2000ml', 'D.4000ml'],
    answer: 2,
  },
  {
    q: '以下哪種維生素有助於鈣吸收？',
    options: ['A.維生素A', 'B.維生素B', 'C.維生素C', 'D.維生素D'],
    answer: 3,
  },
];

export default function QuizScreen({ onNav, onDone }) {
  const [current, setCurrent] = useState(2); // start at Q3 to match screenshot
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(300);
  const [timeLeft, setTimeLeft] = useState(25);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) { setAnswered(true); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answered]);

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[current].answer) setScore(s => s + 150);
  };

  const nextQ = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(25);
    } else {
      // quiz finished
      onDone?.({ score, correct: Math.round(score / 150), total: questions.length });
    }
  };

  const q = questions[current];
  const totalQ = 10;
  const completedDots = current + (answered ? 1 : 0);

  return (
    <div className="screen fade-in" style={{ background: 'linear-gradient(180deg, #e8f5e9 0%, #fffde7 100%)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #3d8b40, #5cb85c)', padding: '14px 20px 16px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0 }}>營養知識挑戰</h2>
            {/* Dot progress */}
            <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
              {Array.from({ length: totalQ }).map((_, i) => (
                <div key={i} style={{
                  width: i < completedDots ? 14 : 10,
                  height: i < completedDots ? 14 : 10,
                  borderRadius: '50%',
                  background: i < completedDots ? '#f5c518' : 'rgba(255,255,255,0.4)',
                  border: i === completedDots ? '2px solid #f5c518' : 'none',
                  transition: 'all 0.2s',
                }}/>
              ))}
            </div>
            <div style={{ fontSize: 13, marginTop: 6, opacity: 0.9 }}>關卡 {current + 1}/10</div>
          </div>
          {/* Timer */}
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', width: 72, height: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.5)' }}>
            <div style={{ fontSize: 10, opacity: 0.85 }}>剩餘時間</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              00:{String(timeLeft).padStart(2, '0')}
            </div>
          </div>
        </div>
        {/* Score */}
        <div style={{ marginTop: 8, textAlign: 'right', fontSize: 14, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 14px', display: 'inline-block', float: 'right', clear: 'both' }}>
          ⭐ 得分: +150分
        </div>
      </div>

      {/* Question area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 20px 0' }}>
        {/* Mascot */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 }}>
            🌿
          </div>
        </div>

        {/* Question */}
        <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#2d3a2d', marginBottom: 20, lineHeight: 1.5 }}>
          {q.q}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let bg = '#fff';
            let borderColor = '#c8e6c9';
            let textColor = '#2d3a2d';

            if (answered) {
              if (i === q.answer) { bg = '#e8f5e9'; borderColor = '#4caf50'; textColor = '#1b5e20'; }
              else if (i === selected) { bg = '#ffebee'; borderColor = '#ef5350'; textColor = '#b71c1c'; }
            }

            return (
              <button key={i} onClick={() => handleAnswer(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: bg, border: `2px solid ${borderColor}`,
                  borderRadius: 14, padding: '14px 16px',
                  cursor: answered ? 'default' : 'pointer',
                  textAlign: 'left', fontFamily: 'inherit',
                  transition: 'all 0.2s', transform: selected === i ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: i === (answered ? q.answer : -1) ? '#4caf50' : (selected === i && answered ? '#ef5350' : 'linear-gradient(135deg, #c8e6c9, #a5d6a7)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff', flexShrink: 0, backgroundImage: (!answered || (answered && i !== q.answer && i !== selected)) ? 'linear-gradient(135deg, #c8e6c9, #66bb6a)' : 'none', backgroundColor: answered && i === q.answer ? '#4caf50' : (answered && i === selected ? '#ef5350' : 'transparent') }}>
                  {letter}
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: textColor }}>{opt}</span>
                {answered && i === q.answer && <span style={{ marginLeft: 'auto', fontSize: 18 }}>✓</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <button className="btn-primary" style={{ marginTop: 16 }} onClick={nextQ}>
            {current < questions.length - 1 ? '下一題 →' : '查看結果'}
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '12px 20px 16px', background: '#fff8e1', borderTop: '1px solid #ffe082', display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <button onClick={() => onNav('ranking')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f5c518', border: 'none', borderRadius: 20, padding: '8px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'inherit', color: '#5d4037' }}>
          🏆 查看我的排名
        </button>
        <span style={{ fontSize: 12, color: '#888', flex: 1 }}>每日挑戰提示：完成今日挑戰，贏取雙倍經驗！</span>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {[
          { id: 'home', icon: '🏠', label: '首頁' },
          { id: 'explore', icon: '🧭', label: '探索' },
          { id: 'quiz', icon: '🏆', label: '挑戰' },
          { id: 'ranking', icon: '🥇', label: '排名' },
          { id: 'profile', icon: '👤', label: '個人' },
        ].map(item => (
          <button key={item.id} className={`nav-item ${item.id === 'quiz' ? 'active' : ''}`} onClick={() => onNav(item.id)}
            style={{ fontSize: 22 }}>
            <span>{item.icon}</span>
            <span style={{ fontSize: 11 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
