import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

/**
 * Helper to get the secret key securely from server environment
 */
export function getModeratorSecret() {
  return env.MODERATOR_SECRET_KEY || process.env.MODERATOR_SECRET_KEY || 'july2024';
}

/**
 * Generate a secure time-limited session token
 */
export function generateAdminToken(secret) {
  const timestamp = Date.now();
  const signature = crypto.createHmac('sha256', secret).update(String(timestamp)).digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Verify a session token
 */
export function verifyAdminToken(token, secret) {
  if (!token || !token.includes('.')) return false;
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
