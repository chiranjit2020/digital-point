import { StyleSheet, View } from 'react-native';

import type { Service, QuickService } from '../constants/services';
import { spacing } from '../constants/theme';
import { SectionHeading } from './SectionHeading';
import { ServiceCard } from './ServiceCard';

type ServiceSectionProps = {
  title: string;
  subtitle?: string;
  items: readonly (Service | QuickService)[];
  /** Light background band, the site's `.section-tint`. */
  tinted?: boolean;
};

// Used for both Quick Services and Our Services.
//
// The cards are rendered with .map(), not FlatList: 19 small items render
// instantly, and a FlatList nested in the Home ScrollView would lose its
// virtualization (and log a warning). FlatList is for hundreds of rows or
// lists that grow at runtime.
export function ServiceSection({ title, subtitle, items, tinted = false }: ServiceSectionProps) {
  return (
    <View style={[styles.section, tinted && styles.tinted]}>
      <SectionHeading title={title} subtitle={subtitle} />
      <View style={styles.list}>
        {items.map((item) => (
          <ServiceCard
            // A stable id, not the array index, so React can track each card.
            key={'id' in item ? item.id : item.serviceId}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  tinted: {
    backgroundColor: '#EAF0FD', // solid stand-in for the site's tint gradient
  },
  list: {
    gap: 14,
  },
});
