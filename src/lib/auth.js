import { supabase, phoneToEmail, genReferralCode } from './supabase';

export async function signUp({ phone, password, name, referredBy }) {
  const email = phoneToEmail(phone);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: undefined, data: { phone } },
  });
  if (error) {
    if (error.message?.toLowerCase().includes('rate limit')) {
      throw new Error('註冊太頻繁，請稍後 1 分鐘再試');
    }
    throw error;
  }

  const userId = data.user.id;
  const referralCode = genReferralCode();

  const { error: profileError } = await supabase.from('curve_profiles').insert({
    id: userId,
    name: name || phone,
    phone,
    referral_code: referralCode,
    referred_by: referredBy || null,
  });
  if (profileError) throw profileError;

  return data;
}

export async function signIn({ phone, password }) {
  const email = phoneToEmail(phone);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('curve_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}
