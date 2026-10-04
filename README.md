# DIGITAL POINT — Android app

A small, native Android app for a local digital-services shop, built with **React Native + Expo + TypeScript**.

This is a **learning project**: an experienced web developer rebuilding an existing static website as a real mobile app (native components, no WebView), and documenting each step in [`LEARNING.md`](LEARNING.md). The app is meant to end as a working, installable Android build. It **will not be published** to Google Play; Play publishing is covered as concepts only.

## Status

| Phase | State |
|---|---|
| 0–1 Website audit and mobile architecture | ✅ Done |
| 2 Expo project initialized, runs on a physical Android phone (Expo Go) | ✅ Done |
| 3 React Native fundamentals (Hero section, safe areas) | ✅ Done |
| Expo Router (file-based stack navigation) | ✅ Done |
| 4–7 Full Home screen, Privacy Policy screen, polish, device testing | ⏳ Next |
| 8 Installable APK | ⏳ Not yet |
| 9 Production configuration (application ID, versioning, signing) | ⏳ Not yet |

Planned app: two screens. **Home** has every section in one scroll and an enquiry that opens WhatsApp with a pre-filled message. **Privacy Policy** is the second screen, reached through stack navigation. The app sends nothing over the network itself and collects no personal data.

## Stack

| Layer | Choice | Version |
|---|---|---|
| Runtime / SDK | Expo | SDK 57 |
| UI framework | React Native | 0.86 |
| UI library | React | 19.2 |
| Language | TypeScript (strict) | 6.0 |
| JS engine on device | Hermes | bundled with RN |
| Navigation | Expo Router (stack, typed routes) | 57 |
| Dev bundler | Metro | bundled with Expo |
| Node (dev machine) | Node.js LTS | 24.21.0 (see `.nvmrc`) |

Every dependency, and why it's there, is listed in [`LEARNING.md`](LEARNING.md#package-log).

## Prerequisites

- **Node.js 24 LTS.** Expo asks for an LTS release. On Windows with nvm-windows: `nvm install 24.21.0` then `nvm use 24.21.0` (nvm-windows does not read `.nvmrc` automatically).
- **An Android phone with [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)** that supports **SDK 57**, on the **same network** as the dev machine.
- No Java, Android Studio or Gradle is needed for development with Expo Go.

## Run on Android (development)

```bash
npm install
npx expo start
```

Then open **Expo Go → Scan QR code** and scan the code in the terminal. You can also enter `exp://<your-PC-LAN-IP>:8081` by hand. Saving a file updates the phone within about a second (Fast Refresh). Shake the phone, or press `m` in the terminal, to open the dev menu.

**If the phone can't connect:**
- The phone and PC must be on the same network, and the router must not isolate Wi-Fi clients.
- Windows Firewall must allow `node.exe` (with nvm it's under `%APPDATA%\nvm\v24.21.0\`), including on a "Public" network profile.
- If Expo Go says the project is incompatible, update Expo Go.

## Checks

```bash
npx tsc --noEmit     # type-check
npx expo-doctor      # Expo SDK / dependency compatibility
```

Lint and tests will be added in later phases.

## Project structure

```text
.
├── app/             routes: every file here is a screen (Expo Router)
│   ├── _layout.tsx  root layout: Stack navigator + status bar
│   └── index.tsx    "/" Home screen
├── components/      reusable UI (AppButton, Hero) — not routes
├── constants/       theme.ts: colours, radius, spacing from the website's CSS
├── app.json         Expo app config → becomes the Android manifest/Gradle config at build time
├── assets/          app icon, adaptive-icon layers, splash image (Expo placeholders)
├── docs/glossary.md mobile terminology
├── LEARNING.md      learning log + package log
├── tsconfig.json
└── package.json
```

`/android` and `/ios` are **generated** from `app.json` when needed ("prebuild") and are git-ignored. So are `.expo/` and `expo-env.d.ts`, which Metro generates (typed-route definitions).

The app registers the URL scheme `digitalpoint://` (deep links to any route in a native build).

After changing `app.json` or the entry point, restart Metro with `npx expo start --clear`.

## Builds: APK vs AAB (Phases 8–9 — not yet)

- **APK**: an installable Android package. Used to put the app directly on a device. This project's end goal (Phase 8).
- **AAB** (Android App Bundle): the upload format Google Play requires. Play generates per-device APKs from it. Covered as a concept only, because this app won't be published.

Build, EAS and signing instructions will be added here when those phases are reached. They'll be checked against current Expo docs, not written from memory.

## Important warnings

- **Never commit signing keys** (`*.jks`, `*.keystore`, `*.p12`, `*.key`, `*.pem`) or service-account JSON. `.gitignore` already blocks the common ones.
- **Don't run `npm audit fix --force`.** It "fixes" build-tool advisories by downgrading Expo by several major versions. Use `npx expo install --fix` instead.
- **Install packages with `npx expo install <pkg>`** rather than plain `npm install`, so versions match the Expo SDK.
- No environment variables or secrets are used. The app needs none.
