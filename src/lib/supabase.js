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
 * Fetch graffiti from Supabase database and map database schema to frontend structure.
 */
export async function fetchGraffiti() {
  try {
    const { data, error } = await supabase
      .from('graffities')
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
      titleBn: item.title_bn || item.titleBn || item.title_en || 'Graffiti',
      titleEn: item.title_en || item.titleEn || item.title_bn || 'Graffiti',
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
 * Fetch hero graffiti from graffitybackup1 table.
 */
export async function fetchHeroGraffiti() {
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
      titleBn: item.title_bn || item.titleBn || item.title_en || 'Graffiti',
      titleEn: item.title_en || item.titleEn || item.title_bn || 'Graffiti',
      location: item.location || '',
      district: item.district || '',
      slogan: item.slogan || '',
      heroLandscape: item['hero-landscape'] ?? item['hero_landscape'] ?? item.heroLandscape ?? item['hero-landscapes'] ?? item['hero_landscapes'] ?? null,
      heroPortraits: item['hero-portraits'] ?? item['hero_portraits'] ?? item.heroPortraits ?? item['hero-portrait'] ?? item['hero_portrait'] ?? item.heroPortrait ?? null
    }));
  } catch (err) {
    console.error('Failed to fetch hero graffiti from Supabase:', err);
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

/**
 * Helper to get local cached submissions (for offline resilience and fallback)
 */
function getLocalSubmissions() {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem('july_graffiti_submissions');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Helper to save local cached submissions
 */
function saveLocalSubmissions(submissions) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem('july_graffiti_submissions', JSON.stringify(submissions));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

/**
 * Submit a graffiti to Supabase submissions table
 */
export async function submitGraffitiToSupabase(payload) {
  const row = {
    email: payload.email,
    detaillocation: payload.detaillocation || payload.location,
    photographer_name: payload.photographerName || 'Anonymous',
    artist_name: payload.artistName || 'Unknown',
    image_url: payload.imageUrl || payload.image,
    thoughts: payload.thoughts || '',
    json_data: payload.jsonData || payload.json_data || null,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('submissions')
      .insert([row])
      .select();

    if (error) {
      console.warn('Supabase insert warning (falling back to local cache):', error.message || error);
      // Fallback: save to localStorage with synthetic ID
      const fallbackItem = { ...row, id: 'local-' + Date.now(), isLocal: true };
      const localList = getLocalSubmissions();
      saveLocalSubmissions([fallbackItem, ...localList]);
      return { data: [fallbackItem], error: null, isFallback: true };
    }

    if (data && data[0]) {
      // Also cache in local list
      const localList = getLocalSubmissions();
      saveLocalSubmissions([data[0], ...localList]);
      return { data, error: null, isFallback: false };
    }

    return { data, error: null, isFallback: false };
  } catch (err) {
    console.error('Failed to submit graffiti to Supabase:', err);
    // Save to local storage on error
    const fallbackItem = { ...row, id: 'local-' + Date.now(), isLocal: true };
    const localList = getLocalSubmissions();
    saveLocalSubmissions([fallbackItem, ...localList]);
    return { data: [fallbackItem], error: null, isFallback: true };
  }
}

/**
 * Fetch all submissions from Supabase (for the /submissions status page)
 */
export async function fetchSubmissionsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase submissions query warning:', error.message || error);
      const localList = getLocalSubmissions();
      return { data: localList, error: error.message };
    }

    if (!data || data.length === 0) {
      const localList = getLocalSubmissions();
      return { data: localList, error: null };
    }

    // Merge with any local offline ones if any
    const localList = getLocalSubmissions();
    const existingIds = new Set(data.map((d) => d.id));
    const merged = [...data];
    localList.forEach((item) => {
      if (!existingIds.has(item.id)) {
        merged.push(item);
      }
    });

    return { data: merged, error: null };
  } catch (err) {
    console.error('Failed to fetch submissions:', err);
    const localList = getLocalSubmissions();
    return { data: localList, error: err.message };
  }
}

/**
 * Update submission status or admin notes in Supabase
 */
export async function updateSubmissionInSupabase(id, { status, adminNotes }) {
  const updates = {
    updated_at: new Date().toISOString()
  };
  if (status) updates.status = status;
  if (typeof adminNotes !== 'undefined') updates.admin_notes = adminNotes;

  try {
    if (String(id).startsWith('local-')) {
      // Update local storage directly
      const localList = getLocalSubmissions();
      const updated = localList.map((item) => (item.id === id ? { ...item, ...updates } : item));
      saveLocalSubmissions(updated);
      return { data: updated.find((i) => i.id === id), error: null };
    }

    const { data, error } = await supabase
      .from('submissions')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.warn('Supabase update warning:', error.message || error);
      // Fallback update in local storage
      const localList = getLocalSubmissions();
      const updated = localList.map((item) => (item.id === id ? { ...item, ...updates } : item));
      saveLocalSubmissions(updated);
      return { data: null, error: error.message };
    }

    // Also update local storage cache
    const localList = getLocalSubmissions();
    const updated = localList.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveLocalSubmissions(updated);

    return { data: data ? data[0] : null, error: null };
  } catch (err) {
    console.error('Failed to update submission:', err);
    return { data: null, error: err.message };
  }
}


