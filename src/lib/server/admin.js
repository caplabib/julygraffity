import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

/**
 * Helper to get the secret key securely from server environment.
 * Prevents unauthorized access in production if secret is omitted.
 */
export function getModeratorSecret() {
  const secret = env.MODERATOR_SECRET_KEY || process.env.MODERATOR_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 CRITICAL: MODERATOR_SECRET_KEY is not set in production environment variables! Moderator access is disabled.');
      return null;
    }
    console.warn('⚠️ Warning: MODERATOR_SECRET_KEY not set. Using local development fallback.');
    return 'july2024';
  }
  return secret;
}

/**
 * Generate a secure time-limited session token
 */
export function generateAdminToken(secret) {
  if (!secret) return null;
  const timestamp = Date.now();
  const signature = crypto.createHmac('sha256', secret).update(String(timestamp)).digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Verify a session token
 */
export function verifyAdminToken(token, secret) {
  if (!secret || !token || !token.includes('.')) return false;
  const [timestampStr, signature] = token.split('.');
  const timestamp = parseInt(timestampStr, 10);

  // Valid for 24 hours
  if (isNaN(timestamp) || Date.now() - timestamp > 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedSignature = crypto.createHmac('sha256', secret).update(String(timestamp)).digest('hex');
  if (signature.length !== expectedSignature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

