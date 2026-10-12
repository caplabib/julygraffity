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

export const dummySubmissions = [
  {
    email: 'tanvir.photo@gmail.com',
    detaillocation: 'Old Auditorium Wall, Townhall Rangpur',
    photographer_name: 'Tanvir Ahmed',
    artist_name: 'DU Fine Arts Collective',
    image_url: 'https://drive.google.com/file/d/1A2B3C4D5E_sample_rangpur/view',
    thoughts: 'রংপুর টাউন হলের পুরনো অডিটোরিয়াম প্রাচীরে শিক্ষার্থীদের আঁকা রক্তঝরা জুলাইয়ের স্মৃতিচিহ্ন।',
    status: 'approved',
    admin_notes: 'Verified high resolution photo. Location accurately pinpointed and confirmed by local contributors.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    json_data: {
      image: '/pictures/IMG_20260925_150215.png',
      titleBn: 'জেন জি একত্রিত',
      titleEn: 'United Gen Z',
      detaillocation: 'Old Auditorium Wall, Townhall Rangpur',
      division: 'Rangpur',
      district: 'Rangpur',
      upzila: 'Rangpur Sadar',
      datePainted: 'Some Time in 2024',
      dateCaptured: '25 September, 2026',
      artist: 'DU Fine Arts Collective',
      descriptionBn: 'জেন জি তরুণদের ঐক্যবদ্ধ প্রতিরোধ ও দ্রোহের প্রতিকৃতি।',
      descriptionEn: 'United Gen Z resistance and solidarity mural.',
      slogan: 'উই ওয়ান্ট জাস্টিস'
    }
  },
  {
    email: 'rahim.dhaka99@yahoo.com',
    detaillocation: 'TSC North Boundary Wall, Dhaka University',
    photographer_name: 'Rahim Chowdhury',
    artist_name: 'University Student Alliance',
    image_url: 'https://drive.google.com/file/d/2B3C4D5E6F_sample_tsc/view',
    thoughts: 'টিএসসির উত্তর প্রাচীরে আঁকা দেয়ালচিত্র। স্বৈরাচারবিরোধী আন্দোলনের অন্যতম আইকনিক শিল্পকর্ম।',
    status: 'pending',
    admin_notes: 'Pending editorial review. High visual clarity, checking artist collective accreditation.',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    json_data: {
      image: 'https://drive.google.com/file/d/2B3C4D5E6F_sample_tsc/view',
      titleBn: 'স্বাধীনতার রক্তিম সূর্যোদয়',
      titleEn: 'Dawn of Freedom',
      detaillocation: 'TSC North Boundary Wall, Dhaka University',
      division: 'Dhaka',
      district: 'Dhaka',
      upzila: 'Ramna',
      datePainted: '5 August 2024',
      dateCaptured: '10 October 2026',
      artist: 'University Student Alliance',
      descriptionBn: 'টিএসসি মোড়ের দেয়ালে বিজয়ের প্রথম প্রহরে আঁকা দেয়ালচিত্র।',
      descriptionEn: 'Victory dawn mural painted on the TSC gate.',
      slogan: 'রক্তের দামে কেনা স্বাধীনতা'
    }
  },
  {
    email: 'nusrat.ctg@outlook.com',
    detaillocation: 'Chawkbazar Circle Public Library Wall, Chattogram',
    photographer_name: 'Nusrat Jahan',
    artist_name: 'CU Art Club',
    image_url: 'https://drive.google.com/file/d/3C4D5E6F7G_sample_ctg/view',
    thoughts: 'চট্টগ্রাম চকবাজার পাবলিক লাইব্রেরি ভবনের দেয়ালে শিক্ষার্থীদের তুলিতে আঁকা জুলাই বিপ্লবের স্মৃতি।',
    status: 'pending',
    admin_notes: 'Under verification. Assessing GPS coordinates and date of capture.',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    json_data: {
      image: 'https://drive.google.com/file/d/3C4D5E6F7G_sample_ctg/view',
      titleBn: 'প্রতিবাদের আগুন',
      titleEn: 'Flames of Protest',
      detaillocation: 'Chawkbazar Circle Public Library Wall, Chattogram',
      division: 'Chittagong',
      district: 'Chittagong',
      upzila: 'Panchlaish',
      datePainted: 'August 2024',
      dateCaptured: '28 September 2026',
      artist: 'CU Art Club',
      descriptionBn: 'চট্টগ্রামের ছাত্র-জনতার উত্তাল মিছিল ও প্রতিরোধের গ্রাফিতি।',
      descriptionEn: 'Street resistance and student march mural.',
      slogan: 'জেগেছে জনতা, ভাঙবে শিকল'
    }
  },
  {
    email: 'asif.rajshahi@gmail.com',
    detaillocation: 'Zilla School Outer Brick Wall, Rajshahi',
    photographer_name: 'Anonymous',
    artist_name: 'Unknown Youth Group',
    image_url: 'https://drive.google.com/file/d/4D5E6F7G8H_sample_rajshahi/view',
    thoughts: 'রাজশাহী জেলা স্কুলের সীমানা প্রাচীর। আলোকচিত্রীর নাম গোপন রাখা হয়েছে।',
    status: 'needs_info',
    admin_notes: 'Needs clearer lighting or day-time photograph. Current photo has harsh evening glare.',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    json_data: {
      image: 'https://drive.google.com/file/d/4D5E6F7G8H_sample_rajshahi/view',
      titleBn: 'আমরা হার মানবো না',
      titleEn: 'We Shall Not Surrender',
      detaillocation: 'Zilla School Outer Brick Wall, Rajshahi',
      division: 'Rajshahi',
      district: 'Rajshahi',
      upzila: 'Boalia',
      datePainted: 'July 2024',
      dateCaptured: '15 September 2026',
      artist: 'Unknown Youth Group',
      descriptionBn: 'স্কুলের দেয়ালে কালো আর লালের সংমিশ্রণে আঁকা স্লোগান।',
      descriptionEn: 'Black and red typography slogan mural.',
      slogan: 'ভেঙে ফেলো অন্যায়ের প্রাচীর'
    }
  },
  {
    email: 'sadia.khulna@univ.edu',
    detaillocation: 'Shahid Minar East Wall, Khulna University',
    photographer_name: 'Sadia Afreen',
    artist_name: 'KU Fine Arts Department',
    image_url: 'https://drive.google.com/file/d/5E6F7G8H9I_sample_khulna/view',
    thoughts: 'খুলনা বিশ্ববিদ্যালয় চত্বরে শহীদ মিনারের পাশে নির্মিত নান্দনিক দেয়ালচিত্র।',
    status: 'approved',
    admin_notes: 'Archived in primary catalog. Excellent photograph and verified artist collective.',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    json_data: {
      image: 'https://drive.google.com/file/d/5E6F7G8H9I_sample_khulna/view',
      titleBn: 'শহীদের স্মরণে বীর গাঁথা',
      titleEn: 'Ode to the Martyrs',
      detaillocation: 'Shahid Minar East Wall, Khulna University',
      division: 'Khulna',
      district: 'Khulna',
      upzila: 'Gollamari',
      datePainted: 'August 2024',
      dateCaptured: '1 October 2026',
      artist: 'KU Fine Arts Department',
      descriptionBn: 'আন্দোলনে শহীদ ভাই-বোনদের স্মরণ করে আঁকা স্মৃতিসৌধ রূপক গ্রাফিতি।',
      descriptionEn: 'Memorial mural honoring the martyrs of the July uprising.',
      slogan: 'তোমাদের ভুলবো না'
    }
  },
  {
    email: 'ad.promo2024@commercial.net',
    detaillocation: 'Shop Gate Banner, Unknown Market',
    photographer_name: 'Commercial Promoter',
    artist_name: 'Commercial Artist',
    image_url: 'https://drive.google.com/file/d/6F7G8H9I0J_sample_spam/view',
    thoughts: 'Banner advertising retail clothing.',
    status: 'rejected',
    admin_notes: 'Rejected: Commercial advertisement not related to the July 2024 revolution movement.',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    json_data: {
      image: 'https://drive.google.com/file/d/6F7G8H9I0J_sample_spam/view',
      titleBn: 'বিজ্ঞাপনী ব্যানার',
      titleEn: 'Commercial Ad',
      detaillocation: 'Shop Gate, Mirpur',
      division: 'Dhaka',
      district: 'Dhaka',
      upzila: 'Mirpur',
      datePainted: 'Unknown',
      dateCaptured: 'Unknown',
      artist: 'Commercial',
      descriptionBn: 'অপ্রাসঙ্গিক কমার্শিয়াল ব্যানার।',
      descriptionEn: 'Irrelevant commercial banner.',
      slogan: 'Sale 50% Off'
    }
  }
];

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
