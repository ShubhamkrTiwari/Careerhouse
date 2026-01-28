# 🔐 Sentry Configuration Guide - nexicraft Organization

## Your Setup
- **Organization**: nexicraft
- **Project**: react-native
- **Status**: Ready for DSN configuration

---

## Step 1: Get Your DSN from Sentry

### Option A: From Your Sentry Dashboard
1. Go to: https://sentry.io/settings/nexicraft/projects/react-native/keys/
2. Click on "Client Keys (DSN)"
3. Copy the DSN that looks like:
   ```
   https://xxxxxxxxxxxxxxxxxxxxx@sentry.io/1234567890
   ```

### Option B: From Sentry Setup Wizard
1. Visit: https://sentry.io
2. Sign in with your account
3. Go to Projects → react-native
4. Click "Client Keys (DSN)" in the sidebar
5. Copy the public DSN

---

## Step 2: Configure Your DSN

### Edit: `src/utils/sentry.ts`

Find this line (around line 6):
```typescript
dsn: 'https://your-sentry-dsn@sentry.io/your-project-id',
```

Replace it with your actual DSN:
```typescript
dsn: 'https://xxxxxxxxxxxxxxxxxxxxx@sentry.io/1234567890',
```

**Example DSN**:
```typescript
dsn: 'https://examplePublicKey@o12345.ingest.sentry.io/6789012',
```

---

## Step 3: Verify Installation

The file `src/utils/sentry.ts` has been pre-configured with:

✅ **Production-Ready Settings**:
- Development mode: 100% error tracking, 100% performance monitoring
- Production mode: 10% performance monitoring (configurable)
- Automatic native stacktraces
- Session replay on errors
- React Navigation instrumentation

✅ **Environment Detection**:
```typescript
environment: __DEV__ ? 'development' : 'production',
tracesSampleRate: __DEV__ ? 1.0 : 0.1, // 10% in production
```

---

## Step 4: Test Sentry Integration

### In Your App

1. **Settings Screen** has a built-in test button:
   - Tap ⚙️ Settings → "Monitoring" section
   - Click "Test Error Reporting"
   - Check your Sentry dashboard for the error

2. **Manual Test**:
```typescript
// In any component
import * as Sentry from '@sentry/react-native';

// Test error capture
Sentry.captureException(new Error('Test error from Careerhouse app'));

// Test event logging
Sentry.captureMessage('User performed action', 'info');
```

3. **Automatic Captures**:
- All unhandled exceptions
- Promise rejections
- Network errors
- Performance metrics

---

## Step 5: Monitor Your Events

### View Captured Events

1. Go to: https://sentry.io/organizations/nexicraft/issues/
2. Look for recent events from your project
3. Click on any issue to see:
   - Stack trace
   - Device information
   - User session
   - Breadcrumbs (user actions)
   - Performance metrics

### Dashboard Location

- **Errors**: https://sentry.io/organizations/nexicraft/issues/
- **Performance**: https://sentry.io/organizations/nexicraft/performance/
- **Releases**: https://sentry.io/organizations/nexicraft/releases/
- **Project Settings**: https://sentry.io/settings/nexicraft/projects/react-native/

---

## Configuration Details

### Current Settings in `src/utils/sentry.ts`

```typescript
Sentry.init({
  // Your DSN (INSERT HERE)
  dsn: 'https://your-sentry-dsn@sentry.io/your-project-id',
  
  // Environment detection
  environment: __DEV__ ? 'development' : 'production',
  
  // Sample rates (adjust for production)
  tracesSampleRate: __DEV__ ? 1.0 : 0.1,        // Performance: 100% dev, 10% prod
  replaysSessionSampleRate: __DEV__ ? 1.0 : 0.1, // Sessions: 100% dev, 10% prod
  replaysOnErrorSampleRate: 1.0,                 // Always capture on errors
  
  // Features
  enableNativeStacktrace: true,                  // Native iOS/Android errors
  attachStacktrace: true,                        // Include stack traces
  
  // Integrations
  integrations: [
    new Sentry.ReactNativeTracing(),            // Performance monitoring
  ]
});
```

### For Production, Adjust to:

```typescript
tracesSampleRate: 0.1,         // 10% of transactions
replaysSessionSampleRate: 0.05, // 5% of sessions
```

This reduces overhead while still capturing important data.

---

## Troubleshooting

### DSN is Not Working
- Verify DSN format: `https://xxxxx@sentry.io/12345`
- Check organization slug is correct: `nexicraft`
- Verify project name is correct: `react-native`
- Test DSN at: https://sentry.io/settings/nexicraft/projects/react-native/keys/

### Events Not Appearing
- Check network connectivity
- Verify DSN was updated correctly
- Test with Settings screen "Test Error Reporting" button
- Check Sentry dashboard for any alerts

### Too Many Events
- Production: Lower `tracesSampleRate` to 0.05-0.1
- Development: Keep at 1.0 for debugging

---

## Quick Links

- **Your Project DSN**: https://sentry.io/settings/nexicraft/projects/react-native/keys/
- **Issues Dashboard**: https://sentry.io/organizations/nexicraft/issues/
- **Performance Dashboard**: https://sentry.io/organizations/nexicraft/performance/
- **Sentry Docs**: https://docs.sentry.io/platforms/react-native/
- **Configuration Docs**: https://docs.sentry.io/platforms/react-native/configuration/

---

## Next Steps

1. ✅ Copy your DSN from Sentry
2. ✅ Update `src/utils/sentry.ts` with your DSN
3. ✅ Run your app: `npm run android` or `npm run ios`
4. ✅ Test error reporting via Settings screen
5. ✅ View events in Sentry dashboard

---

**Organization**: nexicraft  
**Project**: react-native  
**Status**: ✅ Ready for DSN Configuration
