import * as Sentry from '@sentry/react-native';

export const initSentry = () => {
  try {
    Sentry.init({
      // DSN for nexicraft/react-native project
      // Get your DSN from: https://sentry.io/settings/nexicraft/projects/react-native/keys/
      dsn: 'https://your-sentry-dsn@sentry.io/your-project-id',
      environment: __DEV__ ? 'development' : 'production',
      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
      // We recommend adjusting this value in production (e.g., 0.1-0.5)
      tracesSampleRate: __DEV__ ? 1.0 : 0.1,
      // Set `tracePropagationTargets` to control what URLs distributed tracing should be enabled for
      tracePropagationTargets: ['localhost', /^\//],
      // Capture sessions for session replay
      // This sample rate is relative to tracesSampleRate
      replaysSessionSampleRate: __DEV__ ? 1.0 : 0.1,
      // Capture 100% of recordings where an error occurred
      replaysOnErrorSampleRate: 1.0,
      enableNativeStacktrace: true,
      // Automatically capture unhandled promise rejections
      attachStacktrace: true,
    });
  } catch (error) {
    console.warn('Sentry initialization failed:', error);
  }
};

export default Sentry;
