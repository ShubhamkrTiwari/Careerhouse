# Code Examples & Best Practices

## NativeWind / Tailwind CSS Examples

### Basic Layout Patterns

#### Centered Container
```tsx
<View className="flex-1 justify-center items-center bg-slate-100">
  <Text className="text-2xl font-bold text-gray-800">Centered Content</Text>
</View>
```

#### Flex Row with Spacing
```tsx
<View className="flex-row justify-between items-center gap-3 px-4 py-3">
  <Icon size={20} color="#0369a1" />
  <Text className="flex-1 text-gray-800 font-semibold">Label</Text>
  <Switch />
</View>
```

#### Card Component
```tsx
<Surface className="p-4 rounded-xl bg-white border border-gray-200">
  <Text className="text-lg font-semibold text-gray-800 mb-2">Title</Text>
  <Text className="text-sm text-gray-600">Description text</Text>
</Surface>
```

#### Gradient Header
```tsx
<LinearGradient
  colors={['#4c669f', '#3b5998', '#192f6a']}
  className="rounded-b-3xl"
>
  <View className="px-5 pt-2 pb-5">
    <Title className="text-white text-3xl font-bold">Title</Title>
  </View>
</LinearGradient>
```

### Responsive Design

```tsx
// Mobile-first (screens expand, not contract)
<View className="px-4 py-2 md:px-6 md:py-4 lg:px-8">
  {/* Content scales based on screen size */}
</View>

// Conditional layouts
<View className="flex-col sm:flex-row gap-4">
  <View className="flex-1">Item 1</View>
  <View className="flex-1">Item 2</View>
</View>
```

### Spacing & Sizing

```tsx
// Padding: p{size}, px{size}, py{size}, pt/pb/pl/pr{size}
className="p-4 px-6 py-3"

// Margin: m{size}, mx{size}, my{size}, mt/mb/ml/mr{size}
className="m-2 mx-auto my-4"

// Gap (flexbox children)
className="gap-3 gap-x-4 gap-y-2"

// Width & Height
className="w-full h-32 w-12 h-12"
```

### Colors & States

```tsx
// Text colors
className="text-gray-800 text-blue-600 text-red-500"

// Background colors
className="bg-slate-100 bg-white bg-blue-50"

// Border colors & opacity
className="border border-gray-200 border-blue-600 border-2"

// Shadows
className="shadow-sm shadow-md shadow-lg"

// Hover/Active states (platform dependent)
className="opacity-75"
```

---

## Sentry Integration Examples

### Automatic Error Capture

```tsx
import * as Sentry from '@sentry/react-native';

// Automatically captured - no code needed
// - Unhandled exceptions
// - Unhandled promise rejections
// - Navigation errors
// - Native crashes
```

### Manual Error Capture

```tsx
// Catch and report specific errors
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// Or with additional context
try {
  await operation();
} catch (error) {
  Sentry.captureException(error, {
    level: 'error',
    tags: { operation: 'critical' },
    extra: { userId: currentUser?.id }
  });
}
```

### User Action Tracking

```tsx
// Log important user actions
Sentry.captureMessage('User logged in', 'info');
Sentry.captureMessage('Premium feature accessed', 'info');
Sentry.captureMessage('App icon changed to purple', 'info');

// With severity levels
Sentry.captureMessage('Low storage warning', 'warning');
Sentry.captureMessage('Network error occurred', 'error');
```

### Performance Monitoring

```tsx
// Automatic with React Native integration
// Tracks:
// - Screen transitions
// - HTTP requests
// - Database queries
// - Long tasks

// Custom transactions
const transaction = Sentry.startTransaction({
  name: 'expensive-operation',
  op: 'http.client',
});

try {
  // Do expensive work
  await longOperation();
} finally {
  transaction.finish();
}
```

### User Context

```tsx
// Set user information for better error tracking
Sentry.setUser({
  id: userId,
  username: username,
  email: email,
});

// Clear user when logging out
Sentry.setUser(null);

// Add custom context
Sentry.setContext('character', {
  name: 'Mighty Fighter',
  level: 19,
  class: 'Warrior',
});
```

### Breadcrumbs (Action Trail)

```tsx
// Automatic breadcrumbs for:
// - Console logs
// - UI interactions
// - HTTP requests

// Manual breadcrumbs
Sentry.captureMessage('User started video playback', 'info');
Sentry.addBreadcrumb({
  category: 'user-action',
  message: 'Clicked settings button',
  level: 'info',
});
```

---

## App Icon Switching Examples

### Using Icon Manager

```tsx
import { 
  AVAILABLE_ICONS, 
  saveIconPreference, 
  getIconPreference,
  getIconById 
} from '../utils/iconManager';

// Display available icons
{AVAILABLE_ICONS.map(icon => (
  <IconOption key={icon.id} {...icon} />
))}

// Save user selection
const handleIconChange = async (iconId: string) => {
  const success = await saveIconPreference(iconId);
  if (success) {
    // Show success message
  }
};

// Load current preference
const currentIcon = await getIconPreference();
const iconDetails = getIconById(currentIcon);
```

### Storage Implementation

```tsx
import * as SecureStore from 'expo-secure-store';

// Save sensitive data securely
await SecureStore.setItemAsync('app_icon_preference', 'purple');

// Retrieve data
const iconId = await SecureStore.getItemAsync('app_icon_preference');

// Delete data
await SecureStore.deleteItemAsync('app_icon_preference');

// Error handling
try {
  const value = await SecureStore.getItemAsync('key');
} catch (error) {
  console.error('Secure store error:', error);
}
```

---

## Complete Screen Example

### SettingsScreen Architecture

```tsx
// 1. Imports
import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import * as Sentry from '@sentry/react-native';

// 2. Component Definition
const SettingsScreen = () => {
  // State
  const [currentIcon, setCurrentIcon] = useState<string>('default');
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  useEffect(() => {
    loadPreferences();
    Sentry.captureMessage('Settings Screen Opened', 'info');
  }, []);

  // Data Fetching
  const loadPreferences = async () => {
    try {
      const icon = await getIconPreference();
      setCurrentIcon(icon);
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Event Handlers
  const handleIconChange = async (iconId: string) => {
    setCurrentIcon(iconId);
    await saveIconPreference(iconId);
    Sentry.captureMessage(`Icon changed to: ${iconId}`, 'info');
  };

  // Conditional Rendering
  if (isLoading) {
    return <View className="flex-1 justify-center items-center">Loading...</View>;
  }

  // Render UI
  return (
    <ScrollView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-4 mb-6">
        <Text className="text-2xl font-bold">Settings</Text>
      </View>

      {/* Icon Section */}
      <View className="px-4 mb-6">
        {AVAILABLE_ICONS.map(icon => (
          <TouchableOpacity
            key={icon.id}
            onPress={() => handleIconChange(icon.id)}
          >
            <IconCard {...icon} isSelected={currentIcon === icon.id} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
```

---

## Best Practices

### 1. NativeWind Styling
✅ **DO:**
```tsx
<View className="px-4 py-3 rounded-lg bg-white">
  <Text className="text-gray-800 font-semibold">Good</Text>
</View>
```

❌ **DON'T:**
```tsx
<View className="p-4 rounded bg-white dark:bg-gray-800">
  {/* Avoid mixing complex conditionals in className */}
</View>
```

### 2. Sentry Integration
✅ **DO:**
```tsx
try {
  await operation();
} catch (error) {
  Sentry.captureException(error);
  // Also show user feedback
  showErrorAlert('Operation failed');
}
```

❌ **DON'T:**
```tsx
// Don't capture everything - it's noisy
Sentry.captureMessage('Network request started', 'info');
```

### 3. Icon Management
✅ **DO:**
```tsx
const success = await saveIconPreference(iconId);
if (success) {
  Alert.alert('Success', 'Icon updated. Restart app to apply.');
}
```

❌ **DON'T:**
```tsx
// Don't change icon without user feedback
saveIconPreference(iconId);
```

### 4. Error Handling
✅ **DO:**
```tsx
useEffect(() => {
  loadData();
  Sentry.captureMessage('Screen Mounted', 'info');
}, []);
```

❌ **DON'T:**
```tsx
// Don't capture every component mount - only important ones
useEffect(() => {
  Sentry.captureMessage('View component mounted', 'debug');
}, []);
```

---

## Configuration Examples

### Tailwind Theme Extension

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      // Add brand colors
      brand: {
        primary: '#0369a1',
        secondary: '#7c3aed',
        success: '#059669',
        warning: '#ea580c',
        error: '#dc2626',
      }
    },
    spacing: {
      // Add custom spacing values
      safe: 'max(1rem, env(safe-area-inset-bottom))',
    },
    fontSize: {
      // Custom font sizes
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
    }
  }
}
```

### Sentry Sample Rate Configuration

```typescript
// src/utils/sentry.ts
const environment = process.env.NODE_ENV || 'development';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Higher sample rate in development
  tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
  // Attach stack traces
  attachStacktrace: true,
  // Enable before-send filtering
  beforeSend(event) {
    // Filter out low-priority errors
    if (event.level === 'debug') {
      return null;
    }
    return event;
  },
});
```

---

## Debugging Tips

### Testing NativeWind
```bash
# Check if styles are applied
# 1. Use React DevTools
# 2. Inspect element in browser dev tools
# 3. Check metro console for warnings
```

### Testing Sentry
```typescript
// In SettingsScreen
const handleTestError = () => {
  try {
    throw new Error('Test error from Settings');
  } catch (error) {
    Sentry.captureException(error);
  }
};
```

### Testing Icon Persistence
```typescript
// Check secure store
import * as SecureStore from 'expo-secure-store';

const debugIcons = async () => {
  const stored = await SecureStore.getItemAsync('app_icon_preference');
  console.log('Stored icon:', stored);
};
```

---

## Performance Optimization

### Code Splitting
```tsx
// Only load icons that are visible
const VisibleIcons = AVAILABLE_ICONS.slice(0, 4);
```

### Memoization
```tsx
// Prevent unnecessary re-renders
const IconCard = React.memo(({ icon, isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    {/* Icon card content */}
  </TouchableOpacity>
));
```

### Lazy Loading
```tsx
// Load heavy components only when needed
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

---

**Last Updated**: January 28, 2026
