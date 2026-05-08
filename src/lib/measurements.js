import { supabase } from './supabase';

export async function fetchMeasurements(userId) {
  const { data, error } = await supabase
    .from('curve_measurements')
    .select('*')
    .eq('user_id', userId)
    .order('measured_at', { ascending: false })
    .limit(30);
  if (error) throw error;
  return data;
}

export async function addMeasurement(userId, { weight, body_fat, muscle_mass, note }) {
  const { data, error } = await supabase
    .from('curve_measurements')
    .insert({ user_id: userId, weight, body_fat, muscle_mass, note })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function saveQuizScore(userId, { score, correct_count, total_questions }) {
  const { error } = await supabase
    .from('curve_quiz_attempts')
    .insert({ user_id: userId, score, correct_count, total_questions });
  if (error) throw error;

  // update total score in profile
  await supabase.rpc('increment_score', { uid: userId, amt: score }).catch(() => {
    // fallback manual update
    supabase.from('curve_profiles')
      .select('total_score')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        if (data) {
          supabase.from('curve_profiles')
            .update({ total_score: (data.total_score || 0) + score })
            .eq('id', userId);
        }
      });
  });
}

export async function fetchRanking() {
  const { data, error } = await supabase
    .from('curve_profiles')
    .select('id, name, total_score, membership_level')
    .order('total_score', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
}
