const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optional: Uncomment to enable NativeWind if needed
// const withNativeWind = require('nativewind/metro');
// module.exports = withNativeWind(config);

module.exports = config;
