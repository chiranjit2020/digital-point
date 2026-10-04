import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Hero } from '../components/Hero';
import { colors } from '../constants/theme';

// Route "/" — the Home screen. The file name is the route: index.tsx → "/".
export default function HomeScreen() {
  return (
    // No native header on this screen, so this view pads for the status bar
    // and navigation bar itself.
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right', 'bottom']}>
      {/* Unlike a web page, a View never scrolls: overflowing content is just cut off. */}
      <ScrollView contentContainerStyle={styles.content}>
        <Hero />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // fill the whole screen; without it the View is only as tall as its content
    backgroundColor: colors.bg,
  },
  content: {
    flexGrow: 1,
  },
});
