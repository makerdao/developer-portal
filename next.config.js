const path = require('path');
const mdxTableOfContents = require('./lib/toc-module');

// "uu64" implementation https://github.com/uu64/nextjs-mdx-blog-sample/blob/master/next.config.js
module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      // test: /\.md?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: { compilers: [mdxTableOfContents] },
        },

        path.join(__dirname, './lib/fm-loader'),
      ],
    });

    config.node = {
      fs: 'empty',
    };

    return config;
  },
};
