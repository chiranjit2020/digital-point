# Learning log

My personal reference for moving from web development to React Native and Android. One entry per milestone, plus a log of every package and why it's there.

- [Milestone 1 — Project setup and first run on a real phone](#milestone-1--project-setup-and-first-run-on-a-real-phone-2026-10-04)
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
