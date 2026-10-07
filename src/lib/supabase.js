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
      tags: item.tags || [],
      heroLandscape: item['hero-landscape'] ?? item['hero_landscape'] ?? item.heroLandscape ?? item['hero-landscapes'] ?? item['hero_landscapes'] ?? null,
      heroPortraits: item['hero-portraits'] ?? item['hero_portraits'] ?? item.heroPortraits ?? item['hero-portrait'] ?? item['hero_portrait'] ?? item.heroPortrait ?? null
    }));
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err);
    return null;
  }
}

/**
 * Fetch hero murals from graffitybackup1 table.
 */
export async function fetchHeroMurals() {
  try {
    const { data, error } = await supabase
      .from('graffitybackup1')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase hero fetch warning:', error.message || error);
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
      slogan: item.slogan || '',
      heroLandscape: item['hero-landscape'] ?? item['hero_landscape'] ?? item.heroLandscape ?? item['hero-landscapes'] ?? item['hero_landscapes'] ?? null,
      heroPortraits: item['hero-portraits'] ?? item['hero_portraits'] ?? item.heroPortraits ?? item['hero-portrait'] ?? item['hero_portrait'] ?? item.heroPortrait ?? null
    }));
  } catch (err) {
    console.error('Failed to fetch hero murals from Supabase:', err);
    return null;
  }
}

/**
 * Fetch contributors directory from Supabase
 */
export async function fetchContributors() {
  try {
    const { data, error } = await supabase
      .from('contributors')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      roleBn: item.role_bn || item.roleBn || '',
      category: item.category,
      location: item.location,
      contributions: item.contributions,
      icon: item.icon || '/icons/person.svg',
      badge: item.badge || 'Contributor'
    }));
  } catch (err) {
    console.error('Failed to fetch contributors from Supabase:', err);
    return null;
  }
}

/**
 * Fetch team members for the Team Section from Supabase
 */
export async function fetchTeamMembers() {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      location: item.location,
      icon: item.icon || '/icons/person.svg',
      roleGroup: item.role_group || item.roleGroup || 'developers'
    }));
  } catch (err) {
    console.error('Failed to fetch team members from Supabase:', err);
    return null;
  }
}

/**
 * Fetch contributor statistics from Supabase
 */
export async function fetchContributorStats() {
  try {
    const { data, error } = await supabase
      .from('contributor_stats')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((item) => ({
      label: item.label,
      value: item.value,
      labelBn: item.label_bn || item.labelBn || ''
    }));
  } catch (err) {
    console.error('Failed to fetch contributor stats from Supabase:', err);
    return null;
  }
}

