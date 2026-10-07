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

async function checkColumns() {
  console.log(`\n🔍 Connecting to Supabase: ${supabaseUrl}`);
  var tableName = 'graffitybackup1';
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Query failed:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log(`⚠️ The "${tableName}" table exists, but it has 0 rows.`);
    return;
  }

  const columns = Object.keys(data[0]);
  console.log(`\n✅ Successfully connected! Found ${columns.length} columns in "${tableName}" table:\n`);
  
  columns.forEach((col, idx) => {
    const value = data[0][col];
    const type = Array.isArray(value) ? 'array' : typeof value;
    console.log(`  ${(idx + 1).toString().padStart(2, ' ')}. ${col.padEnd(20, ' ')} (type: ${type}, sample: ${JSON.stringify(value)})`);
  });

  console.log('\n--- Hero Columns Status ---');
  const hasLandscape = columns.some(c => ['hero-landscape'].includes(c));
  const hasPortraits = columns.some(c => ['hero-portrait'].includes(c));

  console.log(`  • Landscape Column: ${hasLandscape ? '✅ Found' : '❌ Not found yet'}`);
  console.log(`  • Portrait Column:  ${hasPortraits ? '✅ Found' : '❌ Not found yet'}`);
  console.log('---------------------------\n');
}

checkColumns();
