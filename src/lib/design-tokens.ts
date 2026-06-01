/**
 * Design Tokens - Single source of truth for the Cruxible design system.
 *
 * USAGE:
 * - Modify colors here, they propagate to Tailwind + CSS variables
 * - All spacing/sizing uses a consistent 4px base unit
 * - Typography follows a modular scale (1.25 ratio)
 *
 * To update colors across the app:
 * 1. Change values in the `colors` object below
 * 2. Run: npm run sync-tokens (generates CSS from these values)
 *
 * The CSS variables in globals.css are generated from these tokens.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

/**
 * Brand Colors
 * These define the core identity. Change these to rebrand.
 */
export const colors = {
  // Primary brand color
  primary: '#14B8A6',        // Teal - primary accent, CTAs

  // Neutral palette
  neutral: {
    white: '#FFFFFF',        // Pure white - cards, surfaces
    50: '#FAFAF9',           // Lightest - subtle backgrounds
    100: '#F8F6F2',          // Warm White - main light background
    200: '#E5E0D5',          // Slightly darker - secondary, muted, accent
    300: '#D4CFC4',          // Light borders
    400: '#A4A6AA',          // Cool Steel - muted text, icons
    500: '#71717A',          // Medium gray
    600: '#52525B',          // Dark gray text
    700: '#3F3F46',          // Darker elements
    800: '#1A1B1D',          // Carbon Black - dark mode bg
    900: '#0F0F10',          // Onyx - darkest, text on light
    950: '#09090B',          // Near black
  },

  // Semantic colors
  semantic: {
    success: '#22C55E',      // Emerald
    warning: '#FFE66D',      // Warm Yellow
    error: '#FF6B6B',        // Coral Red
    info: '#4FF2E3',         // Neon Ice
  },

  // Chart colors (for data visualization)
  chart: {
    light: {
      1: '#4FF2E3',            // Neon Ice
      2: '#22C55E',            // Emerald
      3: '#FFE66D',            // Warm Yellow
      4: '#FF6B6B',            // Coral Red
      5: '#A78BFA',            // Violet
      6: '#F472B6',            // Pink
    },
    dark: {
      1: '#4FF2E3',            // Neon Ice
      2: '#22C55E',            // Emerald
      3: '#FFE66D',            // Warm Yellow
      4: '#E94848',            // Mid-tone Red (matches destructive)
      5: '#A78BFA',            // Violet
      6: '#F472B6',            // Pink
    },
  },
} as const;

/**
 * Theme Configuration
 * Maps semantic roles to actual colors from the palette above.
 * This is what generates the CSS variables.
 */
export const theme = {
  light: {
    background: colors.neutral[100],       // Warm White
    foreground: colors.neutral[900],       // Onyx
    card: colors.neutral.white,            // White
    cardForeground: colors.neutral[900],
    popover: colors.neutral.white,
    popoverForeground: colors.neutral[900],
    primary: colors.primary,               // Neon Ice
    primaryForeground: colors.neutral[900],
    secondary: colors.neutral[200],
    secondaryForeground: colors.neutral[900],
    muted: colors.neutral[200],
    mutedForeground: colors.neutral[400],  // Cool Steel
    accent: colors.neutral[200],
    accentForeground: colors.neutral[900],
    destructive: colors.semantic.error,
    destructiveForeground: colors.neutral.white,
    success: colors.semantic.success,
    successForeground: colors.neutral.white,
    warning: colors.semantic.warning,
    warningForeground: colors.neutral[900],
    border: colors.neutral[300],
    input: colors.neutral[300],
    ring: colors.primary,
  },
  dark: {
    background: colors.neutral[800],       // Carbon Black
    foreground: colors.neutral[50],
    card: colors.neutral[900],             // Onyx
    cardForeground: colors.neutral[50],
    popover: colors.neutral[900],
    popoverForeground: colors.neutral[50],
    primary: colors.primary,               // Neon Ice
    primaryForeground: colors.neutral[900],
    secondary: colors.neutral[700],
    secondaryForeground: colors.neutral[50],
    muted: colors.neutral[700],
    mutedForeground: colors.neutral[400],
    accent: colors.neutral[700],
    accentForeground: colors.neutral[50],
    destructive: '#E94848',                  // Mid-tone red (dark mode)
    destructiveForeground: colors.neutral.white,
    success: colors.semantic.success,
    successForeground: colors.neutral.white,
    warning: colors.semantic.warning,
    warningForeground: colors.neutral[900],
    border: colors.neutral[700],
    input: colors.neutral[700],
    ring: colors.primary,
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

/**
 * Font Families
 */
export const fonts = {
  sans: ['Roboto Flex', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
} as const;

/**
 * Font Sizes - Modular scale (base 16px, ratio 1.25)
 * Each step is 1.25x the previous
 */
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
} as const;

/**
 * Font Weights - Using Roboto Flex variable font
 */
export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Line Heights
 */
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

/**
 * Letter Spacing
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// =============================================================================
// SPACING
// =============================================================================

/**
 * Spacing Scale - Based on 4px unit
 * Usage: padding, margin, gap
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  3.5: '0.875rem',    // 14px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  7: '1.75rem',       // 28px
  8: '2rem',          // 32px
  9: '2.25rem',       // 36px
  10: '2.5rem',       // 40px
  11: '2.75rem',      // 44px
  12: '3rem',         // 48px
  14: '3.5rem',       // 56px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  28: '7rem',         // 112px
  32: '8rem',         // 128px
} as const;

// =============================================================================
// BORDERS & RADII
// =============================================================================

/**
 * Border Radius
 */
export const borderRadius = {
  none: '0',
  sm: '0.25rem',      // 4px
  DEFAULT: '0.5rem',  // 8px
  md: '0.5rem',       // 8px
  lg: '0.75rem',      // 12px
  xl: '1rem',         // 16px
  '2xl': '1.5rem',    // 24px
  full: '9999px',
} as const;

/**
 * Border Width
 */
export const borderWidth = {
  DEFAULT: '1px',
  0: '0',
  2: '2px',
  4: '4px',
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

/**
 * Box Shadows
 */
export const boxShadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================

/**
 * Transition Durations
 */
export const transitionDuration = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

/**
 * Transition Timing Functions
 */
export const transitionTimingFunction = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

/**
 * Responsive Breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// Z-INDEX
// =============================================================================

/**
 * Z-Index Scale
 */
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// =============================================================================
// COMPONENT TOKENS
// =============================================================================

/**
 * Component-specific tokens
 * These define consistent sizing for specific component types
 */
export const components = {
  // Button sizes
  button: {
    sm: { height: '2rem', px: '0.75rem', fontSize: '0.875rem' },
    md: { height: '2.5rem', px: '1rem', fontSize: '0.875rem' },
    lg: { height: '3rem', px: '1.5rem', fontSize: '1rem' },
  },

  // Input sizes
  input: {
    sm: { height: '2rem', px: '0.75rem', fontSize: '0.875rem' },
    md: { height: '2.5rem', px: '0.75rem', fontSize: '0.875rem' },
    lg: { height: '3rem', px: '1rem', fontSize: '1rem' },
  },

  // Card variants
  card: {
    padding: { sm: '1rem', md: '1.5rem', lg: '2rem' },
    radius: '0.75rem',
  },

  // Badge sizes
  badge: {
    sm: { height: '1.25rem', px: '0.5rem', fontSize: '0.75rem' },
    md: { height: '1.5rem', px: '0.625rem', fontSize: '0.75rem' },
    lg: { height: '1.75rem', px: '0.75rem', fontSize: '0.875rem' },
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Convert hex to HSL values for CSS variables
 */
export function hexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

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

/**
 * Generate CSS variables from theme config
 * This outputs the HSL values needed for globals.css
 */
export function generateCSSVariables() {
  const convertTheme = (themeConfig: typeof theme.light | typeof theme.dark) => ({
    '--background': hexToHSL(themeConfig.background),
    '--foreground': hexToHSL(themeConfig.foreground),
    '--card': hexToHSL(themeConfig.card),
    '--card-foreground': hexToHSL(themeConfig.cardForeground),
    '--popover': hexToHSL(themeConfig.popover),
    '--popover-foreground': hexToHSL(themeConfig.popoverForeground),
    '--primary': hexToHSL(themeConfig.primary),
    '--primary-foreground': hexToHSL(themeConfig.primaryForeground),
    '--secondary': hexToHSL(themeConfig.secondary),
    '--secondary-foreground': hexToHSL(themeConfig.secondaryForeground),
    '--muted': hexToHSL(themeConfig.muted),
    '--muted-foreground': hexToHSL(themeConfig.mutedForeground),
    '--accent': hexToHSL(themeConfig.accent),
    '--accent-foreground': hexToHSL(themeConfig.accentForeground),
    '--destructive': hexToHSL(themeConfig.destructive),
    '--destructive-foreground': hexToHSL(themeConfig.destructiveForeground),
    '--success': hexToHSL(themeConfig.success),
    '--success-foreground': hexToHSL(themeConfig.successForeground),
    '--warning': hexToHSL(themeConfig.warning),
    '--warning-foreground': hexToHSL(themeConfig.warningForeground),
    '--border': hexToHSL(themeConfig.border),
    '--input': hexToHSL(themeConfig.input),
    '--ring': hexToHSL(themeConfig.ring),
  });

  return {
    light: convertTheme(theme.light),
    dark: convertTheme(theme.dark),
  };
}

/**
 * Print CSS variables for copy/paste into globals.css
 * Run: npx ts-node -e "import { printCSSVariables } from './src/lib/design-tokens'; printCSSVariables()"
 */
export function printCSSVariables() {
  const vars = generateCSSVariables();

  console.log('/* Light mode - paste into :root */');
  for (const [key, value] of Object.entries(vars.light)) {
    console.log(`    ${key}: ${value};`);
  }

  console.log('\n/* Dark mode - paste into .dark */');
  for (const [key, value] of Object.entries(vars.dark)) {
    console.log(`    ${key}: ${value};`);
  }
}
