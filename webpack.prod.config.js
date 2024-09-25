const path = require('path');
const { createConfig } = require('@openedx/frontend-build');
const CopyPlugin = require('copy-webpack-plugin');

const config = createConfig('webpack-prod');

// Resolving modules from src and node_modules
config.resolve.modules = [
  path.resolve(__dirname, './src'),
  'node_modules',
];

// Excluding certain node_modules from the build
config.module.rules[0].exclude = /node_modules\/(?!(query-string|split-on-first|strict-uri-encode|@edx))/;

// Add CopyPlugin to copy all assets from the public folder
config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, './public'), // Copy entire public folder
        to: path.resolve(__dirname, './dist/public'), // Destination folder for public assets
        globOptions: {
          ignore: ['**/robots.txt'], // You can exclude specific files if needed
        },
      },
    ],
  }),
);

module.exports = config;
