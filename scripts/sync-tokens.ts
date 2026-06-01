/**
 * Sync Design Tokens to CSS
 *
 * This script generates CSS variables from design-tokens.ts
 * Run with: npm run sync-tokens
 *
 * Reads hex values from design-tokens.ts, converts to HSL for Tailwind compatibility,
 * and outputs to globals.css format for copy/paste or review.
 */

import { colors, theme } from '../src/lib/design-tokens';

/**
 * Convert hex color to HSL string (without wrapper)
 * e.g., "#4FF2E3" -> "174 86% 63%"
 */
function hexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateCSS(): void {
  console.log('/*');
  console.log(' * CSS Variables generated from src/lib/design-tokens.ts');
  console.log(' * Copy this into the @layer base section of globals.css');
  console.log(' */\n');

  console.log(':root {');
  console.log('  /* Light Mode - from design-tokens.ts */');

  for (const [key, value] of Object.entries(theme.light)) {
    const cssVar = camelToKebab(key);
    const hsl = hexToHSL(value);
    console.log(`  --${cssVar}: ${hsl};`);
  }

  console.log('\n  /* Chart colors */');
  for (const [key, value] of Object.entries(colors.chart.light)) {
    console.log(`  --chart-${key}: ${hexToHSL(value)};`);
  }

  console.log('\n  --radius: 0.5rem;');
  console.log('}\n');

  console.log('.dark {');
  console.log('  /* Dark Mode - from design-tokens.ts */');

  for (const [key, value] of Object.entries(theme.dark)) {
    const cssVar = camelToKebab(key);
    const hsl = hexToHSL(value);
    console.log(`  --${cssVar}: ${hsl};`);
  }

  console.log('\n  /* Chart colors */');
  for (const [key, value] of Object.entries(colors.chart.dark)) {
    console.log(`  --chart-${key}: ${hexToHSL(value)};`);
  }

  console.log('}');
}

// Print the generated CSS
console.log('='.repeat(60));
console.log('SYNC TOKENS: design-tokens.ts -> CSS Variables');
console.log('='.repeat(60));
console.log('');
generateCSS();
console.log('');
console.log('='.repeat(60));
console.log('Copy the above into globals.css @layer base section');
console.log('='.repeat(60));
