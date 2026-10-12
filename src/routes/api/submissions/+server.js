import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
import { getModeratorSecret, verifyAdminToken } from '$lib/server/admin.js';

/**
 * GET /api/submissions
 * Fetch all submissions
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return json({ success: false, error: error.message }, { status: 400 });
    }

    return json({ success: true, data });
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

    const { data, error } = await supabase
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
