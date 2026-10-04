import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius } from '../constants/theme';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'outline' | 'whatsapp';
type Size = 'md' | 'sm';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Visually show only the icon. `label` is still read by TalkBack. */
  iconOnly?: boolean;
  /** Read by screen readers (TalkBack) instead of `label` when the label alone is unclear. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const variants = {
  primary: { bg: colors.primary2, pressedBg: colors.navy, border: 'transparent', text: colors.white },
  outline: { bg: 'rgba(255, 255, 255, 0.55)', pressedBg: colors.white, border: colors.primary2, text: colors.primary },
  whatsapp: { bg: colors.green, pressedBg: colors.greenDark, border: 'transparent', text: colors.white },
} as const;

// Web `.btn` → Pressable. There is no :hover on a touch screen;
// `pressed` is the feedback state instead (the web's :active).
export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconOnly = false,
  accessibilityLabel,
  style,
}: AppButtonProps) {
  const v = variants[variant];
  const small = size === 'sm';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      // Extends the touchable area beyond the visible edges, so small buttons
      // still meet Android's 48dp minimum touch target.
      hitSlop={small ? 4 : 0}
      // `style` can be a function of the press state — like :active, but in JS.
      style={({ pressed }) => [
        styles.base,
        small ? styles.sm : styles.md,
        iconOnly && styles.iconOnly,
        { backgroundColor: pressed ? v.pressedBg : v.bg, borderColor: v.border },
        variant !== 'outline' && styles.shadow,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && <Icon name={icon} color={v.text} size={small ? 18 : 20} />}
        {/* Text styles never inherit from a View: colour and weight must be set on the Text itself. */}
        {!iconOnly && (
          <Text style={[styles.label, small && styles.labelSm, { color: v.text }]}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  md: {
    minHeight: 50, // above Android's 48dp minimum touch target
    paddingHorizontal: 24,
  },
  sm: {
    minHeight: 40, // + 4dp hitSlop on each side = 48dp touch target
    paddingHorizontal: 14,
  },
  iconOnly: {
    width: 40,
    paddingHorizontal: 0,
  },
  shadow: {
    // The site uses gradients + coloured shadows; RN has no built-in gradient,
    // so solid colours stand in. boxShadow is supported on modern RN.
    boxShadow: '0 6px 16px rgba(15, 85, 216, 0.22)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  labelSm: {
    fontSize: 14,
  },
});
