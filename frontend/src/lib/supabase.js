
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cwsgebsxbhvfnyzyjasy.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3c2dlYnN4Ymh2Zm55enlqYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjEyNTAsImV4cCI6MjA4OTY5NzI1MH0.rIODz01tLyOf-YB54KylNJYWu7CKQRSE62WrwEZ-mn8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
