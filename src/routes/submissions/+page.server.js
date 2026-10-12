import { supabase } from '$lib/supabase.js';
import { dummySubmissions } from '../../../scripts/seed-submissions.js';

/**
 * Server Load function for /submissions
 * Derives submission data directly from the Supabase database table
 */
export async function load() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error in +page.server.js (using initial data):', error.message);
      // Return dummy submissions with generated IDs as fallback
      const initialWithIds = dummySubmissions.map((item, idx) => ({
        ...item,
        id: item.id || `sub-demo-${idx + 1}`
      }));
      return {
        submissions: initialWithIds,
        isLiveDb: false,
        dbError: error.message
      };
    }

    if (!data || data.length === 0) {
      const initialWithIds = dummySubmissions.map((item, idx) => ({
        ...item,
        id: item.id || `sub-demo-${idx + 1}`
      }));
      return {
        submissions: initialWithIds,
        isLiveDb: true,
        dbError: null
      };
    }

    return {
      submissions: data,
      isLiveDb: true,
      dbError: null
    };
  } catch (err) {
    console.error('Server load exception in submissions:', err);
    const initialWithIds = dummySubmissions.map((item, idx) => ({
      ...item,
      id: item.id || `sub-demo-${idx + 1}`
    }));
    return {
      submissions: initialWithIds,
      isLiveDb: false,
      dbError: err.message
    };
  }
}
