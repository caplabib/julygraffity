import { createClient } from '@supabase/supabase-js';

const getEnv = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process && process.env && process.env[key]) {
    return process.env[key];
  }
  return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch murals from Supabase database and map database schema to frontend structure.
 */
export async function fetchMurals() {
  try {
    const { data, error } = await supabase
      .from('murals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch warning:', error.message || error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data.map((item) => ({
      id: item.id,
      image: item.image,
      titleBn: item.title_bn || item.titleBn || item.title_en || 'Mural',
      titleEn: item.title_en || item.titleEn || item.title_bn || 'Mural',
      location: item.location || '',
      district: item.district || '',
      upzila: item.upzila || '',
      category: item.category || 'General',
      datePainted: item.date_painted || item.datePainted || '',
      dateCaptured: item.date_captured || item.dateCaptured || '',
      artist: item.artist || 'Unknown',
      descriptionBn: item.description_bn || item.descriptionBn || '',
      descriptionEn: item.description_en || item.descriptionEn || '',
      slogan: item.slogan || '',
      likes: item.likes || 0,
      tags: item.tags || []
    }));
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err);
    return null;
  }
}
