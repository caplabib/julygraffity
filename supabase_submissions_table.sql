-- ==============================================================================
-- SQL Migration for July Graffiti Archive: Submissions Table
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Create submissions table
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

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous public submissions (Insert)
CREATE POLICY "Allow public insert to submissions"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Allow public read access to view submissions status
CREATE POLICY "Allow public select from submissions"
ON public.submissions
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Allow updating submission status (for admin/moderators)
CREATE POLICY "Allow public update submissions"
ON public.submissions
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 6. Insert sample submission for verification
INSERT INTO public.submissions (
    email,
    detaillocation,
    photographer_name,
    artist_name,
    image_url,
    thoughts,
    status,
    json_data
) VALUES (
    'contributor@julyarchive.org',
    'Old Auditorium, Townhall Rangpur',
    'Tanvir Ahmed',
    'DU Fine Arts Collective',
    'https://drive.google.com/file/d/sample-view-link/view',
    'Preserving the memory of students courage on 25 July.',
    'approved',
    '{
        "image": "/pictures/IMG_20260925_150215.png",
        "titleBn": "জেন জি একত্রিত",
        "titleEn": "United Gen Z",
        "detaillocation": "Old Auditorium, Townhall Rangpur",
        "division": "Rangpur",
        "district": "Rangpur",
        "upzila": "Rangpur Sadar",
        "datePainted": "Some Time in 2024",
        "dateCaptured": "25 September, 2026",
        "artist": "DU Fine Arts Collective",
        "descriptionBn": "জেন জি তরুণদের ঐক্যবদ্ধ প্রতিরোধ",
        "descriptionEn": "United Gen Z resistance mural",
        "slogan": "We Want Justice"
    }'::jsonb
) ON CONFLICT DO NOTHING;
