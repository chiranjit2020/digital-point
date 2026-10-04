import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';
import { AppButton } from './AppButton';
import { Icon, type IconName } from './Icon';

// The website's 8 illustration tiles, in its left-to-right order. The site
// floats them on an arc around a CSS-drawn laptop; here they sit in a simple
// 4-column grid, which works on any screen width. All tiles share the theme
// blue with white icons (a deliberate change from the site's mixed colours).
const tileIcons: readonly IconName[] = [
  'clipboard-check',
  'file-document',
  'fingerprint',
  'bank',
  'ticket-confirmation',
  'printer',
  'train',
  'airplane',
];

const TILE_COLUMNS = 4;
const TILE_GAP = spacing.md;
const TILE_MAX = 88; // keep tiles from growing huge on tablets

// Web `<section class="hero">`.
export function Hero() {
  // Tile size is computed in dp rather than `width: '22%'` + `aspectRatio: 1`:
  // Yoga resolves aspectRatio unreliably for percentage widths in a wrapping
  // row, which left the tiles shorter than wide and the icons off-centre.
  const { width } = useWindowDimensions();
  const tileSize = Math.min(
    TILE_MAX,
    Math.floor((width - spacing.lg * 2 - TILE_GAP * (TILE_COLUMNS - 1)) / TILE_COLUMNS),
  );

  return (
    <View style={styles.section}>
      {/* `alignSelf: 'flex-start'` stops the badge stretching full width:
          children of a column stretch by default, unlike an inline-block span. */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DIGITAL SERVICE CENTRE</Text>
      </View>

      <Text style={styles.title} accessibilityRole="header">
        All Digital Services,{'\n'}One Place
      </Text>

      <Text style={styles.lead}>
        এক জায়গায় প্রয়োজনীয় বিভিন্ন Digital ও Online Service — সহজ, দ্রুত ও নির্ভরযোগ্যভাবে।
      </Text>

      <View style={styles.buttons}>
        {/* TODO(Phase 4): scroll to the Services / Contact sections. */}
        <AppButton label="Our Services" onPress={() => {}} style={styles.button} />
        <AppButton label="Contact Us" variant="outline" onPress={() => {}} style={styles.button} />
      </View>

      {/* Decorative, like the site's aria-hidden illustration: hidden from TalkBack. */}
      <View
        style={styles.tiles}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {tileIcons.map((icon) => (
          <View key={icon} style={[styles.tile, { width: tileSize, height: tileSize }]}>
            <Icon
              name={icon}
              color={colors.white}
              size={26}
              // RN transforms are an array of objects, not a CSS string.
              style={icon === 'airplane' ? styles.planeIcon : undefined}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.heroTint, // stands in for the site's radial + linear gradient
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primary2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.45, // CSS .04em → RN needs an absolute value in dp
  },
  title: {
    marginTop: 10,
    marginBottom: spacing.md,
    color: colors.heading,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 33, // CSS line-height 1.08 → RN needs an absolute value, not a multiplier
    letterSpacing: -0.75,
  },
  lead: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 26,
  },
  buttons: {
    flexDirection: 'row', // RN defaults to 'column'; the web defaults to 'row'
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: 22,
  },
  button: {
    flexGrow: 1,
    flexBasis: 140, // same as the site's `flex: 1 1 140px`
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TILE_GAP,
    marginTop: spacing.xl,
  },
  tile: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary2, // same blue as the badge and primary buttons
    boxShadow: '0 8px 18px rgba(11, 63, 168, 0.16)',
  },
  planeIcon: {
    transform: [{ rotate: '45deg' }],
  },
});
