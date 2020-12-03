const path = require('path');
const withSvgr = require('next-svgr');
require('dotenv').config();

module.exports = withSvgr({
  webpack: (config, { isServer }) => {
    if (isServer) process.env.USE_CACHE = 'true';
    config.node = {
      fs: 'empty',
    };
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, './components'),
      '@layouts': path.resolve(__dirname, './layouts'),
      '@utils': path.resolve(__dirname, './utils'),
      '@docs': path.resolve(__dirname, './docs'),
      '@hooks': path.resolve(__dirname, './hooks'),
    };

    return config;
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
    SIGNING_KEY: process.env.SIGNING_KEY,
    // ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    // ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    // FEEDBACK_ENDPOINT: process.env.FEEDBACK_ENDPOINT,
  },
  redirects: async () => {
    return [
      {
        source: '/security',
        destination: '/security/multi-collateral-dai-security',
        permanent: false,
      },
      {
        source: '/documentation',
        destination: '/documentation/introduction-to-the-maker-protocol',
        permanent: false,
      },
    ];
  },
});
