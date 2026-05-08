import { useEffect, useState } from 'react';

const toastStyles = {
  success: { bg: '#2d7a3a', icon: '✓' },
  error:   { bg: '#e53935', icon: '✕' },
  info:    { bg: '#1976d2', icon: 'ℹ' },
  warning: { bg: '#f57c00', icon: '⚠' },
};

export function Toast({ message, type = 'success', onDone }) {
  const [visible, setVisible] = useState(true);
  const style = toastStyles[type] || toastStyles.success;

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 60, left: '50%', transform: `translateX(-50%) translateY(${visible ? 0 : '-80px'})`,
      zIndex: 999, background: style.bg, color: '#fff',
      padding: '12px 20px', borderRadius: 30,
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      opacity: visible ? 1 : 0,
      maxWidth: 320,
    }}>
      <span style={{ fontSize: 16 }}>{style.icon}</span>
      {message}
    </div>
  );
}

// Global toast manager — wrap App with <ToastProvider>
import { createContext, useContext, useCallback, useRef } from 'react';
const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);

  const showToast = useCallback((message, type = 'success') => {
    const key = ++id.current;
    setToasts(t => [...t, { key, message, type }]);
  }, []);

  const remove = useCallback((key) => {
    setToasts(t => t.filter(x => x.key !== key));
  }, []);

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      {toasts.map(t => (
        <Toast key={t.key} message={t.message} type={t.type} onDone={() => remove(t.key)} />
      ))}
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
