# Careerhouse Expo App

This project is an Expo React Native application built as part of an assignment.

## Features

### 1. WebView Page
- Embeds the Expo website (`https://expo.dev`) using `react-native-webview`.
- Includes a control section at the bottom for notifications and navigation.

### 2. Local Notifications
- Implemented using `expo-notifications`.
- Two distinct notification buttons with different messages:
  - **Notify (3s)**: Triggers a notification after a 3-second delay.
  - **Notify (5s)**: Triggers a notification after a 5-second delay.
- Handles notification permissions automatically on app start.

### 3. Video Player Page
- Plays an HLS video stream using `expo-video`.
- Test URL: `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`
- Includes native controls (play, pause, fullscreen).
- Supports Picture-in-Picture and Fullscreen modes.

### 4. Navigation
- Uses `@react-navigation/native` and `@react-navigation/native-stack`.
- Seamless transition between the WebView screen and the Video Player screen.

### 5. UI Components
- Integrated `react-native-paper` for a polished Material Design look.
- Uses Cards, Buttons, and Titles for consistent styling.

## Implementation Choices
- **Expo SDK**: Used for its robust set of APIs (Notifications, Video) and ease of development.
- **expo-video**: Chosen over `expo-av` as it is the modern, recommended way to handle video playback in Expo.
- **react-native-paper**: Selected as the UI library to provide professional-looking components with minimal setup overhead.
- **TypeScript**: Used for better developer experience and type safety.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npx expo start
   ```

3. Open the app:
   - Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).
   - Or press `a` for Android Emulator or `i` for iOS Simulator.
