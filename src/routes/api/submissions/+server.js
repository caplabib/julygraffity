import { json } from '@sveltejs/kit';
import { env as privateEnv } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { supabase as defaultClient } from '$lib/supabase.js';
import { getModeratorSecret, verifyAdminToken } from '$lib/server/admin.js';

function getDatabaseClient() {
  const serviceKey = privateEnv.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = privateEnv.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (serviceKey && url) {
    return createClient(url, serviceKey, { auth: { persistSession: false } });
  }
  return defaultClient;
}

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'Protected Email';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user.slice(0, 2)}***${user.slice(-1)}@${domain}`;
}

/**
 * GET /api/submissions
 * Fetch all submissions (masks private emails and drive links for public requests)
 */
export async function GET({ request }) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const secret = getModeratorSecret();
    const isAuthorized = token ? verifyAdminToken(token, secret) : false;

    const client = getDatabaseClient();
    const { data, error } = await client
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return json({ success: false, error: error.message }, { status: 400 });
    }

    if (!data) {
      return json({ success: true, data: [] });
    }

    if (isAuthorized) {
      return json({ success: true, data });
    }

    // Mask for public requests
    const sanitized = data.map((item) => {
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
    });

    return json({ success: true, data: sanitized });
  } catch (err) {
    return json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * PATCH /api/submissions
 * Update submission status or admin notes in backend
 * Requires authorization token
 */
export async function PATCH({ request }) {
  try {
    const authHeader = request.headers.get('authorization');
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const body = await request.json();
    const { id, status, adminNotes, adminToken } = body;

    const token = tokenFromHeader || adminToken;
    const secret = getModeratorSecret();

    if (!token || !verifyAdminToken(token, secret)) {
      return json({ success: false, error: 'Unauthorized: Valid moderator credentials required' }, { status: 401 });
    }

    if (!id) {
      return json({ success: false, error: 'Missing submission ID' }, { status: 400 });
    }

    const updates = {
      updated_at: new Date().toISOString()
    };
    if (status) updates.status = status;
    if (typeof adminNotes !== 'undefined') updates.admin_notes = adminNotes;

    const client = getDatabaseClient();
    const { data, error } = await client
      .from('submissions')
      .update(updates)
      .eq('id', id)
      .select();


    if (error) {
      return json({ success: false, error: error.message }, { status: 400 });
    }

    return json({ success: true, data: data?.[0] });
  } catch (err) {
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
