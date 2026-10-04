# Glossary

Mobile terms as they come up in this project, explained for a web developer. Alphabetical order.

**Adaptive icon.** Android 8+ launcher-icon format made of a **foreground** and a **background** layer, which each launcher masks into its own shape (circle, squircle, teardrop). Android 13+ also uses a **monochrome** layer for themed icons. Configured in `app.json` under `android.adaptiveIcon`. Unlike a favicon, it isn't one fixed image.

**`app.json`.** Expo's app configuration: name, version, icon, splash, orientation and platform-specific blocks. At build time Expo generates the native Android configuration (`AndroidManifest.xml`, Gradle settings) from it. Roughly the mobile equivalent of a web app manifest plus build config.

**Expo.** A framework and toolset on top of React Native. It provides an SDK of native modules, a CLI, config-driven native project generation, Expo Go for development, and EAS (cloud build/submit services).

**Expo Go.** A prebuilt app from the Play Store that can run any Expo project's JS bundle for development. It loads your code from Metro over the network. Limitation: only the native modules it already contains can be used, and it supports one Expo SDK version at a time.

**Expo SDK.** A versioned, tested set of Expo packages tied to one React Native and React version (SDK 57 = RN 0.86 + React 19.2). Upgrading means moving the whole set together.

**Fast Refresh.** React Native's hot reloading. On save, only the changed module is re-sent and re-rendered, and component state is kept. Like Vite HMR, but the "browser" is the phone.

**Hermes.** The JavaScript engine React Native uses on the device, built for mobile: fast startup and low memory. It plays the role V8 plays in Chrome.

**JS bundle.** All of the app's JavaScript (my code plus `node_modules`) combined by Metro into one file that the JS engine runs. In development it's served over HTTP. In a release build it's compiled to Hermes bytecode and embedded in the app.

**LTS (Long-Term Support).** A Node.js release line with an extended maintenance window. Even-numbered majors become LTS several months after release. Tools like Expo test against LTS releases.

**Metro.** React Native's JavaScript bundler and dev server (the equivalent of Vite or webpack). It transforms TypeScript/JSX, resolves modules, serves the bundle on port 8081 and drives Fast Refresh.

**Native module.** Code written in Kotlin/Java (Android) or Swift/Obj-C (iOS) that exposes device features (camera, haptics, secure storage) to JavaScript. It has to be compiled into the app binary, so it can't be added over Fast Refresh the way JS can.

**React Native.** A framework that uses React to build native mobile UIs. Components like `<View>` and `<Text>` become real platform views, not DOM elements, so there is no HTML, CSS cascade or browser.

**Slug.** The URL-friendly identifier of the project on Expo's services (`app.json` → `expo.slug`). It's not the Android application ID and is never shown to users.
