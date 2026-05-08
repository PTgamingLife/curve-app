import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcemkmwrlvijxxwybrgs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZW1rbXdybHZpanh4d3licmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzA1NDgsImV4cCI6MjA5MDcwNjU0OH0.Ji557wlvrS7YgflU9ANEm9To6AXLc47EFPaMHTgGARg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// phone → fake email for Supabase Auth
export const phoneToEmail = (phone) => `${phone.replace(/\s/g, '')}@curveapp.tw`;

// generate referral code
export const genReferralCode = () =>
  'NUTRI-FRIEND-' + Math.floor(100 + Math.random() * 900);
