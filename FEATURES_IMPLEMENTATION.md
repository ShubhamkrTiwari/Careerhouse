# Careerhouse App - Feature Implementation Guide

## Overview
This document provides a comprehensive guide to the three major features implemented in the Careerhouse React Native application:

1. **NativeWind Integration** - Utility-first styling with Tailwind CSS
2. **Sentry Integration** - Real-time crash and performance monitoring
3. **In-App App Icon Switching** - Dynamic app icon selection from Settings

---

## 1. NativeWind Integration

### What is NativeWind?
NativeWind brings the power of Tailwind CSS to React Native, enabling utility-first styling with familiar Tailwind classes.

### Installation & Configuration

#### Dependencies Installed:
```bash
npm install nativewind tailwindcss
```

#### Files Modified/Created:

**tailwind.config.js** - Tailwind configuration file with custom colors and spacing
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* custom primary colors */ },
        secondary: { /* custom secondary colors */ },
      },
    },
  },
};
```

**metro.config.js** - Updated to include NativeWind transformer
```javascript
const withNativeWind = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config);
```

### Usage Examples

Instead of inline styles:
```tsx
// Before (StyleSheet)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' }
});
<View style={styles.container} />

// After (NativeWind)
<View className="flex-1 bg-slate-100" />
```

### Updated Screens with NativeWind

- **WebViewScreen.tsx** - Header, buttons, and card layouts
- **VideoPlayerScreen.tsx** - Video player container and info card
- **SettingsScreen.tsx** - Fully styled with Tailwind utilities

### Benefits
✅ Faster UI development with utility classes  
✅ Consistent design across the app  
✅ Easy maintenance and scalability  
✅ Responsive design support  

---

## 2. Sentry Integration

### What is Sentry?
Sentry provides real-time error tracking, performance monitoring, and crash reporting for production applications.

### Installation & Setup

#### Dependencies Installed:
```bash
npm install @sentry/react-native
```

#### Initialization File: `src/utils/sentry.ts`
```typescript
import * as Sentry from '@sentry/react-native';

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://your-sentry-dsn@sentry.io/your-project-id',
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    enableNativeStacktrace: true,
    integrations: [new Sentry.ReactNativeTracing()],
  });
};
```

#### App.tsx Integration
```tsx
import { initSentry } from './src/utils/sentry';
initSentry(); // Called at app startup
```

### Features Implemented

1. **Error Tracking**
   - Automatic error capture with stack traces
   - Manual error capture with `Sentry.captureException(error)`

2. **Performance Monitoring**
   - Automatic transaction tracking
   - Custom event logging

3. **User Activity Tracking**
   - Screen view tracking in each navigation screen
   - User action logging

### Usage Examples

```typescript
// Capture exceptions
try {
  // Code that might fail
} catch (error) {
  Sentry.captureException(error);
}

// Log user actions
Sentry.captureMessage('User changed app icon to: purple', 'info');

// Performance tracking (automatic with React Native integration)
```

### Configuration Required

Before deploying, update the DSN in `src/utils/sentry.ts`:
1. Create a Sentry account at https://sentry.io
2. Create a new React Native project
3. Copy your DSN from project settings
4. Replace `'https://your-sentry-dsn@sentry.io/your-project-id'`

---

## 3. In-App App Icon Switching

### Overview
Users can change the app icon from the Settings screen with preferences persisted to device storage.

### Architecture

#### Icon Manager: `src/utils/iconManager.ts`
Manages available icons and user preferences:
```typescript
export interface AppIcon {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const AVAILABLE_ICONS: AppIcon[] = [
  { id: 'default', name: 'Default Blue', ... },
  { id: 'purple', name: 'Purple', ... },
  { id: 'green', name: 'Green', ... },
  { id: 'orange', name: 'Orange', ... },
];
```

#### Storage: `expo-secure-store`
```typescript
// Save user preference
await SecureStore.setItemAsync('app_icon_preference', iconId);

// Retrieve preference
const iconId = await SecureStore.getItemAsync('app_icon_preference');
```

#### Settings Screen: `src/screens/SettingsScreen.tsx`
Provides:
- Icon selection UI with visual preview
- Notification settings toggle
- Error reporting test button
- App info display

### User Flow

1. User navigates to Settings from WebView screen
2. Selects from 4 available icon themes:
   - Default Blue
   - Purple
   - Green
   - Orange
3. Selection is saved to secure storage
4. User receives alert to restart app
5. On app restart, selected icon displays

### Integration Points

**Navigation**: Added Settings route to `src/navigation/AppNavigator.tsx`
```tsx
<Stack.Screen name="Settings" component={SettingsScreen} />
```

**UI Navigation**: Settings button in WebViewScreen header
```tsx
<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
  <Settings size={24} color="#fff" />
</TouchableOpacity>
```

### Features

✅ 4 icon themes with visual preview  
✅ Secure preference storage  
✅ Sentry integration for tracking selections  
✅ Notification settings toggle  
✅ Error reporting test button  
✅ App version/build info display  

---

## Feature Integration Highlights

### WebViewScreen Enhancements
- Added Settings navigation button
- Integrated Sentry error tracking for notifications
- Replaced StyleSheet with NativeWind classes
- Settings icon link in header

### VideoPlayerScreen Enhancements
- Replaced StyleSheet with NativeWind
- Added Sentry screen view tracking
- Modernized styling with Tailwind utilities

### SettingsScreen (New)
- Complete icon switching UI
- Notification preferences
- Sentry error reporting test
- App information display

---

## Testing & Validation

### Test the integrations:

1. **NativeWind Styling**
   - Verify responsive layouts on different screen sizes
   - Check color consistency with Tailwind config

2. **Sentry Integration**
   - Use "Test Error Reporting" button in Settings
   - Check Sentry dashboard for captured events
   - Monitor performance metrics

3. **App Icon Switching**
   - Select each icon in Settings
   - Restart the app
   - Verify correct icon displays on home screen
   - Check secure storage with: `adb shell "sqlite3 /data/data/com.careerhouse/databases/SecureStore.db"`

---

## Production Checklist

- [ ] Update Sentry DSN with production project
- [ ] Set `tracesSampleRate` to 0.1-0.5 for production
- [ ] Test on real devices (Android & iOS)
- [ ] Verify icon assets exist in native projects
- [ ] Add native app icon switching (platform-specific)
- [ ] Review Sentry privacy settings
- [ ] Set up Sentry alerts and notifications
- [ ] Load test the app with various network conditions

---

## Troubleshooting

### NativeWind Issues
- **Classes not applying**: Ensure `metro.config.js` includes NativeWind wrapper
- **Build errors**: Clear cache: `npm start -- --reset-cache`

### Sentry Issues
- **Events not appearing**: Verify DSN is correct
- **Network errors**: Check firewall/proxy settings
- **High error rates**: Review integration code for unnecessary captures

### Icon Switching Issues
- **Preference not persisting**: Verify `expo-secure-store` permissions
- **Wrong icon displaying**: Check `iconManager.ts` icon IDs
- **Settings screen not loading**: Verify navigation setup in `AppNavigator.tsx`

---

## Dependencies Summary

```json
{
  "nativewind": "^4.x",
  "tailwindcss": "^3.x",
  "@sentry/react-native": "^5.x",
  "expo-secure-store": "^14.x"
}
```

---

## Resources

- [NativeWind Documentation](https://www.nativewind.dev)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [Sentry React Native Docs](https://docs.sentry.io/platforms/react-native/)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

**Last Updated**: January 28, 2026  
**Version**: 1.0.0
