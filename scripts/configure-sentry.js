#!/usr/bin/env node

/**
 * Script to configure Sentry DSN in the project
 * Usage: node scripts/configure-sentry.js <DSN>
 * 
 * Example:
 * node scripts/configure-sentry.js "https://xxxxx@sentry.io/12345"
 */

const fs = require('fs');
const path = require('path');

const sentryFile = path.join(__dirname, '../src/utils/sentry.ts');
const dsn = process.argv[2];

if (!dsn) {
  console.error('❌ Error: Please provide a DSN argument');
  console.error('');
  console.error('Usage: node scripts/configure-sentry.js <DSN>');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/configure-sentry.js "https://xxxxx@sentry.io/12345"');
  console.error('');
  process.exit(1);
}

// Validate DSN format
if (!dsn.startsWith('https://') || !dsn.includes('@')) {
  console.error('❌ Error: Invalid DSN format');
  console.error('');
  console.error('Expected format: https://xxxxx@sentry.io/12345');
  console.error('Received:', dsn);
  console.error('');
  process.exit(1);
}

try {
  // Read the file
  let content = fs.readFileSync(sentryFile, 'utf8');
  
  // Replace the DSN
  const oldContent = content;
  content = content.replace(
    /dsn:\s*['"]https:\/\/your-sentry-dsn@sentry\.io\/your-project-id['"]/,
    `dsn: '${dsn}'`
  );
  
  // Check if replacement was made
  if (content === oldContent) {
    console.error('❌ Error: Could not find DSN to replace in sentry.ts');
    process.exit(1);
  }
  
  // Write the file
  fs.writeFileSync(sentryFile, content, 'utf8');
  
  console.log('✅ Sentry DSN configured successfully!');
  console.log('');
  console.log('📝 Configuration:');
  console.log(`   File: ${sentryFile}`);
  console.log(`   DSN: ${dsn}`);
  console.log('');
  console.log('🚀 Next steps:');
  console.log('   1. Run: npm start');
  console.log('   2. Test with Settings screen "Test Error Reporting" button');
  console.log('   3. Check https://sentry.io/organizations/nexicraft/issues/');
  console.log('');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
