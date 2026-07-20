
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cwsgebsxbhvfnyzyjasy.supabase.co"; 
const supabaseAnonKey = "YOUR_ACTUAL_ANON_KEY_STRING_HERE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
