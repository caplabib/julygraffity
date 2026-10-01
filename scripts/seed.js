import { createClient } from '@supabase/supabase-js';
import { muralsData } from '../src/lib/data/murals.js';
import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';

// Helper to auto-load .env or .env.example files
function loadEnv() {
  const envPaths = [path.resolve('.env'), path.resolve('.env.example')];
  for (const envPath of envPaths) {
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
}

loadEnv();

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in your environment.');
  console.log('Usage:');
  console.log('  VITE_SUPABASE_URL="https://xxx.supabase.co" VITE_SUPABASE_ANON_KEY="xxx" node scripts/seed.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log(`🚀 Starting upload of ${muralsData.length} murals to Supabase...`);

  const records = muralsData.map((mural) => ({
    id: mural.id,
    image: mural.image.replace(/^\/pictures\//, ''),
    title_bn: mural.titleBn,
    title_en: mural.titleEn,
    location: mural.location,
    district: mural.district || '',
    upzila: mural.upzila || '',
    category: mural.category || '',
    date_painted: mural.datePainted || '',
    date_captured: mural.dateCaptured || '',
    artist: mural.artist || '',
    description_bn: mural.descriptionBn || '',
    description_en: mural.descriptionEn || '',
    slogan: mural.slogan || '',
    likes: mural.likes || 0,
    tags: mural.tags || []
  }));

  const { data, error } = await supabase
    .from('murals')
    .upsert(records, { onConflict: 'id' });

  if (error) {
    console.error('❌ Database insertion failed:', error);
  } else {
    console.log(`✅ Successfully seeded ${records.length} murals into your Supabase database!`);
  }
}

seed();
