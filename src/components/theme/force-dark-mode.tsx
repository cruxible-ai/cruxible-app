'use client';

import { useLayoutEffect } from 'react';

/**
 * Forces dark mode on the html element and localStorage.
 * Use this in layouts that should always be dark (e.g., marketing pages).
 * Uses MutationObserver to keep dark mode even if ThemeProvider tries to change it.
 * Also sets localStorage so components using useTheme() detect dark mode.
 */
export function ForceDarkMode() {
  // Use useLayoutEffect to run before paint
  useLayoutEffect(() => {
    const root = document.documentElement;

    // Save previous theme to restore on unmount
    const previousTheme = localStorage.getItem('theme');

    const forceDark = () => {
      if (!root.classList.contains('dark')) {
        root.classList.remove('light');
        root.classList.add('dark');
      }
    };

    // Force dark immediately
    forceDark();

    // Set localStorage so ThemeProvider/useTheme detects dark mode
    localStorage.setItem('theme', 'dark');

    // Dispatch storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', { key: 'theme', newValue: 'dark' }));

    // Watch for changes and re-apply dark mode
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          forceDark();
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      // Restore previous theme on unmount
      if (previousTheme) {
        localStorage.setItem('theme', previousTheme);
      } else {
        localStorage.removeItem('theme');
      }
    };
  }, []);

  return null;
}
