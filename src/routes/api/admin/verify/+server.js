import { json } from '@sveltejs/kit';
import crypto from 'node:crypto';
import { getModeratorSecret, generateAdminToken } from '$lib/server/admin.js';

/**
 * POST /api/admin/verify
 * Validates moderator passcode securely on the server
 */
export async function POST({ request }) {
  try {
    const { passcode } = await request.json();

    if (!passcode || typeof passcode !== 'string') {
      return json({ success: false, error: 'Passcode is required' }, { status: 400 });
    }

    const secret = getModeratorSecret();

    if (!secret) {
      return json({ success: false, error: 'Moderator access is not configured on this server.' }, { status: 503 });
    }

    // Constant-time comparison to prevent timing attacks
    const bufferA = Buffer.from(passcode.trim());
    const bufferB = Buffer.from(secret.trim());


    const isMatch = bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);

    if (!isMatch) {
      return json({ success: false, error: 'Invalid moderator passcode' }, { status: 401 });
    }

    const token = generateAdminToken(secret);
    return json({ success: true, token });
  } catch (err) {
    return json({ success: false, error: err.message || 'Verification failed' }, { status: 500 });
  }
}
