# Glossary

Mobile terms as they come up in this project, explained for a web developer. Alphabetical order.

**Adaptive icon.** Android 8+ launcher-icon format made of a **foreground** and a **background** layer, which each launcher masks into its own shape (circle, squircle, teardrop). Android 13+ also uses a **monochrome** layer for themed icons. Configured in `app.json` under `android.adaptiveIcon`. Unlike a favicon, it isn't one fixed image.

**`app.json`.** Expo's app configuration: name, version, icon, splash, orientation and platform-specific blocks. At build time Expo generates the native Android configuration (`AndroidManifest.xml`, Gradle settings) from it. Roughly the mobile equivalent of a web app manifest plus build config.

**Config plugin.** Code listed under `plugins` in `app.json` that modifies the generated native project (Android manifest, Gradle files) at build time. For example, Expo Router's plugin registers the URL scheme. It has no effect in Expo Go, which is already built.

**Deep link.** A URL that opens the app on a specific screen, e.g. `digitalpoint://privacy`. Expo Router makes every route deep-linkable automatically.

**dp (density-independent pixel).** The unit of every number in React Native styles. One dp is roughly one CSS px on a standard-density screen, so sizes look the same physically across phones with different pixel densities. There are no `rem`, `em` or `vw` units.

**Edge-to-edge.** Modern Android layout mode where the app draws across the whole screen, behind the status bar and the navigation/gesture bar. The app must pad its content using safe-area insets.

**Expo.** A framework and toolset on top of React Native. It provides an SDK of native modules, a CLI, config-driven native project generation, Expo Go for development, and EAS (cloud build/submit services).

**Expo Go.** A prebuilt app from the Play Store that can run any Expo project's JS bundle for development. It loads your code from Metro over the network. Limitation: only the native modules it already contains can be used, and it supports one Expo SDK version at a time.

**Expo SDK.** A versioned, tested set of Expo packages tied to one React Native and React version (SDK 57 = RN 0.86 + React 19.2). Upgrading means moving the whole set together.

**Fast Refresh.** React Native's hot reloading. On save, only the changed module is re-sent and re-rendered, and component state is kept. Like Vite HMR, but the "browser" is the phone.

**Hermes.** The JavaScript engine React Native uses on the device, built for mobile: fast startup and low memory. It plays the role V8 plays in Chrome.

**Insets.** The measured sizes (top, bottom, left, right, in dp) of the screen areas covered by system UI or cutouts on a specific device. Provided by `react-native-safe-area-context`.

**Intent filter.** An entry in `AndroidManifest.xml` declaring which URLs or actions an app can handle. Android uses it to route a deep link to the right app. Expo generates it from `scheme` in `app.json`.

**JS bundle.** All of the app's JavaScript (my code plus `node_modules`) combined by Metro into one file that the JS engine runs. In development it's served over HTTP. In a release build it's compiled to Hermes bytecode and embedded in the app.

**Layout (`_layout.tsx`).** An Expo Router file that wraps all routes in its folder, e.g. with a `<Stack>` navigator. Like a Next.js `layout.tsx`.

**LTS (Long-Term Support).** A Node.js release line with an extended maintenance window. Even-numbered majors become LTS several months after release. Tools like Expo test against LTS releases.

**Metro.** React Native's JavaScript bundler and dev server (the equivalent of Vite or webpack). It transforms TypeScript/JSX, resolves modules, serves the bundle on port 8081 and drives Fast Refresh.

**Native module.** Code written in Kotlin/Java (Android) or Swift/Obj-C (iOS) that exposes device features (camera, haptics, secure storage) to JavaScript. It has to be compiled into the app binary, so it can't be added over Fast Refresh the way JS can.

**Pressable.** React Native core component for anything touchable. It detects presses (`onPress`, `onLongPress`) and exposes a `pressed` state for visual feedback. There is no hover on touch screens.

**React Native.** A framework that uses React to build native mobile UIs. Components like `<View>` and `<Text>` become real platform views, not DOM elements, so there is no HTML, CSS cascade or browser.

**Route.** A screen addressed by a path. In Expo Router the file decides the path: `app/index.tsx` → `/`, `app/privacy.tsx` → `/privacy`.

**Safe area.** The part of the screen not covered by the status bar, navigation bar, notch or rounded corners. Content placed inside it is always visible and tappable.

**Scheme (URL scheme).** The app's custom URL prefix (`digitalpoint://`), set in `app.json`. Changing it after release breaks existing links.

**Slug.** The URL-friendly identifier of the project on Expo's services (`app.json` → `expo.slug`). It's not the Android application ID and is never shown to users.

**Stack navigator.** Navigation where screens pile up like cards. Pushing adds a screen on top, and Android Back pops it, revealing the previous screen with its state intact.

**StyleSheet.** React Native API (`StyleSheet.create`) for defining style objects next to a component. There are no selectors, cascade or specificity. Styles are combined with arrays: `[base, pressed && active]`.

**TalkBack.** Android's built-in screen reader. It reads `accessibilityRole`, `accessibilityLabel` and text content, which is why `Pressable` needs `accessibilityRole="button"`.
