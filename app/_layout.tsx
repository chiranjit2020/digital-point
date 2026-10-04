import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../constants/theme';

// Root layout: wraps every route in app/. Expo Router already provides the
// SafeAreaProvider, so it isn't added here (it was in the old App.tsx).
export default function RootLayout() {
  return (
    <>
      {/* A stack navigator: each pushed route sits on top of the previous one,
          and Android Back pops it. Screens are discovered from the files in app/. */}
      <Stack screenOptions={{ contentStyle: { backgroundColor: colors.bg } }}>
        {/* Home draws its own header (Phase 4), so hide the native one. */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
