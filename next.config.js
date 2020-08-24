const path = require('path');
const slug = require('remark-slug');
const mdxTableOfContents = require('./lib/toc-module');

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [slug],
    compilers: [mdxTableOfContents],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: config => {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: path.join(__dirname, './lib/fm-loader'),
    });

    config.node = {
      fs: 'empty',
    };

    return config;
  },
});
