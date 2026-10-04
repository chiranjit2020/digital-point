import { BlurTargetView } from 'expo-blur';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ServiceSection } from '../components/ServiceSection';
import { quickServices, services } from '../constants/services';
import { colors } from '../constants/theme';

// Route "/" — the Home screen. The file name is the route: index.tsx → "/".
export default function HomeScreen() {
  // A ref to the native view the header blurs, like useRef on a DOM node.
  const blurTargetRef = useRef<View>(null);
  // The header floats over the page, so the content needs top padding equal to
  // its height. The height depends on font size, so it's measured, not hard-coded.
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    // No native header on this screen, so this view pads for the status bar
    // and navigation bar itself.
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.body}>
        {/* Android can only blur an explicitly marked source view: everything
            inside BlurTargetView is what the header shows, blurred. */}
        <BlurTargetView ref={blurTargetRef} style={styles.body}>
          {/* Unlike a web page, a View never scrolls: overflowing content is just cut off. */}
          <ScrollView contentContainerStyle={[styles.content, { paddingTop: headerHeight }]}>
            <Hero />
            <ServiceSection
              title="Quick Services"
              subtitle="আপনার প্রয়োজনীয় জনপ্রিয় পরিষেবাগুলো এক নজরে দেখুন।"
              items={quickServices}
            />
            <ServiceSection
              title="Our Services"
              subtitle="আপনার প্রয়োজন অনুযায়ী বিভিন্ন Digital, Online ও Design Service পাওয়া যায়।"
              items={services}
              tinted
            />
          </ScrollView>
        </BlurTargetView>

        {/* Rendered after (= on top of) the scroll content, pinned to the top.
            It must sit outside the BlurTargetView it blurs. */}
        <Header
          blurTarget={blurTargetRef}
          onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
          style={styles.headerOverlay}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // fill the whole screen; without it the View is only as tall as its content
    backgroundColor: colors.bg,
  },
  body: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  headerOverlay: {
    // Like CSS position: absolute; later siblings draw on top (no z-index needed).
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
