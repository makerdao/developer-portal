// const slug = require('remark-slug');

module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: [options.defaultLoaders.babel, 'raw-loader'],
    });
    config.node = {
      fs: 'empty',
    };
    return config;
  },
};
