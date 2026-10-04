import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../constants/theme';

type SectionHeadingProps = {
  title: string;
  /** Bengali/English subtitle, as on the website. */
  subtitle?: string;
};

// Web `<h2>` + `<p class="bn sub">`, used by every section on the Home screen.
export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 18,
  },
  title: {
    color: colors.heading,
    fontSize: 24, // the site's clamp(1.45rem, 5vw, 2rem) on a phone
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: -0.35,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
});
