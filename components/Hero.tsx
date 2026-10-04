import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';
import { AppButton } from './AppButton';

// Web `<section class="hero">`. The CSS-drawn laptop illustration is not
// ported yet; that decision is made in Phase 4.
export function Hero() {
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
});
