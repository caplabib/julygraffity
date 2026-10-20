import { supabase } from '$lib/supabase.js';
import { dummySubmissions } from '$lib/data/dummySubmissions.js';

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'Protected Email';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user.slice(0, 2)}***${user.slice(-1)}@${domain}`;
}

function sanitizeSubmission(item) {
  const copy = { ...item };
  copy.email = maskEmail(copy.email);
  copy.image_url = '[Protected link - Visible to moderators only]';
  if (copy.json_data && typeof copy.json_data === 'object') {
    const jsonCopy = { ...copy.json_data };
    if (jsonCopy.image) jsonCopy.image = '[Protected link]';
    if (jsonCopy.image_url) jsonCopy.image_url = '[Protected link]';
    if (jsonCopy.email) jsonCopy.email = maskEmail(jsonCopy.email);
    copy.json_data = jsonCopy;
  }
  return copy;
}

/**
 * Server Load function for /submissions
 * Derives submission data directly from the Supabase database table
 * and sanitizes sensitive user information for public delivery.
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
      })).map(sanitizeSubmission);
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
      })).map(sanitizeSubmission);
      return {
        submissions: initialWithIds,
        isLiveDb: true,
        dbError: null
      };
    }

    return {
      submissions: data.map(sanitizeSubmission),
      isLiveDb: true,
      dbError: null
    };
  } catch (err) {
    console.error('Server load exception in submissions:', err);
    const initialWithIds = dummySubmissions.map((item, idx) => ({
      ...item,
      id: item.id || `sub-demo-${idx + 1}`
    })).map(sanitizeSubmission);
    return {
      submissions: initialWithIds,
      isLiveDb: false,
      dbError: err.message
    };
  }
}
