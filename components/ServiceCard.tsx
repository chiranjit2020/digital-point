import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../constants/theme';
import { Icon, type IconName } from './Icon';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: IconName;
};

// Web `.svc` card. Display-only for now; it becomes tappable (open the
// enquiry with this service pre-selected) in Step 10.
export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    // `accessible` groups the card so TalkBack reads it as one item
    // ("Aadhaar Services, Aadhaar card-এর …") instead of two separate texts.
    <View style={styles.card} accessible>
      <View style={styles.iconCircle}>
        {/* One theme blue for every icon (a deliberate change from the site's mixed colours). */}
        <Icon name={icon} color={colors.primary2} size={26} />
      </View>
      {/* flex: 1 lets the text column take the remaining width and wrap,
          instead of pushing past the card's edge. */}
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: radius.md,
    // The site's frosted glass (backdrop-filter: blur) has no built-in RN
    // equivalent: semi-opaque white + border + shadow approximates it.
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(15, 85, 216, 0.1)',
    boxShadow: '0 8px 28px rgba(16, 60, 150, 0.08), 0 1px 2px rgba(16, 60, 150, 0.06)',
    // No fixed height: the card grows with the user's system font size.
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27, // half the size → a circle (CSS border-radius: 50%)
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 6px 16px rgba(16, 60, 150, 0.12)',
  },
  text: {
    flex: 1,
  },
  title: {
    color: colors.heading,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 21,
  },
});
