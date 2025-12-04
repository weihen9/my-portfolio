import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vwidibeiromcxvjhjkzq.supabase.co'
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aWRpYmVpcm9tY3h2amhqa3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MzM3NjksImV4cCI6MjA4MDMwOTc2OX0.7YM53936B_H4BnD8PipBK3ryVADsDBnCAkoVs1U9qRQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
