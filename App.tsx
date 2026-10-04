import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Hero } from './components/Hero';
import { colors } from './constants/theme';

export default function App() {
  return (
    // Measures the device's status-bar / navigation-bar insets once, at the root.
    <SafeAreaProvider>
      {/* Pads its content by those insets so nothing is drawn under the system bars. */}
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right', 'bottom']}>
        {/* Unlike a web page, a View never scrolls: overflowing content is just cut off. */}
        <ScrollView contentContainerStyle={styles.content}>
          <Hero />
        </ScrollView>
      </SafeAreaView>
      {/* Dark icons for our light background. */}
      <StatusBar style="dark" />
    </SafeAreaProvider>
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
