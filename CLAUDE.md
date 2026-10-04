# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

An Expo SDK 57 project (Node 24 LTS) runs on a physical Android phone through Expo Go. Expo Router is set up: `app/_layout.tsx` (Stack, Home's native header hidden) and `app/index.tsx` (Home: a ScrollView with `Hero` + two `ServiceSection`s inside an `expo-blur` `BlurTargetView`, and a frosted `Header` absolutely positioned on top; content `paddingTop` = the header height measured with `onLayout`). Shared UI is in `components/` (`AppButton`, `Header`, `Hero`, `Icon`, `SectionHeading`, `ServiceCard`, `ServiceSection`). Data is in `constants/` (`business.ts` holds contact data and URL helpers, `services.ts` the typed service list, `theme.ts` design tokens), and `utils/openLink.ts` wraps `Linking.openURL` with an alert on failure. Icons use `@expo/vector-icons` MaterialCommunityIcons, and only through `components/Icon.tsx`.

Phase 4 decisions (2026-10-04): brand mark = text "DIGITAL POINT" + icon badge (no image logo); hero illustration = 4×2 tile grid; contact phone/WhatsApp = the developer's own number (+91 8918669308, intentionally public), address and map = placeholders. User style choices (2026-10-04): all icons and hero tiles in theme blue `#0F55D8`; service titles not numbered; no trailing `।` on card descriptions; blur only on the header (`blurMethod="dimezisBlurViewSdk31Plus"`), not the cards. Lists use `.map()`, not FlatList, which is fine for about 20 items. Remaining Phase 4 steps: 9 price/why/CTA + sticky bar → 10 enquiry→WhatsApp form → 11 map/footer + hero scroll-to-section. Every file in `app/` becomes a route, so put non-screen components in `components/`. The URL scheme is `digitalpoint` and typed routes are on.

`MASTER-PROMPT.md` is the full specification and working agreement for this project. It stays local and is git-ignored because it names the original site's owner. Read it before taking any action if it is present. This file summarizes the parts that matter in every session.

## What this project is

A **learning project**: rebuild an existing small-business website (the product reference) as a native Android app using **React Native + Expo + TypeScript** (Expo Router for navigation, EAS Build/Submit for Android binaries and Google Play). The user is an experienced web developer (HTML/CSS/JS, React, PHP, WordPress, REST, PWA) who is new to mobile. Teach the mobile-specific concepts, not general programming.

- Product reference (read-only, do not embed): an existing static PWA site built by the user for a student (plain HTML/CSS/JS, a Web3Forms enquiry form, Bootstrap Icons, Google Fonts).
- The user's own repo for this app: https://github.com/chiranjit2020/digital-point.git
- Scope: about two screens (the website's two main pages) with simple stack navigation. Do not expand the product.

## Decisions already made (Phase 1, 2026-10-04)

- **Branding:** the app is the generic **"DIGITAL POINT"**. Never use the original owner's name or GitHub username, the original brand prefix, or the original site URL in code, text, links, or WhatsApp message templates.
- **Screens:** Home (all sections in one scroll) + Privacy Policy, using a stack navigator.
- **Enquiry:** WhatsApp only. The app builds a pre-filled `wa.me` message and sends nothing over the network (no Web3Forms), so it collects no personal data.
- **Visit-date field:** dropped, so no date-picker package.
- **No Google Play release.** It's a learning project. Stop at a working, installable Android build. Explain AAB, signing and Play concepts only for understanding, and don't do any Play Console or EAS Submit work.
- Business contact data (phone, address, hours, map coordinates, social links) lives in one file (`constants/business.ts`) so it's easy to replace.

## Mandatory working protocol

The user runs Claude with `--dangerously-skip-permissions` and relies on Claude to enforce its own boundary:

**STOP → EXPLAIN → WAIT FOR APPROVAL → BUILD → VERIFY → TEACH**

- Before any step that changes the project (creating files, installing packages, editing config, building, configuring EAS, app ID, versioning, icons, splash, permissions, Play Console work, commits), output a `## STEP N — [NAME]` block with these sections: *What we are building*, *Why we need it*, *What will change* (files), *Packages* (a table of Package / Why / Why not built-in, or "No new package is required for this step."), *Mobile concept*, *Commands*, *Expected result*, *Risks / trade-offs*. Then **stop and wait** for explicit approval.
- Reading files, searching, `git status`, type-checking, linting and running tests need no approval.
- If a better approach comes up mid-step, stop and explain it before switching.
- User keywords: "Explain" means explain without changing anything. "Why?" means give the engineering reasoning. "Continue" means do only the next step already explained. "Don't install that" means don't install it and offer alternatives.
- On errors, don't patch blindly. Say what failed, why, and which layer caused it (React / RN / Expo / dependency / Android / Gradle / config / device / network / EAS). Then give options, the chosen fix, and verification.
- The first session must only audit the source repo and propose the architecture (Phase 0–1). Don't create files or install anything before approval.

## Engineering constraints

- **No WebView wrapper.** The UI must be real RN components (`View`, `Text`, `Image`, `Pressable`, `ScrollView`, `StyleSheet`).
- **Keep dependencies minimal.** Each package must solve a real problem. Avoid Redux, Zustand, React Query, NativeWind, Firebase, Supabase, backends, auth and databases unless the requirements actually call for them. Use `useState`, `useEffect` and Context for state.
- Proportional architecture: no giant screen component, but no 50-component abstraction or "architecture theatre" either.
- TypeScript throughout. Avoid `any`.
- Use native linking APIs for phone, email, maps and external links. Request no Android permissions unless they're truly needed, and justify each one.
- **Android application ID** (reverse-domain, e.g. `com.example.app`) is permanent once published. Not chosen yet; it's decided with the user in Phase 9, before any production config.
- Explain every field touched in `app.json`/`app.config.ts`, `eas.json`, `package.json` and `tsconfig.json`.
- Never commit keystores, service-account JSON, private keys, passwords or tokens. Stop and explain before any Google service-account setup.
- Check Expo SDK, EAS, Android target SDK and Play Console requirements (e.g. the closed-testing rule of 12 testers for 14 days) against current official docs instead of memory. Say so when the docs contradict earlier assumptions.
- For Play Console data-safety or policy answers, ask the user and show the evidence. Never pick a value by assumption.

## Documentation the project must maintain

- `README.md`: purpose, stack, setup, running on Android, APK vs AAB builds, EAS config, Play publishing, warnings.
- `LEARNING.md`: a per-milestone log (what I learned, why it matters, what changed, commands, terminology, common mistakes) plus an entry for **every installed package** (purpose, why needed, why not the alternative, what it adds).
- `docs/glossary.md`: add new mobile terms as they appear. Other `docs/*.md` files only when they add understanding.

## Phase roadmap

0 Audit ✅ → 1 Architecture ✅ → 2 Expo init ✅ (incl. first run on device via Expo Go) → 3 RN fundamentals ✅ (Hero section + Expo Router migration) → 4 Home screen (must work on Android before moving on) → 5 Privacy screen + navigation → 6 Polish → 7 Device testing → 8 Installable APK → 9 Production config (app ID, version, signing explained). Phases 10–15 (AAB upload, Play Console, testing tracks, release) are out of scope because the app won't be published. Cover them as concepts only.

## Commits

Use conventional commits (`chore: initialize Expo application`, `feat: add home screen`, `fix: correct Android safe-area layout`, …). Explain what a significant commit represents before making it.

## Commands

Node **24.21.0 LTS** via nvm-windows (`nvm use 24.21.0`; recorded in `.nvmrc`, which nvm-windows does not read automatically).

```bash
npx expo start        # Metro dev server; scan the QR code with Expo Go (same Wi-Fi)
npx expo start --clear  # required after changing app.json or the entry point
npx tsc --noEmit      # type-check
npx expo-doctor       # Expo SDK / dependency compatibility check
npx expo install <pkg>  # install a package at the version matching the Expo SDK (prefer over npm install)
```

No lint, test or EAS commands exist yet. Add them here when they're set up.

- Never filter `npm warn` lines out of install output. `ERESOLVE overriding peer dependency` means npm installed a peer at a version Expo didn't test; fix it with `npx expo install <pkg>`, then check `npm ls` shows no `invalid`.
- Don't use `width: '%'` + `aspectRatio` in wrapping rows (Yoga gets it wrong). Compute sizes from `useWindowDimensions()`.
- Don't run `npm audit fix --force`. Its "fix" downgrades Expo several major versions. The flagged packages are build-time tooling, which SDK patch updates (`npx expo install --fix`) address.
- The dev machine's network profile is "Public". If the phone can't reach Metro, check Windows Firewall rules for nvm's `node.exe`.
