import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zerupczzqwgwsvvyjcml.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplcnVwY3p6cXdnd3N2dnlqY21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMTQzMDQsImV4cCI6MjA1Mjg5MDMwNH0.a-uXS7hKAVOmbhdwhD4ecoo1pgMW14DCwRUhn8IR_Qs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
