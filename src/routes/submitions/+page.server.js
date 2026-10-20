import { redirect } from '@sveltejs/kit';

/**
 * Clean HTTP 301 redirect for legacy/misspelled /submitions route
 */
export function load() {
  redirect(301, '/submissions');
}
