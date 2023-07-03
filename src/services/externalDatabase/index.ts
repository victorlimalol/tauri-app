import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninqxpyxbckfotdphmpg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbnF4cHl4YmNrZm90ZHBobXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzMzMwNjUsImV4cCI6MjAwMzkwOTA2NX0.Sg5aZasoZ_F0nj1esHpmfL_oGnr33ra5yMmYcct206w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;