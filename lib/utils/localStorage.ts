import type { LocalStorageKey } from '@/lib/constants/localStorageKeys';

/**
 * SSR-safe check — localStorage is only available in the browser.
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Read and deserialise a value from localStorage.
 * Returns `null` when:
 *  - running server-side
 *  - key is not present
 *  - stored value fails JSON.parse
 */
export function lsGet<T>(key: LocalStorageKey): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Serialise and store a value in localStorage.
 * No-ops silently when running server-side or when storage is unavailable.
 */
export function lsSet<T>(key: LocalStorageKey, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently ignore quota exceeded or private-mode restrictions
  }
}

/**
 * Remove a single key from localStorage.
 */
export function lsRemove(key: LocalStorageKey): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // no-op
  }
}

/**
 * Remove multiple keys in a single call.
 */
export function lsRemoveMany(keys: LocalStorageKey[]): void {
  keys.forEach(lsRemove);
}

/**
 * Clear all BCB-prefixed keys from localStorage.
 * Leaves any third-party keys untouched.
 */
export function lsClearSession(): void {
  if (!isBrowser()) return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith('bcb.')) keysToRemove.push(key);
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // no-op
  }
}
