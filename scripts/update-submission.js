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

async function main() {
  const args = process.argv.slice(2);

  // If no arguments provided, list submissions
  if (args.length === 0) {
    console.log(`\n📋 Fetching submissions from Supabase (${supabaseUrl})...\n`);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching submissions:', error.message);
      console.log('\n💡 Note: Make sure you ran the SQL from "supabase_submissions_table.sql" in your Supabase dashboard.');
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.log('ℹ️ No submissions found in the database yet.');
      process.exit(0);
    }

    console.log(`Found ${data.length} submission(s):\n`);
    data.forEach((sub, i) => {
      console.log(`[${i + 1}] ID: ${sub.id}`);
      console.log(`    Status:        ${sub.status.toUpperCase()}`);
      console.log(`    Email:         ${sub.email}`);
      console.log(`    Location/Wall: ${sub.detaillocation}`);
      console.log(`    Photographer:  ${sub.photographer_name}`);
      console.log(`    Image:         ${sub.image_url}`);
      console.log(`    Admin Notes:   ${sub.admin_notes || 'None'}`);
      console.log(`    Created:       ${sub.created_at}`);
      console.log('--------------------------------------------------');
    });

    console.log('\n💡 Usage to update a submission:');
    console.log('   node scripts/update-submission.js <ID> <approved|rejected|needs_info|pending> ["Optional admin notes"]\n');
    return;
  }

  const [id, newStatus, adminNotes] = args;
  const validStatuses = ['pending', 'approved', 'rejected', 'needs_info'];

  if (!validStatuses.includes(newStatus.toLowerCase())) {
    console.error(`❌ Invalid status "${newStatus}". Must be one of: ${validStatuses.join(', ')}`);
    process.exit(1);
  }

  const updates = {
    status: newStatus.toLowerCase(),
    updated_at: new Date().toISOString()
  };
  if (adminNotes) {
    updates.admin_notes = adminNotes;
  }

  console.log(`🔄 Updating submission ${id} to "${newStatus}"...`);
  const { data, error } = await supabase
    .from('submissions')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('❌ Update failed:', error.message);
    process.exit(1);
  }

  console.log('✅ Successfully updated submission:');
  console.log(data);
}

main();
