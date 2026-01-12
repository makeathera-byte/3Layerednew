import { createClient } from '@supabase/supabase-js';

// For production, move these to environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oweufwhxnpjhdzpdqmsy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
