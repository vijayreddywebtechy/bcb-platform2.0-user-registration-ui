'use client';

import { useState, useCallback, useEffect } from 'react';
import { lsGet, lsSet, lsRemove } from '@/lib/utils/localStorage';
import type { LocalStorageKey } from '@/lib/constants/localStorageKeys';

/**
 * React hook for type-safe localStorage access.
 *
 * - SSR-safe: initialises with `initialValue` during server render,
 *   then hydrates from localStorage after mount.
 * - Listens to `storage` events so changes made in other browser tabs
 *   are reflected in the current tab.
 *
 * @example
 * const [step, setStep, removeStep] = useLocalStorage<number>(
 *   LocalStorageKeys.REGISTRATION_STEP, 1
 * );
 */
export function useLocalStorage<T>(
  key: LocalStorageKey,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Hydrate from localStorage after first render (client-only)
  useEffect(() => {
    const existing = lsGet<T>(key);
    if (existing !== null) {
      setStoredValue(existing);
    }
  // Only run on mount — key is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for changes made from other tabs / windows
  useEffect(() => {
    function onStorageEvent(e: StorageEvent) {
      if (e.key !== key) return;
      if (e.newValue === null) {
        setStoredValue(initialValue);
      } else {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          setStoredValue(initialValue);
        }
      }
    }

    window.addEventListener('storage', onStorageEvent);
    return () => window.removeEventListener('storage', onStorageEvent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function'
          ? (value as (prev: T) => T)(prev)
          : value;
        lsSet(key, next);
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    lsRemove(key);
    setStoredValue(initialValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, removeValue];
}
