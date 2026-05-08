import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key
// You can find these in your Supabase Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This is for normal staff (Secure)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
