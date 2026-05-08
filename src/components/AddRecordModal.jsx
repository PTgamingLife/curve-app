import { useState } from 'react';

export default function AddRecordModal({ onClose, onSave }) {
  const [weight, setWeight] = useState('');
  const [fat, setFat] = useState('');
  const [muscle, setMuscle] = useState('');
  const [note, setNote] = useState('');
  const [step, setStep] = useState(1); // 1=input, 2=confirm
  const today = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

  const isValid = weight && fat && muscle;

  const handleSave = () => {
    onSave({ date: today, weight: parseFloat(weight), fat: parseFloat(fat), muscle: parseFloat(muscle), note });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}/>

      {/* Sheet */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 390, background: '#fff', borderRadius: '24px 24px 0 0', padding: '0 0 32px', animation: 'slideUp 0.3s ease', zIndex: 1 }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

        {/* Handle */}
        <div style={{ width: 40, height: 4, background: '#ddd', borderRadius: 4, margin: '12px auto 0' }}/>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 0' }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: '#222' }}>新增量測紀錄</h3>
          <button onClick={onClose} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✕</button>
        </div>

        <div style={{ fontSize: 13, color: '#888', padding: '4px 20px 16px' }}>📅 {today}</div>

        {step === 1 ? (
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Weight */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 6, display: 'block' }}>⚖️ 體重 (kg)</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f7f7f5', borderRadius: 14, border: '1.5px solid #e0e0e0', padding: '0 16px', overflow: 'hidden' }}>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                  placeholder="例：68.5"
                  style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 0', fontSize: 20, fontWeight: 700, color: '#2d7a3a', fontFamily: 'inherit', outline: 'none' }}/>
                <span style={{ color: '#888', fontSize: 14, fontWeight: 600 }}>kg</span>
              </div>
            </div>

            {/* Body fat */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 6, display: 'block' }}>🔥 體脂率 (%)</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f7f7f5', borderRadius: 14, border: '1.5px solid #e0e0e0', padding: '0 16px' }}>
                <input type="number" value={fat} onChange={e => setFat(e.target.value)}
                  placeholder="例：18.2"
                  style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 0', fontSize: 20, fontWeight: 700, color: '#e67e22', fontFamily: 'inherit', outline: 'none' }}/>
                <span style={{ color: '#888', fontSize: 14, fontWeight: 600 }}>%</span>
              </div>
            </div>

            {/* Muscle */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 6, display: 'block' }}>💪 肌肉量 (kg)</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f7f7f5', borderRadius: 14, border: '1.5px solid #e0e0e0', padding: '0 16px' }}>
                <input type="number" value={muscle} onChange={e => setMuscle(e.target.value)}
                  placeholder="例：45.1"
                  style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 0', fontSize: 20, fontWeight: 700, color: '#2196f3', fontFamily: 'inherit', outline: 'none' }}/>
                <span style={{ color: '#888', fontSize: 14, fontWeight: 600 }}>kg</span>
              </div>
            </div>

            {/* Note */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 6, display: 'block' }}>📝 備註（選填）</label>
              <textarea value={note} onChange={e => setNote(e.target.value)}
                placeholder="今天的狀況..."
                rows={2}
                style={{ width: '100%', background: '#f7f7f5', border: '1.5px solid #e0e0e0', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: '#444', fontFamily: 'inherit', outline: 'none', resize: 'none' }}/>
            </div>

            <button className="btn-primary" disabled={!isValid} onClick={() => setStep(2)}
              style={{ opacity: isValid ? 1 : 0.4, marginTop: 4 }}>
              下一步 →
            </button>
          </div>
        ) : (
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#f8fdf8', borderRadius: 16, padding: '20px', border: '1.5px solid #c8e6c9' }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>確認量測資料</div>
              {[
                { label: '體重', value: weight, unit: 'kg', color: '#2d7a3a' },
                { label: '體脂率', value: fat, unit: '%', color: '#e67e22' },
                { label: '肌肉量', value: muscle, unit: 'kg', color: '#2196f3' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e8f5e9' }}>
                  <span style={{ fontSize: 14, color: '#555' }}>{row.label}</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: row.color }}>{row.value} {row.unit}</span>
                </div>
              ))}
              {note && <div style={{ marginTop: 10, fontSize: 13, color: '#777' }}>備註：{note}</div>}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>← 修改</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleSave}>確認儲存 ✓</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
