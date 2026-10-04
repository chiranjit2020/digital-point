import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { business, telUrl, whatsappUrl } from '../constants/business';
import { colors, radius, spacing } from '../constants/theme';
import { openLink } from '../utils/openLink';
import { AppButton } from './AppButton';
import { Icon } from './Icon';

// Below this width the brand plus two labelled buttons don't fit on one row.
const COMPACT_BELOW = 420;

// Web <header class="site-header">. The hamburger menu and anchor nav are
// not ported: on a phone, the page is one scroll plus contact buttons.
export function Header() {
  // The RN replacement for CSS media queries: the current window size in dp,
  // which updates on rotation or split-screen.
  const { width } = useWindowDimensions();
  const compact = width < COMPACT_BELOW;

  return (
    <View style={styles.header}>
      <View style={styles.brand} accessible accessibilityRole="header" accessibilityLabel={business.name}>
        <View style={styles.badge}>
          <Icon name="view-grid" color={colors.white} size={20} />
        </View>
        <Text style={styles.brandText} numberOfLines={1}>
          {business.name}
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          label="Call"
          accessibilityLabel={`Call ${business.name}`}
          icon="phone"
          size="sm"
          iconOnly={compact}
          onPress={() => openLink(telUrl(), 'No app on this device can make phone calls.')}
        />
        <AppButton
          label="WhatsApp"
          accessibilityLabel={`Message ${business.name} on WhatsApp`}
          icon="whatsapp"
          variant="whatsapp"
          size="sm"
          iconOnly={compact}
          onPress={() => openLink(whatsappUrl(), 'WhatsApp could not be opened.')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth, // thinnest line the screen can draw
    borderBottomColor: colors.border,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1, // let the brand give way (and truncate) before the buttons do
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primary2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    flexShrink: 1,
    color: colors.heading,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
