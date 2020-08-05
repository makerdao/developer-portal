const slug = require('remark-slug');
const mdxTableOfContents = require('./lib/toc-module');

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [slug],
    compilers: [mdxTableOfContents],
  },
});
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    IPFS: process.env.IPFS,
  },
});
