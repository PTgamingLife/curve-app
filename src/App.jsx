import { useState, useEffect } from 'react';
import './index.css';
import { supabase } from './lib/supabase';
import { getProfile } from './lib/auth';
import { ToastProvider } from './components/Toast';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RecordsScreen from './screens/RecordsScreen';
import ReferralScreen from './screens/ReferralScreen';
import QuizScreen from './screens/QuizScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import RankingScreen from './screens/RankingScreen';
import PlanScreen from './screens/PlanScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);       // Supabase auth user
  const [profile, setProfile] = useState(null); // curve_profiles row
  const [quizResult, setQuizResult] = useState(null); // { score, correct, total }

  // Listen to Supabase auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
        setScreen('home');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (uid) => {
    try {
      const p = await getProfile(uid);
      setProfile(p);
    } catch {
      // profile not yet created (race condition on register) — retry once
      setTimeout(async () => {
        try { setProfile(await getProfile(uid)); } catch {}
      }, 1500);
    }
  };

  const nav = (dest) => setScreen(dest);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setScreen('login');
  };

  const handleQuizDone = (result) => {
    setQuizResult(result);
    setScreen('quizResult');
  };

  if (screen === 'login') return (
    <ToastProvider>
      <LoginScreen onLogin={() => { loadProfile(user?.id); setScreen('home'); }} />
    </ToastProvider>
  );

  return (
    <ToastProvider>
      {screen === 'home'       && <HomeScreen onNav={nav} profile={profile} />}
      {screen === 'records'    && <RecordsScreen onNav={nav} userId={user?.id} />}
      {screen === 'referral'   && <ReferralScreen onBack={() => nav('home')} onNav={nav} profile={profile} />}
      {screen === 'quiz'       && <QuizScreen onNav={nav} onDone={handleQuizDone} />}
      {screen === 'quizResult' && <QuizResultScreen onNav={nav} userId={user?.id} score={quizResult?.score} correct={quizResult?.correct} total={quizResult?.total} />}
      {screen === 'ranking'    && <RankingScreen onNav={nav} userId={user?.id} />}
      {screen === 'plan'       && <PlanScreen onNav={nav} />}
      {screen === 'profile'    && <ProfileScreen onNav={nav} profile={profile} onLogout={handleLogout} />}
    </ToastProvider>
  );
}
