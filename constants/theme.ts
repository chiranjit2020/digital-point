// Design tokens, taken from the reference website's CSS `:root` variables.
// `as const` makes every value a literal type, so a typo like `colors.primry`
// is a compile error rather than a silently `undefined` style.

export const colors = {
  primary: '#0B3FA8',
  primary2: '#0F55D8',
  navy: '#0A2E7A',
  heading: '#0A2E7A',
  green: '#15A34A',
  greenDark: '#11843C',
  orange: '#F97316',
  purple: '#6D3FD6',
  text: '#1B2540',
  muted: '#55627A',
  border: 'rgba(15, 85, 216, 0.12)',
  bg: '#F3F7FE',
  heroTint: '#EAF1FE',
  white: '#FFFFFF',
  error: '#C0262D',
} as const;

// All sizes are in dp (density-independent pixels), not CSS px or rem.
export const radius = {
  sm: 10,
  md: 14,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;
