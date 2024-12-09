// lib/supabase.js

import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase URL and Anon Key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;