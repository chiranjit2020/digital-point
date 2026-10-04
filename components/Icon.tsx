import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ComponentProps } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

// The union of every valid icon name, taken from the library's own props.
// A misspelled name is a compile error, just like typed routes.
export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type IconProps = {
  name: IconName;
  color: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

// The only file that knows which icon set we use, so swapping sets later is a one-file change.
// Icons are decorative here (labels carry the meaning), so they're hidden from TalkBack,
// the equivalent of aria-hidden="true" on the website's <i class="bi …">.
export function Icon({ name, color, size = 20, style }: IconProps) {
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      size={size}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
