# Learning log

My personal reference for moving from web development to React Native and Android. One entry per milestone, plus a log of every package and why it's there.

- [Milestone 1 — Project setup and first run on a real phone](#milestone-1--project-setup-and-first-run-on-a-real-phone-2026-10-04)
- [Milestone 2 — React Native fundamentals: the Hero section](#milestone-2--react-native-fundamentals-the-hero-section-2026-10-04)
- [Milestone 3 — Expo Router: file-based navigation](#milestone-3--expo-router-file-based-navigation-2026-10-04)
- [Milestone 4 — Header, icons, business data and Linking](#milestone-4--header-icons-business-data-and-linking-2026-10-04)
- [Package log](#package-log)

---

## Milestone 1 — Project setup and first run on a real phone (2026-10-04)

### What I learned

**1. A React Native app ships its own runtime.**
On the web, the browser is the runtime: it parses HTML, runs JS and paints the DOM. In React Native there is no browser. My TypeScript is bundled by **Metro** into one JS bundle, which runs on the **Hermes** JS engine inside a native Android app. `<View>` and `<Text>` aren't DOM nodes; React Native turns them into real Android views.

**2. How development mode works with Expo Go.**
```text
PC: npx expo start → Metro (port 8081) bundles my code
        │  HTTP over the LAN: exp://192.168.0.101:8081
        ▼
Phone: Expo Go (prebuilt native app from the Play Store)
        ├─ native half: already compiled, includes the Expo SDK's native modules
        └─ Hermes runs MY bundle → React Native draws native views
```
My code is **only JavaScript**. The native half is prebuilt inside Expo Go, which is why I don't need Java, Android Studio or Gradle yet. The limit is that I can only use native modules Expo Go already includes. A "development build" (later) removes that limit.

**3. Fast Refresh is HMR on a phone.**
Saving a file makes Metro rebuild just that module and push it to the phone. React re-renders and keeps component state. A full **Reload** restarts the JS engine, which is like a hard refresh.

**4. The dev menu is my DevTools.**
Shake the phone or press `m`. It has Reload, the element inspector (like "Inspect element"), the performance monitor (frame rate for **two** threads, UI and JS, where a browser tab has one) and React Native DevTools in Chrome.

**5. An Expo SDK is a matched set of versions.**
SDK 57 = React Native 0.86 + React 19.2, targeting Android SDK 36, running on Android 7 and later. Expo Go supports **one SDK at a time**, so the project and the phone's Expo Go must match. That's why `package.json` uses `~` ranges (patch updates only) and why packages are installed with `npx expo install`.

**6. Node version matters, and "newest" isn't "supported".**
Expo asks for an **LTS** Node. Node 26 was installed but wasn't LTS yet, so I switched to **Node 24.21.0 LTS** using nvm-windows.

**7. `npm audit` doesn't understand mobile projects.**
`npm install` reported 23 vulnerabilities, and `npm audit fix --force` suggested **downgrading Expo from 57 to 44**, which would break everything. Every flagged package (`braces`, `node-forge`, `uuid`) is **build tooling that runs on my PC** (Metro's file watcher, Expo's signing CLI, Xcode project tools). None of it ends up in the bundle that runs on the phone. npm can't tell which code runs on the device and which only runs at build time, so I have to.

**8. `app.json` is the app's manifest.**
At build time it becomes `AndroidManifest.xml` plus Gradle settings. Fields I met:
- `name`: launcher label (still `digital-point`; it will become "DIGITAL POINT").
- `slug`: identifier on Expo's servers.
- `version`: what users see.
- `orientation: "portrait"`: something a website can't do.
- `userInterfaceStyle`: forces light or dark mode.
- `android.adaptiveIcon`: Android 8+ icons are foreground and background layers cropped by each launcher, plus a monochrome layer for Android 13+ themed icons.
- `predictiveBackGestureEnabled`: the back-swipe preview on newer Android.
- There's no `android.package` (application ID) yet. That's a permanent decision for Phase 9.

### Why it matters
Knowing which layer runs where (PC tooling, JS bundle or native app) is how I'll debug everything later. A firewall problem, a JS error and a missing native module look similar on screen ("it doesn't work") but come from completely different layers.

### What changed
- Switched the machine's Node from 26.7.0 (MSI install) to 24.21.0 LTS (nvm-windows). Recorded in `.nvmrc`.
- Created the Expo project from the `blank-typescript` template: `App.tsx`, `index.ts`, `app.json`, `tsconfig.json`, `package.json`, `assets/`, `.gitignore`.
- Verified: `expo-doctor` 21/21, `tsc` 0 errors, the app runs on my phone, Fast Refresh works.
- Started git, this log, `README.md` and `docs/glossary.md`.

### Important commands
```bash
nvm install 24.21.0 && nvm use 24.21.0           # switch Node (admin terminal on Windows)
npx create-expo-app@latest <dir> --template blank-typescript --no-agents-md
npx expo start                                    # Metro dev server + QR code
npx expo install <package>                        # install at the SDK-compatible version
npx expo install --fix                            # realign deps to the SDK
npx expo-doctor                                   # project health check
npx tsc --noEmit                                  # type-check only
```

### Important terminology
Expo, Expo SDK, Expo Go, Metro, Hermes, JS bundle, Fast Refresh, `app.json`, slug, adaptive icon, native module, LTS. See [`docs/glossary.md`](docs/glossary.md).

### Common mistakes
- **`npm audit fix --force`** in an Expo project downgrades the SDK.
- **Using a non-LTS Node.** It may work, but you're outside what Expo tests against.
- **Mixing an MSI Node install with nvm-windows.** The MSI takes over `C:\Program Files\nodejs`, which nvm needs as its symlink, so `nvm use` silently does nothing.
- **`create-expo-app .` in a folder that isn't empty** is refused. Scaffold elsewhere and copy in, or start in an empty folder.
- **Phone can't connect:** different network, router client isolation, or Windows Firewall blocking `node.exe` (a new path after switching Node).
- **Expo Go / SDK mismatch:** "Project is incompatible with this version of Expo Go". Update Expo Go, or match the SDK.

---

## Milestone 2 — React Native fundamentals: the Hero section (2026-10-04)

### What I learned

**1. The web → React Native mapping, on real content.**

| Website | React Native | What's different |
|---|---|---|
| `<div>`, `<section>` | `<View>` | Flexbox is the only layout. The default is `flexDirection: 'column'` (the web's is `row`), and children stretch across by default |
| `<h1>`, `<p>`, `<span>` | `<Text>` | All text must be inside `<Text>`. Text styles **don't cascade** from a `View`, only from a parent `Text` |
| `<a class="btn">` | `<Pressable>` | No `:hover` on touch. `style={({ pressed }) => …}` is the `:active` equivalent |
| page scrolling | `<ScrollView>` | Nothing scrolls by default. Overflow is just cut off |
| `:root { --primary }` | `constants/theme.ts` | CSS variables → a typed object with `as const` |
| `.class` rules | `StyleSheet.create` | No selectors, no specificity. Combine styles with arrays: `[a, b, cond && c]` |

**2. Units: dp, not px or rem.** Every number is in **density-independent pixels**, so `16` looks the same physical size on any phone. There are no `rem`, `em`, `vw` or `%`-of-font. Conversions I made:
- `letter-spacing: .04em` at 11 dp becomes `letterSpacing: 0.45`.
- `line-height: 1.08` at 30 dp becomes `lineHeight: 33`. RN's `lineHeight` is an absolute value, never a multiplier.
- `clamp(1.85rem, 7.4vw, 3.1rem)` becomes a fixed `30`, the value it resolves to on a typical 360–412 dp phone.

**3. Edge-to-edge and safe areas.** Modern Android draws the app **behind** the status bar and the navigation/gesture bar. `react-native-safe-area-context` measures those **insets** on the actual device: `SafeAreaProvider` once at the root, then `SafeAreaView` (or `useSafeAreaInsets()`) to pad content. React Native's own `SafeAreaView` is deprecated and only ever worked on iOS.

**4. Some CSS has no built-in equivalent.**
- `linear-gradient` / `radial-gradient` → there's no built-in gradient, so I used solid colours for now. A package (`expo-linear-gradient`) would add one, but only if the look really needs it.
- `backdrop-filter: blur` → not ported.
- `box-shadow` → **is** supported. Modern RN (New Architecture) accepts CSS-style `boxShadow` strings on Android. Older RN only had `elevation`.
- `:hover` → doesn't exist on touch screens.

**5. Accessibility is opt-in metadata.** On the web, a `<button>` is already announced as a button. In RN, a `Pressable` is just a touchable box until I add `accessibilityRole="button"`, and a heading needs `accessibilityRole="header"`. TalkBack (Android's screen reader) reads these. Android also recommends touch targets of at least **48 dp**, so buttons are 50.

**6. System fonts are a working fallback, Bengali included.** Without loading any font, Android uses Roboto and falls back to its built-in Noto Bengali for the Bengali text. Custom fonts (Plus Jakarta Sans) are a Polish-phase decision, not a requirement for the text to render.

### Why it matters
Everything in the full Home screen is made of these same primitives. Getting the defaults wrong (column vs row, no cascade, no scroll, drawing under the status bar) produces bugs that look like "CSS weirdness" but come from React Native's different model.

### What changed
- Added `react-native-safe-area-context`.
- New `constants/theme.ts`, `components/AppButton.tsx` and `components/Hero.tsx`.
- `App.tsx` is now `SafeAreaProvider → SafeAreaView → ScrollView → Hero`, with a dark status bar.

### Important commands
```bash
npx expo install react-native-safe-area-context   # SDK-matched version (~5.7.0)
```
In the Metro terminal: `r` reloads, `m` opens the dev menu, `j` opens DevTools.

### Important terminology
Safe area, insets, edge-to-edge, dp, Pressable, `StyleSheet`, TalkBack. See [`docs/glossary.md`](docs/glossary.md).

### Common mistakes
- Putting text directly in a `View` (`<View>Hello</View>`) is a runtime error. It must be inside `<Text>`.
- Expecting `color` or `fontSize` on a `View` to style the `Text` inside it.
- Forgetting `flex: 1` on the root view, so it only takes the height of its content.
- Putting `flexGrow` on a `ScrollView`'s `style` instead of `contentContainerStyle`.
- Hard-coding a status-bar height. Insets differ per device and per navigation mode.
- Using React Native's `SafeAreaView` and expecting it to work on Android.

---

## Milestone 3 — Expo Router: file-based navigation (2026-10-04)

### What I learned

**1. Why screens need a navigator, not a `useState` switch.** Swapping components with state works visually, but on Android the Back button would **exit the app** instead of going back. There would also be no transitions and no deep links. A **stack navigator** handles all of that: screens pile up like cards, Back pops the top one, and the screen underneath stays mounted with its scroll position kept. On the bottom screen, Back leaves the app.

**2. Expo Router = Next.js-style routing on top of React Navigation.**
```text
app/_layout.tsx  → wraps every screen (holds <Stack>, StatusBar)   ≈ Next.js layout.tsx
app/index.tsx    → route "/"   (Home)
app/privacy.tsx  → route "/privacy" (Phase 5: created just by adding the file)
```
`package.json` `"main"` changed from `index.ts` to `expo-router/entry`. The router's entry finds `app/` and builds the routes, so `App.tsx` and `index.ts` were deleted. Expo Router also includes the `SafeAreaProvider` automatically.

**3. Stack vs tabs.** Tabs are for switching between top-level sections (like a bottom bar). A stack is for drilling in and coming back. Home → Privacy Policy is a drill-in, so it's a stack.

**4. Deep links and the URL scheme.** `"scheme": "digitalpoint"` in `app.json` registers a custom URL scheme with Android (an *intent filter* in `AndroidManifest.xml` at build time). In a real build, `digitalpoint://privacy` opens the app directly on that screen. Every file in `app/` is a deep-linkable route automatically. Changing the scheme later breaks links already shared.

**5. Typed routes catch broken links at compile time.** With `experiments.typedRoutes`, Expo generates types from the files in `app/`. I tested it: `router.push('/privcy')` gives `error TS2345`, and `'/'` compiles. The types are generated when Metro starts, into `.expo/types/` and `expo-env.d.ts` (both git-ignored). Expo added them to `tsconfig.json` `include`.

**6. Config plugins.** `npx expo install` added `"plugins": ["expo-router", "expo-status-bar"]` to `app.json`. A config plugin is code that **edits the generated native Android/iOS project at build time**. For example, the router's plugin adds the scheme's intent filter to the manifest. In Expo Go they do nothing, because Expo Go is already built. They take effect when we make our own APK.

**7. `react-native-screens` makes screens native.** Each route is a real Android screen container rather than a plain JS `View`. That gives native transitions, and screens that aren't visible use less memory.

**8. Changing the entry point needs a Metro restart.** Fast Refresh only swaps modules. A new `"main"` needs `npx expo start --clear`, otherwise Metro serves a cached graph that still points to `./App`.

### Why it matters
Navigation is where mobile differs most from the web. There's no URL bar and no browser history, and Back is a system button the app must handle. Getting it from the router means the Android Back button, transitions and deep links all behave like users expect, without writing any of that by hand.

### What changed
- Added `expo-router`, `react-native-screens`, `expo-linking` and `expo-constants`.
- `package.json`: `"main": "expo-router/entry"`.
- `app.json`: `scheme`, `plugins`, `experiments.typedRoutes`.
- `tsconfig.json`: `include` now covers the generated route types.
- New `app/_layout.tsx` (Stack; Home's native header hidden) and `app/index.tsx` (Home: SafeAreaView → ScrollView → Hero).
- Deleted `App.tsx` and `index.ts`. The phone looks identical, which was the goal.

### Important commands
```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npx expo start --clear     # after changing the entry point or app.json
```

### Important terminology
Route, layout, stack navigator, deep link, URL scheme, config plugin, intent filter. See [`docs/glossary.md`](docs/glossary.md).

### Common mistakes
- Leaving `"main": "index.ts"` (or a stale Metro cache) after adding the router gives "Unable to resolve ./App".
- Putting components (not screens) inside `app/`. **Every file there becomes a route.** Shared UI belongs in `components/`.
- Using `useState` to switch screens. Android Back closes the app.
- Committing `expo-env.d.ts` or `.expo/`. They're generated per machine.
- Expecting `app.json` plugin changes to show up in Expo Go. Plugins only affect real native builds.

---

## Milestone 4 — Header, icons, business data and Linking (2026-10-04)

### What I learned

**1. `Linking` hands URLs to Android.** On the web the browser handles `<a href="tel:…">`. In RN, `Linking.openURL(url)` asks Android which app handles that URL:
```text
tel:+918918669308                  → Phone dialer (number pre-filled; the user presses call)
https://wa.me/918918669308?text=…  → WhatsApp (or the browser if it's not installed)
```
- **No permission is needed.** Opening the dialer is different from *placing* a call (`CALL_PHONE`). The app still requests zero Android permissions.
- `openURL` returns a Promise that can reject (for example, a tablet with no dialer), so `utils/openLink.ts` catches it and shows a native `Alert`.
- Message text must be **percent-encoded** (`encodeURIComponent`). Newlines, emoji and Bengali would otherwise break the URL. Tested: the encoded link decodes back to the exact greeting.

**2. `useWindowDimensions()` replaces media queries.** There's no CSS, so there's no `@media`. The hook returns the window size in dp and re-renders when it changes (rotation, split-screen). The Header shows icon-only buttons below 420 dp. The visible label goes away, but `accessibilityLabel` keeps it for TalkBack.

**3. Yoga is not a browser.** React Native's layout engine (Yoga) implements flexbox, but not identically to CSS. `width: '22%'` + `aspectRatio: 1` inside a wrapping row produced tiles that were **shorter than they were wide, with the icons off-centre**. Yoga resolved the aspect ratio before the percentage width. Fix: compute a numeric size from `useWindowDimensions()`: `(screen − padding − gaps) / 4`. Lesson: when a layout looks wrong on the device, suspect a Yoga/CSS difference before suspecting the component.

**4. Icon fonts.** `@expo/vector-icons` draws icons as glyphs of a font, so they scale cleanly and take a `color`. One *set* = one font file. MaterialCommunityIcons is about 1.3 MB, the cost of one set covering every icon. A typed wrapper (`components/Icon.tsx`) means a misspelled icon name fails `tsc` (`vector-pen` didn't exist, so it's `fountain-pen-tip`). Decorative icons are hidden from TalkBack, the equivalent of `aria-hidden`.

**5. Typed data instead of positional arrays.** The website stored services as `[icon, class, title, desc]` arrays. Here they're `Service` objects in `constants/services.ts`, so the compiler checks every field. `QuickService` reuses the type with `Omit<Service, 'id'> & { serviceId }`.

**6. npm peer dependencies are a trap in RN projects, and warnings matter.** Three problems from Step 6 surfaced here, because I had **filtered out `npm warn` lines** and missed them:
- `react-dom` was auto-installed at **19.3.0** (npm's latest), but React is pinned to **19.2.3**. The next install failed with `ERESOLVE`. Fix: `npx expo install react-dom` → 19.2.3.
- `react-native-reanimated` / `react-native-worklets` were auto-installed at the latest versions (4.7.1 / 0.13.0) instead of the SDK's **4.5.1 / 0.10.1**. That's harmless in Expo Go (it has its own copies), but these are **native** modules that will be compiled into the APK. Pinned with `npx expo install`.
- `expo-doctor`: *"Native module peer dependencies must be installed directly"*. `@expo/vector-icons` needs `expo-font`. A native module only gets **autolinked** into a build if it's a direct dependency.

  The rule: **npm picks "latest that satisfies the range"; Expo needs "the version tested with this SDK".** Always use `npx expo install`, and read every `npm warn` line.

**7. Hit slop.** `hitSlop` enlarges a `Pressable`'s touch area beyond its visible edges. The 40 dp header buttons get +4 dp on each side, which makes the 48 dp minimum touch target.

### Why it matters
Contact actions are the app's whole purpose: a shop app where Call and WhatsApp don't work is useless. The dependency lesson matters even more for Phase 8. In Expo Go, wrong native versions are invisible. In a real build, they cause Gradle failures that are hard to trace back to a peer dependency npm installed quietly weeks earlier.

### What changed
- Added `@expo/vector-icons`, `react-dom` (pinned), `expo-font`, `react-native-reanimated` and `react-native-worklets` (pinned). `app.json` gained the `expo-font` config plugin.
- New: `components/Icon.tsx`, `components/Header.tsx`, `constants/business.ts`, `constants/services.ts`, `utils/openLink.ts`.
- `AppButton`: `icon`, `iconOnly`, `size="sm"`, `whatsapp` variant, default `accessibilityLabel`, `hitSlop`.
- `Hero`: 4 × 2 tile grid with computed tile size, all tiles theme blue (#0F55D8) with white icons for consistency (the website mixes colours). `app/index.tsx`: fixed Header above the ScrollView.
- Verified on the phone: Call opens the dialer with the number, WhatsApp opens a chat with the greeting pre-filled, and the tiles are square with centred icons.

### Important commands
```bash
npx expo install <pkg>    # always, for anything in an Expo project
npm ls <pkg>              # who depends on it, and is it "invalid"?
npx expo-doctor           # catches missing native peer dependencies
```

### Icon mapping (Bootstrap Icons → MaterialCommunityIcons)
| Website | App |
|---|---|
| `file-earmark-text-fill` (form fill-up) | `file-document-edit` |
| `fingerprint` | `fingerprint` |
| `person-badge-fill` (voter) | `card-account-details` |
| `file-earmark-ruled-fill` (ration) | `file-table` |
| `mortarboard-fill` | `school` |
| `house-door-fill` (land) | `home-city` |
| `printer-fill` | `printer` |
| `person-square` (photo) | `account-box` |
| `train-front-fill` / `airplane-fill` | `train` / `airplane` |
| `easel2-fill` (banner) | `bulletin-board` |
| `postcard-fill` (business card) | `card-account-mail` |
| `vector-pen` (logo) | `fountain-pen-tip` |
| `display` / `grid-fill` | `monitor` / `view-grid` |
| `telephone-fill` / `whatsapp` | `phone` / `whatsapp` |

### Important terminology
Linking, `useWindowDimensions`, Yoga, hit slop, peer dependency, autolinking. See [`docs/glossary.md`](docs/glossary.md).

### Common mistakes
- Filtering or skimming `npm warn` output. `ERESOLVE overriding peer dependency` is a real problem waiting to surface.
- Using `npm install` instead of `npx expo install`, which gets npm's latest version, not the SDK-tested one.
- Fixing `ERESOLVE` with `--legacy-peer-deps`. That hides the mismatch instead of fixing it.
- Relying on `%` width + `aspectRatio` in wrapping rows.
- Requesting `CALL_PHONE` just to open the dialer. `tel:` needs no permission.
- Building `wa.me` links without `encodeURIComponent`.

---

## Package log

Template packages from `create-expo-app --template blank-typescript`. I didn't add any of my own in this milestone.

### `expo` (~57.0.26)
- **Purpose:** the Expo SDK. It includes the `expo` CLI (`expo start`), `registerRootComponent`, the native module system, config plugins (which turn `app.json` into native config) and the version set for SDK 57.
- **Why we needed it:** it's the platform the whole project is built on.
- **Why not bare React Native:** bare RN means maintaining the `android/` Gradle project by hand from day one and running Android Studio for every build. Expo generates the native project from config, adds Expo Go for development, and offers EAS for cloud builds.
- **What it adds:** CLI, Metro config, runtime glue. Some of it runs only on the PC (CLI and tooling); some ships in the app (module system).

### `react` (19.2.3)
- **Purpose:** the component model: JSX, hooks, reconciliation.
- **Why we needed it:** React Native *is* React with a different renderer.
- **Why not an alternative:** no alternative; it's required by `react-native`. The exact version is pinned by the SDK.
- **What it adds:** the same React I know from the web. Only the host components (`View` instead of `div`) change.

### `react-native` (0.86.3)
- **Purpose:** the native renderer and the core components (`View`, `Text`, `Image`, `Pressable`, `ScrollView`, `StyleSheet`) plus core APIs (`Linking`, `Platform`, `Dimensions`).
- **Why we needed it:** it's what turns React components into Android views.
- **Why not an alternative:** this is the framework choice itself (versus Flutter, Kotlin or a PWA), made in Phase 1.
- **What it adds:** the native runtime and Hermes. This is most of the app's binary size.

### `expo-status-bar` (~57.0.1)
- **Purpose:** controls the Android status bar's text and icon style (`light`, `dark`, `auto`) from JSX.
- **Why we needed it:** the template uses it. The status bar sits *over* my app, so its icons must stay readable against my colours.
- **Why not built-in:** React Native's own `<StatusBar>` works too. `expo-status-bar` has simpler defaults (`auto` follows the colour scheme) and is already in Expo Go. **I'll review whether to keep it in the polish phase.**
- **What it adds:** a tiny JS wrapper. Its native part is already in Expo Go.

### `typescript` (~6.0.3, dev)
- **Purpose:** the type checker (`tsc --noEmit`).
- **Why we needed it:** the project is TypeScript throughout, and typed data (business info, services) catches mistakes before they reach the phone.
- **Why not an alternative:** Metro (via Babel) only **strips** types and never **checks** them. Without `tsc`, type errors would go unnoticed.
- **What it adds:** nothing to the app. It's dev-only and never shipped.

### `@types/react` (~19.2.2, dev)
- **Purpose:** TypeScript type definitions for React.
- **Why we needed it:** `react` itself ships no `.d.ts` types. React Native includes its own.
- **Why not an alternative:** none needed; it's the standard type package.
- **What it adds:** nothing to the app. It's dev-only.

### `react-native-safe-area-context` (~5.7.0)
- **Purpose:** reports the device's safe-area insets (status bar, navigation/gesture bar, display cutouts) and provides `SafeAreaProvider`, `SafeAreaView` and `useSafeAreaInsets()`.
- **Why we needed it:** with edge-to-edge, Android draws the app behind the system bars, so content must be padded by the real, per-device insets.
- **Why not built-in:** React Native's `SafeAreaView` is deprecated and iOS-only. Hard-coded padding is wrong on most devices. Expo's docs recommend this library, and Expo Router needs it anyway as a peer dependency.
- **What it adds:** a small native module (already included in Expo Go) and a JS API. Installed with `npx expo install` so the version matches SDK 57.

### `expo-router` (~57.0.24)
- **Purpose:** file-based navigation. Files in `app/` become routes. Provides layouts, `<Stack>`, `<Link>`, `router.push()`, automatic deep links and typed routes.
- **Why we needed it:** the app has two screens, and Android needs real stack navigation (Back button, transitions, deep links).
- **Why not the alternatives:** a `useState` screen switch breaks Android Back and has no deep links. Plain React Navigation works, but every screen and link must be configured by hand. Expo Router is built on React Navigation and is Expo's recommended approach.
- **What it adds:** the app's entry point (`expo-router/entry`), React Navigation underneath, and a config plugin that registers the URL scheme in native builds.

### `react-native-screens` (~4.26.0)
- **Purpose:** renders each navigator screen as a native Android screen container instead of a plain `View`.
- **Why we needed it:** a required peer dependency of Expo Router / React Navigation.
- **Why not built-in:** without it, every screen in the stack stays a fully mounted and drawn JS view, with no native transitions and more memory use.
- **What it adds:** a native module (already in Expo Go).

### `expo-linking` (~57.0.11)
- **Purpose:** creates and parses app URLs (`digitalpoint://privacy`) and maps them to routes.
- **Why we needed it:** a required peer dependency of Expo Router (deep linking).
- **Why not built-in:** RN's `Linking` can open URLs, but Expo Router relies on this wrapper for URL creation and parsing. We'll still use `Linking.openURL` for phone, WhatsApp and maps in Phase 4.
- **What it adds:** a small module (already in Expo Go).

### `expo-constants` (~57.0.20)
- **Purpose:** exposes `app.json` config and device/runtime constants to JavaScript.
- **Why we needed it:** a required peer dependency of Expo Router (it reads values like `scheme` at runtime).
- **Why not built-in:** `app.json` values aren't available to JS without it.
- **What it adds:** a small module (already in Expo Go).

### `@expo/vector-icons` (^15.0.2)
- **Purpose:** icon sets drawn as font glyphs. We use one set, `MaterialCommunityIcons`, through `components/Icon.tsx`.
- **Why we needed it:** about 25 icons (services, phone, WhatsApp, the hero tiles) that need to be colourable and sharp at any density.
- **Why not the alternatives:** RN has no icon set. PNGs would mean ~25 icons × 3 densities to manage. Exact Bootstrap SVGs would need `react-native-svg` plus ~25 hand-made components.
- **What it adds:** JS components plus one font per set used (MaterialCommunityIcons ≈ 1.3 MB). The fonts are already inside Expo Go.

### `expo-font` (~57.0.4)
- **Purpose:** loads font files at runtime, and through its config plugin can embed fonts at build time.
- **Why we needed it:** a required **native** peer dependency of `@expo/vector-icons` (it loads the icon font). `expo-doctor` flagged it: native peers must be direct dependencies to be autolinked into a real build.
- **Why not built-in:** RN can't load arbitrary font files at runtime by itself.
- **What it adds:** a native module (already in Expo Go) and the `expo-font` config plugin in `app.json`. We'll also use it for Plus Jakarta Sans in the Polish phase.

### `react-dom` (19.2.3)
- **Purpose:** React's **browser** renderer.
- **Why we needed it:** never for Android. Expo Router's web-only modules declare it as a peer, so npm auto-installed it at **19.3.0**, which conflicts with React 19.2.3 (`ERESOLVE`). Pinning it to match React fixes the tree.
- **Why not `--legacy-peer-deps`:** that hides the mismatch rather than fixing it.
- **What it adds:** nothing to the Android app. Metro only bundles what the `android` platform imports.

### `react-native-reanimated` (4.5.1) and `react-native-worklets` (0.10.1)
- **Purpose:** high-performance animations running on the UI thread (reanimated), and the engine that runs JS "worklets" there (worklets).
- **Why we needed them:** we don't use them directly. Expo Router's `react-native-drawer-layout` needs reanimated, so npm auto-installed both at the **latest** versions (4.7.1 / 0.13.0), which `npm ls` reported as `invalid` against SDK 57.
- **Why pin them:** they're **native** modules, so they get compiled into the APK whether or not our code imports them. Pinning to the SDK-tested versions avoids Gradle and runtime surprises in Phase 8.
- **What it adds:** native code in the build. Their JS isn't in our bundle until something imports them. Node prints a harmless `DEP0151` deprecation notice about worklets' `package.json` during installs; it's packaging metadata, not an app problem.
