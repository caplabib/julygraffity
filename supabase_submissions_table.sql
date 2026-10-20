-- ==============================================================================
-- SQL Migration for July Graffiti Archive: Submissions Table & Dummy Data
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/jvxgqflxmumxhjeywmjp/sql
-- ==============================================================================

-- 1. Create table if not exists
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT NOT NULL,
    detaillocation TEXT NOT NULL,
    photographer_name TEXT DEFAULT 'Anonymous',
    artist_name TEXT DEFAULT 'Unknown',
    image_url TEXT NOT NULL,
    thoughts TEXT,
    json_data JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'needs_info')),
    admin_notes TEXT
);

-- 2. GRANT PERMISSIONS (Fixes 'permission denied for table submissions' for anon role)
GRANT ALL ON TABLE public.submissions TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 3. Enable Row Level Security (RLS) and create policies
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3a. Read access: Public can view submissions (sensitive fields like email are masked by the application API)
DROP POLICY IF EXISTS "Allow public select from submissions" ON public.submissions;
CREATE POLICY "Allow public select from submissions"
ON public.submissions
FOR SELECT
TO anon, authenticated, service_role
USING (true);

-- 3b. Create access: Community members can submit entries
DROP POLICY IF EXISTS "Allow public insert to submissions" ON public.submissions;
CREATE POLICY "Allow public insert to submissions"
ON public.submissions
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- 3c. Update access: Only the server-side service role (or authenticated moderators) can approve/reject entries
DROP POLICY IF EXISTS "Allow public update submissions" ON public.submissions;
DROP POLICY IF EXISTS "Allow service role update submissions" ON public.submissions;
CREATE POLICY "Allow service role update submissions"
ON public.submissions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);


-- 4. INSERT REALISTIC DUMMY SUBMISSION RECORDS
INSERT INTO public.submissions (
    email,
    detaillocation,
    photographer_name,
    artist_name,
    image_url,
    thoughts,
    status,
    admin_notes,
    created_at,
    json_data
) VALUES 
(
    'tanvir.photo@gmail.com',
    'Old Auditorium Wall, Townhall Rangpur',
    'Tanvir Ahmed',
    'DU Fine Arts Collective',
    'https://drive.google.com/file/d/1A2B3C4D5E_sample_rangpur/view',
    'রংপুর টাউন হলের পুরনো অডিটোরিয়াম প্রাচীরে শিক্ষার্থীদের আঁকা রক্তঝরা জুলাইয়ের স্মৃতিচিহ্ন।',
    'approved',
    'Verified high resolution photo. Location accurately pinpointed and confirmed by local contributors.',
    timezone('utc'::text, now() - INTERVAL '3 days'),
    '{
        "image": "/pictures/IMG_20260925_150215.png",
        "titleBn": "জেন জি একত্রিত",
        "titleEn": "United Gen Z",
        "detaillocation": "Old Auditorium Wall, Townhall Rangpur",
        "division": "Rangpur",
        "district": "Rangpur",
        "upzila": "Rangpur Sadar",
        "datePainted": "Some Time in 2024",
        "dateCaptured": "25 September, 2026",
        "artist": "DU Fine Arts Collective",
        "descriptionBn": "জেন জি তরুণদের ঐক্যবদ্ধ প্রতিরোধ ও দ্রোহের প্রতিকৃতি।",
        "descriptionEn": "United Gen Z resistance and solidarity mural.",
        "slogan": "উই ওয়ান্ট জাস্টিস"
    }'::jsonb
),
(
    'rahim.dhaka99@yahoo.com',
    'TSC North Boundary Wall, Dhaka University',
    'Rahim Chowdhury',
    'University Student Alliance',
    'https://drive.google.com/file/d/2B3C4D5E6F_sample_tsc/view',
    'টিএসসির উত্তর প্রাচীরে আঁকা দেয়ালচিত্র। স্বৈরাচারবিরোধী আন্দোলনের অন্যতম আইকনিক শিল্পকর্ম।',
    'pending',
    'Pending editorial review. High visual clarity, checking artist collective accreditation.',
    timezone('utc'::text, now() - INTERVAL '1 day'),
    '{
        "image": "https://drive.google.com/file/d/2B3C4D5E6F_sample_tsc/view",
        "titleBn": "স্বাধীনতার রক্তিম সূর্যোদয়",
        "titleEn": "Dawn of Freedom",
        "detaillocation": "TSC North Boundary Wall, Dhaka University",
        "division": "Dhaka",
        "district": "Dhaka",
        "upzila": "Ramna",
        "datePainted": "5 August 2024",
        "dateCaptured": "10 October 2026",
        "artist": "University Student Alliance",
        "descriptionBn": "টিএসসি মোড়ের দেয়ালে বিজয়ের প্রথম প্রহরে আঁকা দেয়ালচিত্র।",
        "descriptionEn": "Victory dawn mural painted on the TSC gate.",
        "slogan": "রক্তের দামে কেনা স্বাধীনতা"
    }'::jsonb
),
(
    'nusrat.ctg@outlook.com',
    'Chawkbazar Circle Public Library Wall, Chattogram',
    'Nusrat Jahan',
    'CU Art Club',
    'https://drive.google.com/file/d/3C4D5E6F7G_sample_ctg/view',
    'চট্টগ্রাম চকবাজার পাবলিক লাইব্রেরি ভবনের দেয়ালে শিক্ষার্থীদের তুলিতে আঁকা জুলাই বিপ্লবের স্মৃতি।',
    'pending',
    'Under verification. Assessing GPS coordinates and date of capture.',
    timezone('utc'::text, now() - INTERVAL '12 hours'),
    '{
        "image": "https://drive.google.com/file/d/3C4D5E6F7G_sample_ctg/view",
        "titleBn": "প্রতিবাদের আগুন",
        "titleEn": "Flames of Protest",
        "detaillocation": "Chawkbazar Circle Public Library Wall, Chattogram",
        "division": "Chittagong",
        "district": "Chittagong",
        "upzila": "Panchlaish",
        "datePainted": "August 2024",
        "dateCaptured": "28 September 2026",
        "artist": "CU Art Club",
        "descriptionBn": "চট্টগ্রামের ছাত্র-জনতার উত্তাল মিছিল ও প্রতিরোধের গ্রাফিতি।",
        "descriptionEn": "Street resistance and student march mural.",
        "slogan": "জেগেছে জনতা, ভাঙবে শিকল"
    }'::jsonb
),
(
    'asif.rajshahi@gmail.com',
    'Zilla School Outer Brick Wall, Rajshahi',
    'Anonymous',
    'Unknown Youth Group',
    'https://drive.google.com/file/d/4D5E6F7G8H_sample_rajshahi/view',
    'রাজশাহী জেলা স্কুলের সীমানা প্রাচীর। আলোকচিত্রীর নাম গোপন রাখা হয়েছে।',
    'needs_info',
    'Needs clearer lighting or day-time photograph. Current photo has harsh evening glare.',
    timezone('utc'::text, now() - INTERVAL '5 days'),
    '{
        "image": "https://drive.google.com/file/d/4D5E6F7G8H_sample_rajshahi/view",
        "titleBn": "আমরা হার মানবো না",
        "titleEn": "We Shall Not Surrender",
        "detaillocation": "Zilla School Outer Brick Wall, Rajshahi",
        "division": "Rajshahi",
        "district": "Rajshahi",
        "upzila": "Boalia",
        "datePainted": "July 2024",
        "dateCaptured": "15 September 2026",
        "artist": "Unknown Youth Group",
        "descriptionBn": "স্কুলের দেয়ালে কালো আর লালের সংমিশ্রণে আঁকা স্লোগান।",
        "descriptionEn": "Black and red typography slogan mural.",
        "slogan": "ভেঙে ফেলো অন্যায়ের প্রাচীর"
    }'::jsonb
),
(
    'sadia.khulna@univ.edu',
    'Shahid Minar East Wall, Khulna University',
    'Sadia Afreen',
    'KU Fine Arts Department',
    'https://drive.google.com/file/d/5E6F7G8H9I_sample_khulna/view',
    'খুলনা বিশ্ববিদ্যালয় চত্বরে শহীদ মিনারের পাশে নির্মিত নান্দনিক দেয়ালচিত্র।',
    'approved',
    'Archived in primary catalog. Excellent photograph and verified artist collective.',
    timezone('utc'::text, now() - INTERVAL '6 days'),
    '{
        "image": "https://drive.google.com/file/d/5E6F7G8H9I_sample_khulna/view",
        "titleBn": "শহীদের স্মরণে বীর গাঁথা",
        "titleEn": "Ode to the Martyrs",
        "detaillocation": "Shahid Minar East Wall, Khulna University",
        "division": "Khulna",
        "district": "Khulna",
        "upzila": "Gollamari",
        "datePainted": "August 2024",
        "dateCaptured": "1 October 2026",
        "artist": "KU Fine Arts Department",
        "descriptionBn": "আন্দোলনে শহীদ ভাই-বোনদের স্মরণ করে আঁকা স্মৃতিসৌধ রূপক গ্রাফিতি।",
        "descriptionEn": "Memorial mural honoring the martyrs of the July uprising.",
        "slogan": "তোমাদের ভুলবো না"
    }'::jsonb
),
(
    'ad.promo2024@commercial.net',
    'Shop Gate Banner, Unknown Market',
    'Commercial Promoter',
    'Commercial Artist',
    'https://drive.google.com/file/d/6F7G8H9I0J_sample_spam/view',
    'Banner advertising retail clothing.',
    'rejected',
    'Rejected: Commercial advertisement not related to the July 2024 revolution movement.',
    timezone('utc'::text, now() - INTERVAL '7 days'),
    '{
        "image": "https://drive.google.com/file/d/6F7G8H9I0J_sample_spam/view",
        "titleBn": "বিজ্ঞাপনী ব্যানার",
        "titleEn": "Commercial Ad",
        "detaillocation": "Shop Gate, Mirpur",
        "division": "Dhaka",
        "district": "Dhaka",
        "upzila": "Mirpur",
        "datePainted": "Unknown",
        "dateCaptured": "Unknown",
        "artist": "Commercial",
        "descriptionBn": "অপ্রাসঙ্গিক কমার্শিয়াল ব্যানার।",
        "descriptionEn": "Irrelevant commercial banner.",
        "slogan": "Sale 50% Off"
    }'::jsonb
)
ON CONFLICT DO NOTHING;
