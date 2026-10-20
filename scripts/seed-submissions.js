import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

// Helper to auto-load .env
function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        const val = valueParts.join('=').trim();
        if (key && val && !process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { dummySubmissions } from '../src/lib/data/dummySubmissions.js';
export { dummySubmissions };


async function seed() {
  console.log(`\n🌱 Seeding ${dummySubmissions.length} dummy submissions to Supabase (${supabaseUrl})...\n`);

  const { data, error } = await supabase
    .from('submissions')
    .insert(dummySubmissions)
    .select();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    if (error.message.includes('permission denied')) {
      console.log('\n💡 Tip: In your Supabase SQL Editor, run:');
      console.log('   GRANT ALL ON TABLE public.submissions TO anon, authenticated, service_role;');
      console.log('   (See full script in "supabase_submissions_table.sql")\n');
    }
    return;
  }

  console.log(`✅ Successfully inserted ${data.length} dummy submissions!`);
}

if (process.argv[1] && process.argv[1].endsWith('seed-submissions.js')) {
  seed();
}
