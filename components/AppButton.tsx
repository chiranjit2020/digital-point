import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius } from '../constants/theme';

type Variant = 'primary' | 'outline';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  /** Read by screen readers (TalkBack) instead of `label` when the label alone is unclear. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

// Web `.btn` + `.btn-pill` → Pressable. There is no :hover on a touch screen;
// `pressed` is the feedback state instead (the web's :active).
export function AppButton({
  label,
  onPress,
  variant = 'primary',
  accessibilityLabel,
  style,
}: AppButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      // `style` can be a function of the press state — like :active, but in JS.
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        pressed && (isPrimary ? styles.primaryPressed : styles.outlinePressed),
        style,
      ]}
    >
      {/* Text styles never inherit from a View: colour and weight must be set on the Text itself. */}
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelOutline]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50, // above Android's 48dp minimum touch target
    paddingHorizontal: 24,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    // The site uses a linear-gradient; RN has no built-in gradient, so a solid colour stands in.
    backgroundColor: colors.primary2,
    borderColor: 'transparent',
    boxShadow: '0 6px 16px rgba(15, 85, 216, 0.28)',
  },
  primaryPressed: {
    backgroundColor: colors.navy,
  },
  outline: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderColor: colors.primary2,
  },
  outlinePressed: {
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  labelPrimary: {
    color: colors.white,
  },
  labelOutline: {
    color: colors.primary,
  },
});
