# Mobile (subtrack-mobile)

This folder contains a small React Native / Expo sample for the mobile app's login screen.

Dependencies you should install locally to support the login screen features:

- expo-blur (native blur effect):
  - If using Expo managed workflow: `expo install expo-blur`
  - If using bare React Native: consider `@react-native-community/blur` (follow linking instructions)

- AsyncStorage (token persistence):
  - `npm install @react-native-async-storage/async-storage` or `yarn add @react-native-async-storage/async-storage`

Notes:
- Android emulator typical host for local backend: `http://10.0.2.2:8081`
- iOS simulator: `http://localhost:8081`

Usage:
- Start the backend (`./mvnw spring-boot:run`) and run your mobile project via Expo or RN CLI.
- The login screen uses `subtrack-mobile/api/authApi.ts` to POST to `/auth/login` and stores the JWT in AsyncStorage.
