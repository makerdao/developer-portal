// const slug = require('remark-slug');

module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config, { defaultLoaders, isServer }) => {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: [defaultLoaders.babel, 'raw-loader'],
    });

    config.node = {
      fs: 'empty',
    };

    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    return config;
  },
};
