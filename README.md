# KidWrite

KidWrite is a playful Expo React Native app for children aged 3-7 to learn writing through tracing, speech, rewards, and mini games.

## Stack

- Expo React Native for Android, iPhone, tablet, and responsive web
- React Context provider for app state
- Firebase-ready service layer with Auth and Firestore initialization
- `expo-speech` for pronunciation prompts
- `react-native-svg` for trace guides and educational vector art
- Generated bitmap mascot asset at `assets/mascot-pencil.png`

## Run

```bash
npm install
npm run start
npm run web
```

Expo currently warns if Node is below `20.19.4`. The app was exported successfully on Node `20.18.1`, but upgrading Node is recommended for ongoing Expo work.

## Firebase

Copy `.env.example` to `.env` and set the Firebase web app values:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

The Firebase entry point is `src/services/firebase.js`. Collections are listed in `src/data/content.js` so progress, rewards, and activity events can be wired without scattering names through the UI.

## Screens

- Splash
- Onboarding
- Home
- Category picker
- Letter tracing
- Number tracing
- Word tracing
- Matching game
- Rewards
- Progress
- Profile
- Parent dashboard

## Asset Workflow

The mascot and the reference-style splash scene were generated with the local `imagegen` skill and copied into the workspace:

- `assets/mascot-pencil.png`
- `assets/splash-fantasy.png`

Additional bitmap-only assets should be generated the same way, then committed under `assets/` before use in code.
