import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zerupczzqwgwsvvyjcml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplcnVwY3p6cXdnd3N2dnlqY21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDYyMzIsImV4cCI6MjA1MTA4MjIzMn0.rjNK38bFYOkeo5MfP8ra-4yM5ZJk0W43mIuAOEZF87g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
